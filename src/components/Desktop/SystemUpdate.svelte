<script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  import { systemNeedsUpdate } from '🍎/stores/system.store';
  import { onDestroy } from 'svelte';
  import SystemDialog from '../SystemUI/SystemDialog.svelte';

  let systemUpdateDialog: SystemDialog;

  // replaced dynamically
  const buildDate = '__DATE__';

  // Will store the update event, so we can use this value on AppStore to show the badge.
  // If the user click on Later instead Restart, the dialog is closed but the update is still there.
  // We don't need to store it on localStorage since the new sw is on skip waiting state, and so
  // a refresh or reopening the browser will prompt again the dialog to restart.
  // Once updateServiceWorker is called, there is a full reload, so the app will be loaded again.

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(swr) {
      console.log(`SW registered: ${swr}`);
    },
    onOfflineReady() {
      console.log('앱이 오프라인 준비되었습니다.');
    },
    onNeedRefresh() {
      console.log('새로운 서비스 워커가 활성화 준비되었습니다.');
      if ($needRefresh) return;
      needRefresh.set(true);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  $: $needRefresh && systemUpdateDialog?.open();
  $: $systemNeedsUpdate = $needRefresh;

  // 주기적으로 업데이트를 확인하는 함수
  let swRegistration: ServiceWorkerRegistration | null = null;
  const checkForUpdates = async () => {
    console.log('1. checkForUpdates');

    if ($needRefresh) return;
    if (!navigator.serviceWorker) return;

    try {
      // 현재 Service Worker 등록 상태 가져오기
      console.log('2. 현재 Service Worker 등록 상태 가져오기');
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return;

      swRegistration = registration;

      // 업데이트 상태 확인
      await registration.update(); // 업데이트 프로세스 트리거
      if (registration.waiting) {
        console.log('3. 업데이트가 감지되었습니다.');
        needRefresh.set(true);
        // systemUpdateDialog?.open();
      }
    } catch (error) {
      console.error('SW 업데이트 확인 중 오류 발생:', error);
    }
  };
  const updateInterval = setInterval(checkForUpdates, 10000);

  // 컴포넌트가 파괴될 때 클린업
  onDestroy(() => clearInterval(updateInterval));

  function close() {
    systemUpdateDialog.close();
    needRefresh.set(false);
  }

  async function handleUpdateApp() {
    if (swRegistration?.waiting) {
      // 서비스 워커가 대기 중인 경우
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      // 서비스 워커가 새로고침을 완료할 때까지 대기
      swRegistration.waiting.addEventListener('statechange', (event: any) => {
        if (event.target.state === 'activated') {
          window.location.reload(); // 업데이트가 완료되면 페이지 새로 고침
        }
      });
    }
  }

  // F5 새로고침 문제 해결: 서비스 워커가 활성화되도록 처리
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // 새로고침 시, service worker가 `waiting` 상태에서 바로 활성화되도록 처리
      console.log('Controller change detected, reloading page...');
      window.location.reload(); // 서비스 워커가 활성화되면 페이지 새로 고침
    });

    // 페이지가 로드될 때 서비스 워커가 대기 상태일 경우 강제로 `skipWaiting` 호출
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
</script>

<SystemDialog bind:this={systemUpdateDialog}>
  <section class="system-update-section">
    <img
      width="128"
      height="128"
      src="/macos-web/app-icons/system-preferences/256.webp"
      alt="AppStore app"
      draggable="false"
    />

    <h3>Updates Available</h3>
    <p>Do you want to restart to install these updates now?</p>

    <div class="buttons">
      <button on:click={close}>Later</button>
      <button class="confirm" on:click={handleUpdateApp}> Update </button>
    </div>
  </section>
</SystemDialog>

<div class="pwa-date">{buildDate}</div>

<style lang="scss">
  .pwa-date {
    visibility: hidden;

    height: 0;
    width: 0;
  }

  .system-update-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 1rem 0 0;

    width: 20rem;

    color: var(--system-color-dark);

    h3,
    p {
      text-align: center;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p {
      font-size: 0.9rem;
    }

    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;

      width: 100%;

      button {
        width: 100%;
        height: 2rem;

        font-weight: 500;

        border-radius: 0.5rem;

        background-color: hsla(var(--system-color-dark-hsl), 0.2);

        &:hover {
          background-color: hsla(var(--system-color-dark-hsl), 0.3);
        }

        &.confirm {
          background-color: var(--system-color-primary);

          color: var(--system-color-primary-contrast);

          &:hover {
            background-color: hsla(var(--system-color-primary-hsl), 0.8);
          }
        }
      }
    }
  }
</style>

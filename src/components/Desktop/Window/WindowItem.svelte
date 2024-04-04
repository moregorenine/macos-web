<script context="module">
  // 기본 너비를 설정합니다.
  const baseWidth = 57.6;
</script>

<script lang="ts">
  // 필요한 모듈들을 임포트합니다.
  import { spring } from 'svelte/motion';
  import { appsConfig } from '🍎/configs/apps/apps-config';
  import { AppID } from '🍎/stores/apps.store';
  import { activeApp, openApps } from '🍎/stores/apps.store';

  // 변수들을 선언합니다.
  export let appID: AppID;

  let imageEl: HTMLImageElement;

  // 스프링 애니메이션을 설정합니다.
  const widthPX = spring(baseWidth, {
    damping: 0.47,
    stiffness: 0.12,
  });

  let raf: number;

  // 앱 설정을 가져옵니다.
  let { isFolder, title, shouldOpenWindow, externalAction, imageSrc } = appsConfig[appID] || {
    isFolder: true,
    title: 'New Folder',
    shouldOpenWindow: null,
    externalAction: null,
    imageSrc: '/macos-web/app-icons/folder/256.webp',
  };

  // 앱을 열기 위한 함수를 설정합니다.
  async function openApp(e: MouseEvent) {
    if (!shouldOpenWindow) return externalAction?.(e);

    // 바운스 애니메이션을 위한 설정입니다.
    // For the bounce animation
    const isAppAlreadyOpen = $openApps[appID];

    $openApps[appID] = true;
    $activeApp = appID;

    if (isAppAlreadyOpen) return;
  }

  function drag(event) {
    event.dataTransfer.setData('text', appID); // set the appID as the data to be transferred
  }
</script>

<!-- 앱을 열기 위한 버튼입니다. 클릭하면 openApp 함수가 호출됩니다. -->
<button on:click={openApp} aria-label="Launch {title} app" class="dock-open-app-button {appID}">
  <!-- 이미지를 감싸는 span 요소입니다. transform 스타일은 appOpenIconBounceTransform의 값에 따라 변합니다. -->
  <span>
    <!-- 앱의 아이콘 이미지입니다. 너비는 widthPX의 값에 따라 변하며, 드래그는 불가능합니다. -->
    <img
      bind:this={imageEl}
      id={appID}
      src={imageSrc}
      alt="{title} app"
      style:width="{$widthPX / 16}rem"
      draggable="true"
      on:dragstart={drag}
    />
  </span>
  <p>{title}</p>
</button>

<style lang="scss">
  // 버튼의 스타일을 설정합니다.
  button {
    // 버튼 내부의 아이템들을 세로로 배열합니다.
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;

    // 버튼의 모서리를 둥글게 만듭니다.
    border-radius: 0.5rem;

    // 버튼 내부의 span 요소의 스타일을 설정합니다.
    & > span {
      // span 내부의 아이템들을 가운데 정렬합니다.
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

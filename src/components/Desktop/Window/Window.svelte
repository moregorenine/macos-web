<script lang="ts">
  // 필요한 라이브러리와 모듈을 import 합니다.
  import { draggable } from '@neodrag/svelte'; // 드래그 가능한 요소를 만들기 위한 라이브러리입니다.
  import { onMount } from 'svelte'; // 컴포넌트가 마운트될 때 실행할 함수를 등록하는 svelte의 생명주기 함수입니다.
  import { sineInOut } from 'svelte/easing'; // svelte에서 제공하는 sineInOut 이징 함수입니다.

  import { elevation } from '🍎/actions'; // 앱의 z-index를 조절하는 액션입니다.
  import { appsConfig } from '🍎/configs/apps/apps-config'; // 앱의 설정을 담고 있는 객체입니다.
  import { randint } from '🍎/helpers/random'; // 랜덤한 정수를 생성하는 함수입니다.
  import { waitFor } from '🍎/helpers/wait-for'; // 특정 시간 동안 대기하는 함수입니다.
  import {
    activeApp,
    activeAppZIndex,
    AppID,
    appsInFullscreen,
    appZIndices,
    isAppBeingDragged,
    openApps,
  } from '🍎/stores/apps.store'; // 앱의 상태를 관리하는 svelte store입니다.
  import { prefersReducedMotion } from '🍎/stores/prefers-motion.store'; // 사용자의 모션 선호도를 관리하는 svelte store입니다.
  import { theme } from '🍎/stores/theme.store'; // 테마를 관리하는 svelte store입니다.

  import AppNexus from '../../apps/AppNexus.svelte'; // AppNexus 컴포넌트를 import합니다.
  import TrafficLights from './TrafficLights.svelte'; // TrafficLights 컴포넌트를 import합니다.

  export let appID: AppID; // 부모 컴포넌트로부터 받는 prop입니다.

  let draggingEnabled = true; // 앱이 드래그 가능한지 나타내는 변수입니다.

  let isMaximized = false; // 앱이 최대화 상태인지 나타내는 변수입니다.
  let minimizedTransform: string; // 앱이 최소화될 때의 transform 값을 저장하는 변수입니다.

  let windowEl: HTMLElement; // 앱의 DOM 요소를 참조하는 변수입니다.

  const { height, width } = appsConfig[appID]; // 앱의 높이와 너비를 appsConfig에서 가져옵니다.

  const remModifier = +height * 1.2 >= window.innerHeight ? 24 : 16; // rem 단위를 조절하는 변수입니다.

  const randX = randint(-600, 600); // 랜덤한 x 좌표를 생성합니다.
  const randY = randint(-100, 100); // 랜덤한 y 좌표를 생성합니다.

  let defaultPosition = {
    x: (document.body.clientWidth / 2 + randX) / 2,
    y: (100 + randY) / 2,
  }; // 앱의 기본 위치를 설정합니다.

  $: $activeApp === appID && ($appZIndices[appID] = $activeAppZIndex); // 활성화된 앱이 현재 앱이면 z-index를 업데이트합니다.

  function focusApp() {
    $activeApp = appID; // 현재 앱을 활성화 상태로 만듭니다.
  }

  function windowCloseTransition(
    el: HTMLElement,
    { duration = $prefersReducedMotion ? 0 : 300 }: SvelteTransitionConfig = {},
  ): SvelteTransitionReturnType {
    const existingTransform = getComputedStyle(el).transform; // 현재 앱의 transform 값을 가져옵니다.

    return {
      duration,
      easing: sineInOut,
      css: (t) => `opacity: ${t}; transform: ${existingTransform} scale(${t})`, // 앱을 닫을 때의 트랜지션을 설정합니다.
    };
  }

  async function maximizeApp() {
    if (!$prefersReducedMotion) {
      windowEl.style.transition = 'height 0.3s ease, width 0.3s ease, transform 0.3s ease'; // 앱을 최대화할 때의 트랜지션을 설정합니다.
    }

    if (!isMaximized) {
      draggingEnabled = false; // 앱이 최대화 상태가 아니면 드래그를 비활성화합니다.

      minimizedTransform = windowEl.style.transform; // 현재 앱의 위치를 저장합니다.
      windowEl.style.transform = `translate(0px, 0px)`; // 앱의 위치를 초기화합니다.

      windowEl.style.width = `100%`; // 앱의 너비를 전체 화면으로 설정합니다.
      windowEl.style.height = 'calc(100vh - 1.7rem)'; // 앱의 높이를 전체 화면으로 설정합니다.
    } else {
      draggingEnabled = true; // 앱이 최대화 상태면 드래그를 활성화합니다.
      windowEl.style.transform = minimizedTransform; // 앱의 위치를 원래대로 복구합니다.

      windowEl.style.width = `${+width / remModifier}rem`; // 앱의 너비를 원래대로 복구합니다.
      windowEl.style.height = `${+height / remModifier}rem`; // 앱의 높이를 원래대로 복구합니다.
    }

    isMaximized = !isMaximized; // 앱의 최대화 상태를 토글합니다.

    $appsInFullscreen[appID] = isMaximized; // 앱의 전체화면 상태를 업데이트합니다.

    await waitFor(300); // 300ms 동안 대기합니다.

    if (!$prefersReducedMotion) windowEl.style.transition = ''; // 애니메이션을 비활성화합니다.
  }

  function closeApp() {
    $openApps[appID] = false; // 앱을 닫습니다.
    $appsInFullscreen[appID] = false; // 앱의 전체화면 상태를 해제합니다.
  }

  function onAppDragStart() {
    focusApp(); // 앱을 드래그 시작할 때 앱을 활성화 상태로 만듭니다.
    $isAppBeingDragged = true; // 앱이 드래그 중임을 나타냅니다.
  }

  function onAppDragEnd() {
    $isAppBeingDragged = false; // 앱의 드래그가 끝났음을 나타냅니다.
  }

  onMount(() => windowEl?.focus()); // 컴포넌트가 마운트될 때 앱을 포커스합니다.
</script>

<!-- 앱의 컨테이너 섹션입니다. -->
<!-- class:dark={$theme.scheme === 'dark'}  테마가 어두운 경우 'dark' 클래스를 추가합니다. 
class:active={$activeApp === appID}  현재 앱이 활성화된 앱이면 'active' 클래스를 추가합니다. 
style:width="{+width / remModifier}rem"  앱의 너비를 설정합니다. 
style:height="{+height / remModifier}rem"  앱의 높이를 설정합니다. 
style:z-index={$appZIndices[appID]}  앱의 z-index를 설정합니다. 
tabindex="-1"  앱이 키보드 탭 순서에서 제외되도록 합니다. 
bind:this={windowEl}  앱의 DOM 요소를 windowEl 변수에 바인딩합니다. 
use:draggable={{  앱을 드래그 가능하게 만듭니다. 
defaultPosition,  앱의 기본 위치를 설정합니다. 
handle: '.app-window-drag-handle',  드래그 핸들로 사용할 요소의 셀렉터를 설정합니다. 
bounds: { bottom: -6000, top: 27.2, left: -6000, right: -6000 },  드래그 가능한 범위를 설정합니다. 
disabled: !draggingEnabled,  드래그 가능 여부를 설정합니다. 
gpuAcceleration: false,  GPU 가속을 비활성화합니다. 
onDragStart: onAppDragStart,  드래그 시작 시 실행할 함수를 설정합니다. 
onDragEnd: onAppDragEnd,  드래그 종료 시 실행할 함수를 설정합니다. 
on:click={focusApp}  클릭 시 앱을 활성화합니다. 
on:keydown={() => {}}  키보드 이벤트를 무시합니다. 
out:windowCloseTransition 앱이 닫힐 때의 트랜지션을 설정합니다. -->
<section
  class="container"
  class:dark={$theme.scheme === 'dark'}
  class:active={$activeApp === appID}
  style:width="{+width / remModifier}rem"
  style:height="{+height / remModifier}rem"
  style:z-index={$appZIndices[appID]}
  tabindex="-1"
  bind:this={windowEl}
  use:draggable={{
    defaultPosition,
    handle: '.app-window-drag-handle',
    bounds: { bottom: -6000, top: 27.2, left: -6000, right: -6000 },
    disabled: !draggingEnabled,
    gpuAcceleration: false,

    onDragStart: onAppDragStart,
    onDragEnd: onAppDragEnd,
  }}
  on:click={focusApp}
  on:keydown={() => {}}
  out:windowCloseTransition
>
  <!-- 트래픽 라이트 컨테이너입니다. -->
  <div class="tl-container {appID}" use:elevation={'window-traffic-lights'}>
    <!-- 트래픽 라이트 컴포넌트입니다. -->
    <TrafficLights {appID} on:maximize-click={maximizeApp} on:close-app={closeApp} />
  </div>

  <!-- 앱 넥서스 컴포넌트입니다. -->
  <AppNexus {appID} isBeingDragged={$isAppBeingDragged} />
</section>

<!-- 스타일 섹션입니다. -->
<style lang="scss">
  .container {
    /* 그림자 효과를 정의합니다. */
    --elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.115), 0px 68px 80px rgba(0, 0, 0, 0.23);

    /* 컨테이너의 너비와 높이를 설정합니다. */
    width: 100%;
    height: 100%;

    /* 그리드 디스플레이를 사용하고, 행의 비율을 1로 설정합니다. */
    display: grid;
    grid-template-rows: 1fr;

    /* 컨테이너의 위치를 절대 위치로 설정합니다. */
    position: absolute;

    /* 너비와 높이의 변화를 최적화합니다. */
    will-change: width, height;

    /* 테두리의 둥근 정도를 설정합니다. */
    border-radius: 0.75rem;
    /* 그림자 효과를 적용합니다. */
    box-shadow: var(--elevated-shadow);

    /* 커서 스타일을 설정합니다. */
    cursor: var(--system-cursor-default), auto;

    /* 활성화된 컨테이너의 스타일을 정의합니다. */
    &.active {
      /* 그림자 효과를 변경합니다. */
      // --elevated-shadow: 0px 6.7px 12px rgba(0, 0, 0, 0.218), 0px 22.3px 40.2px rgba(0, 0, 0, 0.322),
      //   0px 100px 180px rgba(0, 0, 0, 0.54);
      --elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.28), 0px 68px 80px rgba(0, 0, 0, 0.56);
    }

    /* 어두운 테마의 컨테이너 스타일을 정의합니다. */
    &.dark {
      /* section과 div 요소의 스타일을 변경합니다. */
      & > :global(section),
      & > :global(div) {
        /* 테두리의 둥근 정도를 상속받습니다. */
        border-radius: inherit;
        /* 그림자 효과를 적용합니다. */
        box-shadow:
          inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
          0 0 0 1px hsla(var(--system-color-light-hsl), 0.5),
          var(--elevated-shadow);
      }
    }
  }

  /* tl-container 클래스의 스타일을 정의합니다. */
  .tl-container {
    /* 위치를 절대 위치로 설정하고, 상단과 왼쪽으로부터의 거리를 설정합니다. */
    position: absolute;
    top: 1rem;
    left: 1rem;

    /* 컨테이너에서 적용된 그림자 효과를 제거합니다. */
    box-shadow: none !important;
  }
</style>

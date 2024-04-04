<script context="module">
  /**
   * <script context="module">는 Svelte에서 모듈 컨텍스트를 선언하는 방법입니다.
   * 이 스크립트 블록 내에 선언된 변수와 함수는 해당 컴포넌트의 인스턴스 간에 공유되지 않습니다.
   * 대신, 이들은 모듈 수준에서 한 번만 평가되고, 모든 컴포넌트 인스턴스에 대해 동일하게 유지됩니다.
   * 이는 React의 useState와는 반대로 작동하며,
   * 각 컴포넌트 인스턴스가 독립적인 상태를 가지는 것이 아니라 모든 인스턴스가 공유하는 상태를 생성하는 데 사용됩니다.
   * 이는 전역 상태 관리나, 같은 컴포넌트의 여러 인스턴스 간에 상태를 공유해야 하는 경우에 유용합니다.
   */
  // 기본 너비를 설정합니다.
  const baseWidth = 57.6;
  // 거리 제한을 설정합니다.
  const distanceLimit = baseWidth * 6;
  // 거리 제한을 초과하는 값을 설정합니다.
  const beyondTheDistanceLimit = distanceLimit + 1;
  // 거리 입력값을 설정합니다.
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / 1.25,
    -distanceLimit / 2,
    0,
    distanceLimit / 2,
    distanceLimit / 1.25,
    distanceLimit,
  ];
  // 너비 출력값을 설정합니다.
  const widthOutput = [
    baseWidth,
    baseWidth * 1.1,
    baseWidth * 1.414,
    baseWidth * 2,
    baseWidth * 1.414,
    baseWidth * 1.1,
    baseWidth,
  ];
</script>

<script lang="ts">
  // 필요한 모듈들을 임포트합니다.
  import { interpolate } from 'popmotion';
  import { onDestroy } from 'svelte';
  import { sineInOut } from 'svelte/easing';
  import { spring, tweened } from 'svelte/motion';
  import { elevation } from '🍎/actions';
  import { appsConfig } from '🍎/configs/apps/apps-config';
  import { AppID, isAppBeingDragged } from '🍎/stores/apps.store';
  import { activeApp, openApps } from '🍎/stores/apps.store';
  import { prefersReducedMotion } from '🍎/stores/prefers-motion.store';
  import { theme } from '🍎/stores/theme.store';

  // 변수들을 선언합니다.
  export let mouseX: number | null;
  export let appID: AppID;
  export let needsUpdate: boolean = false;

  let imageEl: HTMLImageElement;

  let distance = beyondTheDistanceLimit;

  // 스프링 애니메이션을 설정합니다.
  const widthPX = spring(baseWidth, {
    damping: 0.47,
    stiffness: 0.12,
  });

  // 거리에 따른 너비를 계산하는 함수를 설정합니다.
  const getWidthFromDistance = interpolate(distanceInput, widthOutput);
  $: $widthPX = getWidthFromDistance(distance);

  let raf: number;
  function animate() {
    if (imageEl && mouseX !== null) {
      const rect = imageEl.getBoundingClientRect();

      // 이미지의 중심 x 좌표를 계산합니다.
      // get the x coordinate of the img DOMElement's center
      // the left x coordinate plus the half of the width
      const imgCenterX = rect.left + rect.width / 2;

      // 마우스 포인터의 x 좌표와 이미지 중심의 x 좌표의 차이를 계산합니다.
      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseX - imgCenterX;
      distance = distanceDelta;
      return;
    }

    distance = beyondTheDistanceLimit;
  }

  // 마우스의 x 좌표가 변경되거나 앱이 드래그 중이거나 모션 감소를 선호하는 경우에 애니메이션을 실행합니다.
  $: {
    mouseX;
    if ($prefersReducedMotion || $isAppBeingDragged) break $;

    raf = requestAnimationFrame(animate);
  }

  // 앱 설정을 가져옵니다.
  const { title, shouldOpenWindow, externalAction } = appsConfig[appID];

  // 클릭 애니메이션을 위한 스프링 애니메이션을 설정합니다.
  // Spring animation for the click animation
  const appOpenIconBounceTransform = tweened(0, {
    duration: 400,
    easing: sineInOut,
  });

  // 바운스 효과를 위한 함수를 설정합니다.
  async function bounceEffect() {
    // 아이콘을 애니메이션합니다.
    // Animate the icon
    await appOpenIconBounceTransform.set(-40);

    // 아이콘을 원래 위치로 되돌립니다.
    // Now animate it back to its place
    appOpenIconBounceTransform.set(0);
  }

  // 앱을 열기 위한 함수를 설정합니다.
  async function openApp(e: MouseEvent) {
    if (!shouldOpenWindow) return externalAction?.(e);

    // 바운스 애니메이션을 위한 설정입니다.
    // For the bounce animation
    const isAppAlreadyOpen = $openApps[appID];

    $openApps[appID] = true;
    $activeApp = appID;

    if (isAppAlreadyOpen) return;

    bounceEffect();
  }

  // 애니메이션을 취소합니다.
  onDestroy(() => {
    cancelAnimationFrame(raf);
  });

  // 앱스토어인지 확인합니다.
  $: isAppStore = appID === 'appstore';
  // PWA 배지를 표시할지 확인합니다.
  $: showPwaBadge = isAppStore && needsUpdate;
  // PWA 배지를 표시하면 바운스 효과를 적용합니다.
  $: showPwaBadge && bounceEffect();
</script>

<!-- 앱을 열기 위한 버튼입니다. 클릭하면 openApp 함수가 호출됩니다. -->
<button on:click={openApp} aria-label="Launch {title} app" class="dock-open-app-button {appID}">
  <!-- 툴팁입니다. 앱이 드래그 중이 아니면 활성화되고, 테마가 어두운 경우에는 dark 클래스가 적용됩니다. -->
  <!-- prefersReducedMotion이 true이면 top 스타일이 -50px, 아니면 -35%입니다. -->
  <!-- transform 스타일은 appOpenIconBounceTransform의 값에 따라 변합니다. -->
  <p
    class="tooltip"
    class:tooltip-enabled={!$isAppBeingDragged}
    class:dark={$theme.scheme === 'dark'}
    style:top={$prefersReducedMotion ? '-50px' : '-35%'}
    style:transform="translate(0, {$appOpenIconBounceTransform}px)"
    use:elevation={'dock-tooltip'}
  >
    {title}
    <!-- 툴팁의 내용은 앱의 제목입니다. -->
  </p>

  <!-- 이미지를 감싸는 span 요소입니다. transform 스타일은 appOpenIconBounceTransform의 값에 따라 변합니다. -->
  <span style:transform="translate(0, {$appOpenIconBounceTransform}px)">
    <!-- 앱의 아이콘 이미지입니다. 너비는 widthPX의 값에 따라 변하며, 드래그는 불가능합니다. -->
    <img
      bind:this={imageEl}
      src="/macos-web/app-icons/{appID}/256.webp"
      alt="{title} app"
      style:width="{$widthPX / 16}rem"
      draggable="false"
    />
  </span>

  <!-- 앱이 열려있는 경우에 표시되는 점입니다. openApps의 값에 따라 투명도가 변합니다. -->
  <div class="dot" style:--opacity={+$openApps[appID]} />

  <!-- PWA 업데이트가 필요한 경우에 표시되는 배지입니다. -->
  <!-- 배지의 크기는 widthPX와 baseWidth의 비율에 따라 변합니다. -->
  {#if showPwaBadge}
    <div class="pwa-badge" style:transform="scale({$widthPX / baseWidth})">1</div>
  {/if}
</button>

<style lang="scss">
  // 이미지의 너비가 변경될 수 있음을 브라우저에 알립니다.
  img {
    will-change: width;
  }

  // 버튼의 스타일을 설정합니다.
  button {
    // 버튼 내부의 아이템들을 세로로 배열합니다.
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;

    // 버튼의 모서리를 둥글게 만듭니다.
    border-radius: 0.5rem;

    // 버튼에 마우스를 올리거나 포커스가 있을 때 툴팁을 표시합니다.
    &:hover,
    &:focus-visible {
      .tooltip.tooltip-enabled {
        display: block;
      }
    }

    // 버튼 내부의 span 요소의 스타일을 설정합니다.
    & > span {
      // span 내부의 아이템들을 가운데 정렬합니다.
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  // 툴팁의 스타일을 설정합니다.
  .tooltip {
    // 툴팁의 테두리를 설정합니다.
    --double-border: 0 0 0 0 white;

    // 툴팁 내부의 텍스트가 한 줄로 표시되도록 합니다.
    white-space: nowrap;

    // 툴팁의 위치를 설정합니다.
    position: absolute;

    // 툴팁의 배경색을 설정합니다.
    background-color: hsla(var(--system-color-light-hsl), 0.5);
    // 툴팁의 배경에 블러 효과를 적용합니다.
    backdrop-filter: blur(5px);

    // 툴팁의 패딩을 설정합니다.
    padding: 0.5rem 0.75rem;
    // 툴팁의 모서리를 둥글게 만듭니다.
    border-radius: 0.375rem;

    // 툴팁의 그림자를 설정합니다.
    box-shadow:
      hsla(0deg, 0%, 0%, 30%) 0px 1px 5px 2px,
      var(--double-border);

    // 툴팁의 텍스트 색상을 설정합니다.
    color: var(--system-color-light-contrast);
    // 툴팁의 폰트를 설정합니다.
    font-family: var(--system-font-family);
    font-weight: 400;
    font-size: 0.9rem;
    letter-spacing: 0.4px;

    // 툴팁을 기본적으로 숨깁니다.
    display: none;

    // 테마가 어두운 경우 툴팁의 테두리를 변경합니다.
    &.dark {
      --double-border: inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
        0 0 0 1.2px hsla(var(--system-color-light-hsl), 0.3);
    }
  }

  // 앱이 열려있는 경우 표시되는 점의 스타일을 설정합니다.
  .dot {
    height: 4px;
    width: 4px;

    margin: 0px;

    // 점을 원형으로 만듭니다.
    border-radius: 50%;

    // 점의 색상을 설정합니다.
    background-color: var(--system-color-dark);

    // 점의 투명도를 설정합니다.
    opacity: var(--opacity);
  }

  // PWA 업데이트가 필요한 경우 표시되는 배지의 스타일을 설정합니다.
  .pwa-badge {
    position: absolute;
    top: 1px;
    right: -1px;

    // 배지의 배경색을 설정합니다.
    background-color: rgba(248, 58, 58, 0.85);

    // 배지의 그림자를 설정합니다.
    box-shadow: hsla(var(--system-color-dark-hsl), 0.4) 0px 0.5px 2px;
    // 배지를 원형으로 만듭니다.
    border-radius: 50%;

    // 배지에 마우스 이벤트를 적용하지 않습니다.
    pointer-events: none;
    vertical-align: middle;

    // 배지의 크기를 설정합니다.
    width: 1.5rem;
    height: 1.5rem;

    margin: 0;
    padding: 0;

    // 배지 내부의 텍스트를 가운데 정렬합니다.
    text-align: center;
    // 배지의 텍스트 색상을 설정합니다.
    color: white;

    // 배지의 텍스트 크기를 설정합니다.
    font-size: 1rem;
    // 배지의 텍스트 라인 높이를 설정합니다.
    line-height: 1.5;
  }
</style>

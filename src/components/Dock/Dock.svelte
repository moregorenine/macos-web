<script lang="ts">
  // 액션을 가져옵니다.
  import { elevation } from '🍎/actions';
  // 앱 설정을 가져옵니다.
  import { appsConfig } from '🍎/configs/apps/apps-config';
  // 앱 상태를 관리하는 스토어를 가져옵니다.
  import { appsInFullscreen } from '🍎/stores/apps.store';
  // 시스템 상태를 관리하는 스토어를 가져옵니다.
  import { systemNeedsUpdate } from '🍎/stores/system.store';
  // 독 상태를 관리하는 스토어를 가져옵니다.
  import { isDockHidden } from '🍎/stores/dock.store';
  // 독 아이템 컴포넌트를 가져옵니다.
  import DockItem from './DockItem.svelte';

  // 독의 마우스 X 좌표를 저장하는 변수를 선언합니다.
  let dockMouseX: number | null = null;

  // 독이 숨겨져야 하는 임계값을 선언합니다.
  const HIDDEN_DOCK_THRESHOLD = 30;
  // body의 높이를 저장하는 변수를 선언합니다.
  let bodyHeight = 0;
  // 마우스의 Y 좌표를 저장하는 변수를 선언합니다.
  let mouseY = 0;

  // 독 컨테이너 요소를 저장하는 변수를 선언합니다.
  let dockContainerEl: HTMLElement;

  // 반응성을 가진 코드 블록입니다.
  $: {
    /**
     * Due to how pointer-events: none works, if dock auto opens, you move away, it won't close automatically.
     * So close it manually if mouse pointer goes out of the dock area.
     * pointer-events: none의 작동 방식 때문에, 독이 자동으로 열리면 마우스를 옮겨도 자동으로 닫히지 않습니다.
     * 따라서 마우스 포인터가 독 영역 밖으로 나가면 수동으로 닫습니다.
     */
    if (Math.abs(mouseY - bodyHeight) > dockContainerEl?.clientHeight) {
      dockMouseX = null;
    }

    /**
     * if mouseX != null then show the dock. No matter what
     * When it becomes null, Then use the mouseY and bodyHeight to determine if the dock should be hidden
     * mouseX가 null이 아니면 독을 표시합니다. 무조건
     * mouseX가 null이 되면, mouseY와 bodyHeight를 사용하여 독이 숨겨져야 하는지 결정합니다.
     */
    if (dockMouseX !== null) {
      $isDockHidden = false;
      break $;
    }

    // 전체 화면 모드인 앱이 없으면 독을 표시합니다.
    if (!Object.values($appsInFullscreen).some(Boolean)) {
      $isDockHidden = false;
      break $;
    }

    // 마우스의 Y 좌표와 body의 높이의 차이가 임계값보다 크면 독을 숨깁니다.
    $isDockHidden = Math.abs(mouseY - bodyHeight) > HIDDEN_DOCK_THRESHOLD;
  }
</script>

<!-- 마우스가 움직일 때마다, 마우스의 Y 좌표를 mouseY에 저장합니다. -->
<svelte:body on:mousemove={({ y }) => (mouseY = y)} />

<!-- 윈도우의 높이를 bodyHeight에 바인딩합니다. -->
<svelte:window bind:innerHeight={bodyHeight} />

<!-- 독 컨테이너 섹션입니다. 독이 숨겨져 있으면 'dock-hidden' 클래스가 추가됩니다. -->
<section
  class="dock-container"
  class:dock-hidden={$isDockHidden}
  bind:this={dockContainerEl}
  use:elevation={'dock'}
>
  <!-- 독 요소입니다. 마우스가 움직이면 dockMouseX에 마우스의 X 좌표를 저장하고, 마우스가 떠나면 dockMouseX를 null로 설정합니다. -->
  <div
    class="dock-el"
    class:hidden={$isDockHidden}
    on:mousemove={(event) => (dockMouseX = event.x)}
    on:mouseleave={() => (dockMouseX = null)}
  >
    {#each Object.entries(appsConfig) as [appID, config]}
      {#if config.dockBreaksBefore}
        <div class="divider" aria-hidden="true" />
      {/if}
      <!-- DockItem 컴포넌트를 렌더링합니다. mouseX, appID, needsUpdate를 props로 전달합니다. -->
      <DockItem mouseX={dockMouseX} {appID} needsUpdate={$systemNeedsUpdate} />
    {/each}
  </div>
</section>

<style lang="scss">
  .dock-container {
    padding-bottom: 0.7rem; // 하단 패딩 설정
    left: 0; // 왼쪽 위치 설정
    bottom: 0; // 하단 위치 설정

    width: 100%; // 너비 100% 설정
    height: 5.2rem; // 높이 설정

    padding: 0.4rem; // 패딩 설정

    display: flex; // flex 디스플레이 설정
    justify-content: center; // 가운데 정렬 설정

    &:not(.dock-hidden) {
      pointer-events: none; // dock-hidden 클래스가 없으면 포인터 이벤트 비활성화
    }
  }

  .dock-el {
    background-color: hsla(var(--system-color-light-hsl), 0.4); // 배경색 설정

    box-shadow: // 그림자 설정
      inset 0 0 0 0.2px hsla(var(--system-color-grey-100-hsl), 0.7),
      0 0 0 0.2px hsla(var(--system-color-grey-900-hsl), 0.7),
      hsla(0, 0%, 0%, 0.3) 2px 5px 19px 7px;

    position: relative; // 위치를 상대적으로 설정

    padding: 0.3rem; // 패딩 설정

    border-radius: 1.2rem; // 테두리 둥글게 설정

    height: 100%; // 높이 100% 설정

    display: flex; // flex 디스플레이 설정
    align-items: flex-end; // 아이템을 하단에 정렬

    transition: transform 0.3s ease; // 변환 효과 설정

    &:not(.hidden) {
      pointer-events: auto; // hidden 클래스가 없으면 포인터 이벤트 활성화
    }

    &.hidden {
      transform: translate3d(0, 200%, 0); // hidden 클래스가 있으면 3D 변환 적용

      &::before {
        width: calc(100% - 2px); // 너비 설정
        height: calc(100% - 2px); // 높이 설정

        margin-top: 1px; // 상단 마진 설정
        margin-left: 1px; // 왼쪽 마진 설정
      }
    }

    &::before {
      content: ''; // 내용 없음

      border-radius: 20px; // 테두리 둥글게 설정

      width: 100%; // 너비 100% 설정
      height: 100%; // 높이 100% 설정

      border: inherit; // 테두리 스타일 상속

      backdrop-filter: blur(10px); // 배경 필터 설정

      position: absolute; // 위치를 절대적으로 설정
      top: 0; // 상단 위치 설정
      left: 0; // 왼쪽 위치 설정

      z-index: -1; // z-index 설정
    }
  }

  .divider {
    height: 100%; // 높이 100% 설정
    width: 0.2px; // 너비 설정

    background-color: hsla(var(--system-color-dark-hsl), 0.3); // 배경색 설정

    margin: 0 4px; // 마진 설정
  }
</style>

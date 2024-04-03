<script lang="ts">
  // 필요한 모듈들을 import 합니다.
  import { elevation } from '🍎/actions';
  import { contextMenuConfig } from '🍎/configs/menu/context.menu.config';
  import { fadeOut } from '🍎/helpers/fade';
  import { theme } from '🍎/stores/theme.store';

  // targetElement라는 prop을 선언합니다. 이 prop은 부모 컴포넌트로부터 받아옵니다.
  export let targetElement: HTMLElement;

  // 컨텍스트 메뉴의 위치를 저장할 변수를 선언합니다.
  let xPos = 0;
  let yPos = 0;

  // 컨텍스트 메뉴의 보이는 상태를 저장할 변수를 선언합니다.
  let isMenuVisible = false;

  // 컨텍스트 메뉴를 처리하는 함수를 선언합니다.
  function handleContextMenu(e: MouseEvent) {
    // 이벤트가 발생한 대상이 targetElement의 자식이 아니라면 메뉴를 숨깁니다.
    if (!targetElement?.contains(e.target as HTMLElement)) return (isMenuVisible = false);

    // 이벤트가 발생한 위치를 저장합니다.
    let x = e.pageX;
    let y = e.pageY;

    // Open to other side if rest of space is too small
    // 메뉴가 화면 밖으로 나가지 않도록 위치를 조정합니다.
    if (window.innerWidth - x < 250) x -= 250;
    if (window.innerHeight - y < 300) y -= 250;

    // 조정된 위치를 저장합니다.
    xPos = x;
    yPos = y;

    // 메뉴를 보이게 합니다.
    isMenuVisible = true;
  }

  // 메뉴를 숨기는 함수를 선언합니다.
  function hideMenu() {
    isMenuVisible = false;
  }
</script>

<!-- body 요소에 이벤트 리스너를 추가합니다. -->
<svelte:body on:contextmenu|preventDefault={handleContextMenu} on:click={hideMenu} />

<!-- 메뉴가 보이는 상태일 때만 메뉴를 렌더링합니다. -->
{#if isMenuVisible}
  <!-- 'container' 클래스를 적용하고, 테마가 'dark'일 경우 'dark' 클래스를 추가로 적용합니다.
저장된 xPos, yPos 좌표로 메뉴의 위치를 이동시킵니다.
메뉴가 사라질 때 fadeOut 효과를 적용합니다.
'context-menu' 스타일의 그림자 효과를 적용합니다. -->
  <div
    class="container"
    class:dark={$theme.scheme === 'dark'}
    style:transform="translate({xPos}px, {yPos}px)"
    out:fadeOut
    use:elevation={'context-menu'}
  >
    <!-- contextMenuConfig.default 객체의 모든 값을 순회하면서 메뉴 아이템을 생성합니다. -->
    {#each Object.values(contextMenuConfig.default) as contents}
      <!-- 각 메뉴 아이템의 제목을 버튼에 표시합니다. -->
      <button class="menu-item">{contents.title}</button>

      <!-- 메뉴 아이템에 'breakAfter' 속성이 있으면 구분선을 추가합니다. -->
      {#if contents.breakAfter}
        <div class="divider" />
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  .container {
    // 추가적인 그림자 효과를 정의합니다. 초기 값은 흰색 그림자 없음입니다.
    --additional-shadow: 0 0 0 0 white;

    // 컨테이너를 블록 요소로 설정합니다.
    display: block;

    // 컨테이너의 최소 너비를 16rem으로 설정합니다.
    min-width: 16rem;

    // 컨테이너의 패딩을 0.5rem으로 설정합니다.
    padding: 0.5rem;

    // 컨테이너의 위치를 고정하고, 상단과 왼쪽으로부터 0의 위치에 놓습니다.
    position: fixed;
    top: 0;
    left: 0;

    // 폰트 스무딩을 적용합니다.
    -webkit-font-smoothing: antialiased;

    // 사용자가 컨테이너를 선택하지 못하게 합니다.
    user-select: none;

    // 컨테이너의 배경색을 설정합니다.
    background-color: hsla(var(--system-color-light-hsl), 0.3);

    // 컨테이너의 테두리 둥근 정도를 설정합니다.
    border-radius: 0.5rem;

    // 컨테이너의 그림자를 설정합니다.
    box-shadow:
      hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px,
      var(--additional-shadow);

    // 다크 모드일 때의 스타일을 설정합니다.
    &.dark {
      // 다크 모드에서의 추가 그림자를 설정합니다.
      --additional-shadow: inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
        0 0 0 1.2px hsla(var(--system-color-light-hsl), 0.3);

      // 다크 모드에서의 전체 스케일을 조정합니다.
      &::before {
        transform: scale(0.99);
      }
    }

    // 컨테이너의 전체 스케일을 조정합니다.
    &::before {
      content: '';

      width: 100%;
      height: 100%;

      border-radius: inherit;

      position: absolute;
      left: 0;
      top: 0;

      transform: scale(0.996);

      z-index: -1;
      backdrop-filter: blur(15px);
    }

    // 컨테이너 내의 모든 요소에 폰트 스무딩을 적용합니다.
    * {
      -webkit-font-smoothing: antialiased;
    }
  }

  .menu-item {
    // 메뉴 아이템의 투명도를 설정합니다.
    --alpha: 1;

    // 메뉴 아이템을 플렉스 요소로 설정하고, 내용을 왼쪽으로 정렬합니다.
    display: flex;
    justify-content: flex-start;

    // 메뉴 아이템의 너비를 100%로 설정합니다.
    width: 100%;

    // 메뉴 아이템의 패딩과 마진을 설정합니다.
    padding: 0.3rem 0.4rem;
    margin: 0.2rem 0;

    // 메뉴 아이템의 글자 간격, 폰트 두께, 폰트 크기를 설정합니다.
    letter-spacing: 0.4px;
    font-weight: 400;
    font-size: 0.9rem;

    // 메뉴 아이템의 테두리 둥근 정도를 설정합니다.
    border-radius: 0.3rem;

    // 메뉴 아이템의 뒷면을 보이지 않게 합니다.
    backface-visibility: hidden;

    // 메뉴 아이템의 전환 효과를 없앱니다.
    transition: none;

    // 메뉴 아이템의 글자색을 설정합니다.
    color: hsla(var(--system-color-dark-hsl), var(--alpha));

    // 메뉴 아이템에 마우스를 올리거나 포커스했을 때의 배경색과 글자색을 설정합니다.
    &:hover,
    &:focus-visible {
      background-color: var(--system-color-primary);
      color: var(--system-color-primary-contrast);
    }
  }

  .divider {
    // 구분선의 너비와 높이를 설정합니다.
    width: 100%;
    height: 0.2px;

    // 구분선의 배경색을 설정합니다.
    background-color: hsla(var(--system-color-dark-hsl), 0.2);

    // 구분선의 마진을 설정합니다.
    margin: 2px 0;
  }
</style>

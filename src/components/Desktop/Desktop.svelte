<script lang="ts">
  // 필요한 컴포넌트들을 import 합니다.
  import Dock from '🍎/components/Dock/Dock.svelte';
  import TopBar from '🍎/components/TopBar/TopBar.svelte';
  import Wallpaper from '../apps/WallpaperApp/Wallpaper.svelte';
  import BootupScreen from './BootupScreen.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import SystemUpdate from './SystemUpdate.svelte';
  import WindowsArea from './Window/WindowsArea.svelte';

  // 사용자의 디바이스가 Mac 계열인지 확인합니다.
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

  // Mac 계열이 아닌 경우, Inter 폰트의 다양한 두께를 비동기적으로 로드합니다.
  if (!isMac) {
    Promise.all([
      import('@fontsource/inter/latin-ext-300.css'),
      import('@fontsource/inter/latin-ext-400.css'),
      import('@fontsource/inter/latin-ext-500.css'),
      import('@fontsource/inter/latin-ext-600.css'),
    ]).then(() => {
      console.log(1);
    });
  }

  // mainEl 변수를 선언합니다. 이 변수는 아래에서 bind:this={mainEl}을 통해 HTML 요소에 바인딩됩니다.
  let mainEl: HTMLElement;
</script>

<!-- 메인 컨테이너를 정의합니다. 이 컨테이너는 다른 컴포넌트들을 포함합니다. -->
<!-- mainEl이라는 변수를 현재의 div 요소에 바인딩합니다.
  bind:this는 Svelte에서 제공하는 특별한 구문으로,
  이를 통해 JavaScript 변수와 DOM 요소를 직접 연결할 수 있습니다.
  이렇게 하면 mainEl 변수를 통해 이 div 요소를 직접 조작할 수 있게 됩니다. -->
<div bind:this={mainEl} class="container">
  <!-- 메인 영역을 정의합니다. 여기에는 상단 바, 윈도우 영역, 독이 포함됩니다. -->
  <main>
    <TopBar />
    <WindowsArea />
    <Dock />
  </main>

  <!-- 배경화면, 부팅 화면, 시스템 업데이트 화면을 추가합니다. -->
  <Wallpaper />
  <BootupScreen />
  <SystemUpdate />

  <!-- 컨텍스트 메뉴를 추가합니다. 이 메뉴는 mainEl 요소에 바인딩됩니다. -->
  <!-- ContextMenu 컴포넌트에 targetElement라는 prop을 전달합니다.
    이 prop의 값으로 mainEl을 사용하고 있습니다.
    즉, ContextMenu 컴포넌트는 mainEl이 가리키는 DOM 요소를 대상으로 동작하게 됩니다.
    이를 통해 ContextMenu 컴포넌트는 mainEl이 가리키는 div 요소에 대한 컨텍스트 메뉴를 제공하게 됩니다. -->
  <ContextMenu targetElement={mainEl} />
</div>

<!-- 컨테이너의 스타일을 정의합니다. -->
<style lang="scss">
  .container {
    height: 100%;
    width: 100%;
  }

  main {
    height: 100%;
    width: 100%;

    // 그리드 레이아웃을 사용하여 상단 바, 윈도우 영역, 독이 차지하는 행을 구성합니다.
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>

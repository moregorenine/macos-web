<script lang="ts">
  // 앱 설정을 가져옵니다.
  import { appsConfig } from '🍎/configs/apps/apps-config';
  // 앱 상태를 관리하는 스토어를 가져옵니다.
  import { activeApp, activeAppZIndex, appZIndices, openApps } from '🍎/stores/apps.store';
  // // 폴더 상태를 관리하는 스토어를 가져옵니다.
  // import { folders } from '🍎/stores/folders.store';
  // // 폴더 아이콘 컴포넌트를 가져옵니다.
  // import FolderIcon from '🍎/components/Desktop/FolderIcon.svelte';

  // 활성 앱이 변경될 때마다 활성 앱의 z-인덱스를 2 증가시킵니다.
  $: $activeApp, ($activeAppZIndex += 2);

  // 모든 앱의 z-인덱스가 50 이하로 유지되도록 합니다. 이렇게 하면 UI 요소 위로 올라가지 않습니다.
  function normalizeAppZIndices() {
    // 모든 앱의 z-인덱스가 50 이하인 경우 함수를 종료합니다.
    if (!Object.values($appZIndices).some((zIndex) => zIndex > 50)) return;

    // 0이 아닌 가장 낮은 z-인덱스를 가져옵니다.
    const lowestZIndex = Math.min(
      ...[...new Set(Object.values($appZIndices))].filter((val) => val !== 0),
    );

    // 활성 앱의 z-인덱스에서 가장 낮은 z-인덱스를 뺍니다.
    $activeAppZIndex -= lowestZIndex;

    // 모든 앱의 키를 가져옵니다.
    const keys = Object.keys($appZIndices);

    // 각 앱에 대해
    for (const app of keys) {
      // 해당 앱의 z-인덱스가 가장 낮은 z-인덱스 이상인 경우
      if ($appZIndices[app] >= lowestZIndex) {
        // 해당 앱의 z-인덱스에서 가장 낮은 z-인덱스를 뺍니다.
        $appZIndices[app] -= lowestZIndex;
      }
    }
  }

  // 앱의 z-인덱스가 변경될 때마다 normalizeAppZIndices 함수를 호출합니다.
  $: $appZIndices, normalizeAppZIndices();
</script>

<!-- 윈도우 영역을 정의합니다. -->
<section id="windows-area">
  <!-- 각 폴더에 대해 폴더 아이콘 컴포넌트를 렌더링합니다. -->
  <!-- {#each $folders as folder (folder.id)}
    <FolderIcon {folder} />
  {/each} -->
  <!-- 각 앱에 대해 -->
  {#each Object.keys(appsConfig) as appID}
    <!-- 해당 앱이 열려 있고, 해당 앱이 윈도우를 열어야 하는 경우 -->
    {#if $openApps[appID] && appsConfig[appID].shouldOpenWindow}
      <!-- 윈도우 컴포넌트를 동적으로 임포트하고 -->
      {#await import('./Window.svelte') then { default: Window }}
        <!-- 윈도우 컴포넌트를 렌더링합니다. -->
        <Window {appID} />
      {/await}
    {/if}
  {/each}
</section>

<style lang="scss">
  section {
    display: block;

    // 1.7 rem is the heigh of the header
    // 5.25 rem is the height of dock
    // top: 1.75rem;
    height: 100%;

    width: 100vw;

    justify-self: center;
  }
</style>

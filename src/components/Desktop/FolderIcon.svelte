<!-- src/components/FolderIcon.svelte -->
<script lang="ts">
  export let folder;
</script>

<div class="folder-icon">
  <img src="/macos-web/app-icons/folder/icon.png" alt={folder.name} />
  <p>{folder.name}</p>
</div>

<style>
  .folder-icon {
    margin: 35px;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .folder-icon img {
    width: 100%;
    height: auto;
  }

  .folder-icon p {
    margin-top: 5px;
    font-size: 12px;
    word-break: break-all;
  }
</style>

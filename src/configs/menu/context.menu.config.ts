// import { folders } from '🍎/stores/folders.store';
import {windowItems} from '🍎/stores/window-items.store';

'🍎/stores/window-items.store'

/**
 * 이 코드는 컨텍스트 메뉴의 설정을 정의하는 객체를 내보냅니다.
 * 각 메뉴 항목은 제목(title)과 해당 항목 다음에 구분선을 그릴지 여부(breakAfter)를 설정할 수 있습니다.
 * 이 설정은 컨텍스트 메뉴를 렌더링할 때 사용됩니다.
 */

// 컨텍스트 메뉴의 설정을 정의하는 객체입니다.
export const contextMenuConfig = {
  // 기본 컨텍스트 메뉴의 설정입니다.
  default: {
    // '새 폴더' 메뉴 항목의 설정입니다.
    'new-folder': {
      title: 'New Folder', // 메뉴 항목의 제목입니다.
      breakAfter: true, // 이 메뉴 항목 다음에 구분선을 그립니다.
      action: () => {
        console.log('New Folder');
        windowItems.update((currentWindowItems) => [
          ...currentWindowItems,
          { appID : Date.now() },
        ]);
      },
    },
    // '정보 가져오기' 메뉴 항목의 설정입니다.
    'get-info': {
      title: 'Get Info',
      breakAfter: false,
      action: () => {},
    },
    // '바탕화면 배경 변경' 메뉴 항목의 설정입니다.
    'change-desktop-bg': {
      title: 'Change Desktop Background',
      breakAfter: true,
      action: () => {},
    },
    // '스택 사용' 메뉴 항목의 설정입니다.
    'use-stacks': {
      title: 'Use Stacks',
      breakAfter: false,
      action: () => {},
    },
    // '정렬 기준' 메뉴 항목의 설정입니다.
    'sort-by': {
      title: 'Sort By',
      breakAfter: false,
      action: () => {},
    },
    // '정리' 메뉴 항목의 설정입니다.
    'clean-up': {
      title: 'Clean Up',
      breakAfter: false,
      action: () => {},
    },
    // '기준에 따라 정리' 메뉴 항목의 설정입니다.
    'clean-up-by': {
      title: 'Clean Up By',
      breakAfter: false,
      action: () => {},
    },
    // '보기 옵션 표시' 메뉴 항목의 설정입니다.
    'show-view-options': {
      title: 'Show View Options',
      breakAfter: false,
      action: () => {},
    },
  },
};

import { tick } from 'svelte';

/**
 * 사용법: <div use:portal={'css selector'}> 또는 <div use:portal={document.body}>
 * 이 코드는 Svelte의 액션을 사용하여 '포탈' 기능을 구현한 것입니다.
 * 포탈은 특정 요소를 DOM 트리의 다른 위치로 '이동'시키는 기능을 말합니다.
 * 이는 모달 다이얼로그, 툴팁, 드롭다운 메뉴 등에서 유용하게 사용됩니다.
 *
 * @param {HTMLElement} el
 * @param {HTMLElement|string} target DOM 요소 또는 CSS 선택자
 */
export function portal(el: HTMLElement, target: HTMLElement | string = 'body') {
  let targetEl: HTMLElement;

  async function update(newTarget: HTMLElement | string) {
    target = newTarget;

    // target이 문자열이라면 CSS 선택자로 간주하고 해당 요소를 찾습니다.
    if (typeof target === 'string') {
      targetEl = document.querySelector(target);

      // 요소를 찾지 못했다면 tick 함수를 사용하여 다음 업데이트 사이클까지 기다린 후 다시 시도합니다.
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }

      // 그래도 요소를 찾지 못했다면 에러를 발생시킵니다.
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    }
    // target이 HTMLElement 인스턴스라면 해당 요소를 직접 사용합니다.
    else if (target instanceof HTMLElement) {
      targetEl = target;
    }
    // target이 알 수 없는 타입이라면 에러를 발생시킵니다.
    else {
      throw new TypeError(
        `Unknown portal target type: ${
          target === null ? 'null' : typeof target
        }. Allowed types: string (CSS selector) or HTMLElement.`,
      );
    }
    // el을 targetEl의 자식 요소로 추가합니다.
    targetEl.appendChild(el);
    // el을 보이게 합니다.
    el.hidden = false;
  }

  // el을 부모 요소에서 제거하는 함수입니다.
  function destroy() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  // target을 업데이트하고, 이에 따라 el의 위치를 업데이트합니다.
  update(target);

  return {
    // target이 변경될 때마다 호출되는 update 함수를 반환합니다.
    update,
    // el을 부모 요소에서 제거하는 destroy 함수를 반환합니다.
    destroy,
  };
}

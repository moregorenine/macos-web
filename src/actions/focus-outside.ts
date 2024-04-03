/** Dispatch event on click outside of node */
/** 노드 외부 포커스 시 이벤트를 발생시킵니다. */
export function focusOutside(node: HTMLElement, options: { callback: () => void }) {
  // 포커스 이벤트 핸들러를 정의합니다.
  function handleFocus(e: FocusEvent) {
    const target = e.target as HTMLElement;

    // 포커스한 대상이 노드 내부가 아니라면 콜백 함수를 실행합니다.
    if (!node?.contains(target)) options.callback();
  }

  // 포커스 이벤트 핸들러를 문서에 등록합니다.
  document.addEventListener('focus', handleFocus, true);

  return {
    // 포커스 이벤트 핸들러를 제거하는 destroy 함수를 반환합니다.
    destroy() {
      document.removeEventListener('focus', handleFocus, true);
    },
  };
}

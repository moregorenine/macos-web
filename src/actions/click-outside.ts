/** Dispatch event on click outside of node */
/** 노드 외부 클릭 시 이벤트를 발생시킵니다. */
// 이 함수는 주어진 HTML 요소(node) 외부를 클릭했을 때,
// 주어진 콜백 함수(options.callback)를 실행하는 이벤트 리스너를 문서에 추가합니다.
// 또한, 이 이벤트 리스너를 제거하는 destroy 함수를 반환합니다.
// 이 destroy 함수는 주로 컴포넌트가 파괴될 때 호출되어,
// 더 이상 필요하지 않은 이벤트 리스너를 제거하는 데 사용됩니다.
export function clickOutside(node: HTMLElement, options: { callback: () => void }) {
  // 클릭 이벤트 핸들러를 정의합니다.
  const handleClick = (e: MouseEvent) => {
    // 클릭한 대상이 노드 내부가 아니라면 콜백 함수를 실행합니다.
    if (!node.contains(e.target as HTMLElement)) options.callback();
  };

  // 클릭 이벤트 핸들러를 문서에 등록합니다.
  document.addEventListener('click', handleClick, true);

  return {
    // 클릭 이벤트 핸들러를 제거하는 destroy 함수를 반환합니다.
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}

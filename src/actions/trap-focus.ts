// 포커스를 갖는 HTML 요소들의 목록입니다.
let trapFocusList: HTMLElement[] = [];

// 다음 요소로 이동하는지 확인하는 함수입니다.
const isNext = (event: KeyboardEvent) => event.key === 'Tab' && !event.shiftKey;
// 이전 요소로 이동하는지 확인하는 함수입니다.
const isPrevious = (event: KeyboardEvent) => event.key === 'Tab' && event.shiftKey;

// 포커스 이벤트 핸들러입니다.
const trapFocusListener = (event: KeyboardEvent) => {
  // 이벤트 대상이 window라면 함수를 종료합니다.
  if (event.target === window) {
    return;
  }

  const eventTarget = event.target as Element;

  // 이벤트 대상을 포함하는 노드를 찾습니다.
  const parentNode = trapFocusList.find((node) => node.contains(eventTarget));
  if (!parentNode) {
    return;
  }

  // 포커스 가능한 요소들을 찾습니다.
  const focusable = parentNode.querySelectorAll<HTMLElement>(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  // 다음 요소로 이동하려고 하고, 현재 포커스가 마지막 요소에 있다면 첫 번째 요소로 포커스를 이동합니다.
  if (isNext(event) && event.target === last) {
    event.preventDefault();
    first.focus();
  }
  // 이전 요소로 이동하려고 하고, 현재 포커스가 첫 번째 요소에 있다면 마지막 요소로 포커스를 이동합니다.
  else if (isPrevious(event) && event.target === first) {
    event.preventDefault();
    last.focus();
  }
};

// 포커스 이벤트 핸들러를 문서에 등록합니다.
document.addEventListener('keydown', trapFocusListener);

// 포커스를 갖는 HTML 요소를 목록에 추가하는 함수입니다.
export const trapFocus = (node: HTMLElement) => {
  trapFocusList.push(node);
  return {
    // HTML 요소를 목록에서 제거하는 함수입니다.
    destroy() {
      trapFocusList = trapFocusList.filter((element) => element !== node);
    },
  };
};

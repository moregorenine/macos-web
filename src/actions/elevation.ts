/** 이 코드는 각 UI 요소의 z-index 값을 설정하는 역할을 합니다.
 * z-index는 CSS의 스타킹 컨텍스트에서 요소의 쌓임 순서를 결정하는 속성입니다.
 * 이 코드에서는 zIndexConfig 객체를 통해 각 UI 요소의 z-index 값을 관리하고,
 * 이를 CSS 변수로 설정하여 사용합니다.
 * 이렇게 하면 CSS에서도 이 변수를 사용하여 z-index 값을 조절할 수 있습니다.
 * elevation 함수는 주어진 HTML 요소(node)의 z-index 값을 해당 UI 요소(uiElement)의 z-index 값으로 설정합니다.
 */

// z-index 설정을 위한 객체입니다.
const zIndexConfig = {
  wallpaper: -1,
  'bootup-screen': 110,
  'context-menu': 100,
  'window-traffic-lights': 10,
  dock: 80,
  'dock-tooltip': 70,
  'system-updates-available': 60,
  'system-dialog': 90,
  'menubar-menu-parent': 160,
};

// zIndexConfig 객체의 각 항목에 대해 CSS 변수를 설정합니다.
for (const [element, zIndexValue] of Object.entries(zIndexConfig)) {
  document.body.style.setProperty(`--system-z-index-${element}`, zIndexValue + '');
}

// 주어진 노드의 z-index를 설정하는 함수입니다.
export function elevation(node: HTMLElement, uiElement: keyof typeof zIndexConfig) {
  node.style.zIndex = `var(--system-z-index-${uiElement})`;
}

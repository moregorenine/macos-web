/** Svelte의 writable 스토어를 사용하여 테마의 상태를 관리합니다.
 * 테마의 상태는 색상 스키마(scheme)와 주 색상(primaryColor)으로 구성되어 있습니다.
 * 테마 스토어의 상태가 변경될 때마다 body 요소의 클래스와 CSS 변수를 업데이트하여,
 * 테마의 변경을 반영합니다. */

/**
 * 이 설정이 어플리케이션을 재방문하거나 페이지를 새로고침해도 유지되는 원리는 svelte-local-storage-store 라이브러리를 통해 로컬 스토리지에 사용자의 테마 설정을 저장하기 때문입니다. 로컬 스토리지는 웹 브라우저가 제공하는 저장소 중 하나로, 키-값 쌍을 이용해 데이터를 클라이언트 측에 영구적으로 저장할 수 있습니다. 이 저장소는 웹페이지의 세션이 종료되어도 데이터가 사라지지 않으며, 동일한 브라우저에서 어플리케이션을 재방문하거나 페이지를 새로고침해도 데이터가 유지됩니다.
코드에서 writable 함수의 첫 번째 인자로 'macos:theme-settings'라는 키를 사용하여 theme 스토어를 초기화함으로써, 이 키를 사용해 로컬 스토리지에 사용자의 테마 설정을 저장하고 있습니다. theme 스토어의 값이 변경될 때마다 (즉, 사용자가 테마 설정을 변경할 때마다) 이 변경사항은 자동으로 로컬 스토리지에 저장됩니다.
사용자가 어플리케이션을 재방문하거나 페이지를 새로고침할 때, writable 함수로 생성된 theme 스토어는 로컬 스토리지에서 'macos:theme-settings' 키에 해당하는 값을 읽어와서 초기 상태를 설정합니다. 만약 로컬 스토리지에 해당 키에 대한 값이 저장되어 있다면, 이 값(즉, 사용자가 이전에 설정한 테마 설정)을 사용하여 초기 상태를 설정합니다. 이를 통해 사용자가 이전 방문 때 설정한 테마 설정을 유지할 수 있게 됩니다.
따라서, 이 기능은 로컬 스토리지를 활용하여 사용자의 테마 설정을 브라우저에 영구적으로 저장하고, 어플리케이션의 초기 로딩 단계에서 이를 다시 불러와 적용함으로써 동작합니다.
 */

// svelte-local-storage-store 모듈에서 writable 함수를 가져옵니다.
import { writable } from 'svelte-local-storage-store';
// 🍎/configs/theme/colors.config 모듈에서 colors 객체를 가져옵니다.
import { colors } from '🍎/configs/theme/colors.config';

// 테마의 타입을 정의합니다.
export type Theme = {
  // 테마의 색상 스키마입니다. 'light' 또는 'dark' 중 하나입니다.
  scheme: 'light' | 'dark';
  // 테마의 주 색상입니다. colors 객체의 키 중 하나입니다.
  primaryColor: keyof typeof colors;
};

// 테마의 상태를 관리하는 writable 스토어를 생성합니다.
// 초기값은 사용자의 색상 스키마 설정과 'blue' 색상입니다.
export const theme = writable<Theme>('macos:theme-settings', {
  scheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  primaryColor: 'blue',
});

// 테마 스토어의 상태가 변경될 때마다 아래의 콜백 함수를 실행합니다.
theme.subscribe(({ scheme, primaryColor }) => {
  // Color scheme
  // 색상 스키마에 따라 body 요소의 클래스를 설정합니다.
  const { classList } = document.body;
  classList.remove('light', 'dark');
  classList.add(scheme);

  // Primary color
  // 주 색상에 따라 CSS 변수를 설정합니다.
  // 현재 테마의 색상 스키마와 주 색상에 해당하는 색상 객체를 가져옵니다.
  const colorObj = colors[primaryColor][scheme];
  // CSS 변수 '--system-color-primary'의 값을 현재 테마의 주 색상으로 설정합니다.
  document.body.style.setProperty('--system-color-primary', `hsl(${colorObj.hsl})`);
  // CSS 변수 '--system-color-primary-hsl'의 값을 현재 테마의 주 색상의 HSL 값으로 설정합니다.
  document.body.style.setProperty('--system-color-primary-hsl', `${colorObj.hsl}`);
  // CSS 변수 '--system-color-primary-contrast'의 값을 현재 테마의 주 색상의 대비 색상으로 설정합니다.
  document.body.style.setProperty(
    '--system-color-primary-contrast',
    `hsl(${colorObj.contrastHsl})`,
  );
  // CSS 변수 '--system-color-primary-contrast-hsl'의 값을 현재 테마의 주 색상의 대비 색상의 HSL 값으로 설정합니다.
  document.body.style.setProperty('--system-color-primary-contrast-hsl', `${colorObj.contrastHsl}`);
});

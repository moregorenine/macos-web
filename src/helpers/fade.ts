/**
 * 이 코드는 Svelte의 트랜지션을 사용하여 요소를 서서히 나타나게 하거나 사라지게 하는 함수를 정의합니다.
 * fadeIn 함수는 요소를 서서히 나타나게 하고,
 * fadeOut 함수는 요소를 서서히 사라지게 합니다.
 * 각 함수는 트랜지션의 설정을 반환하며, 이 설정은 Svelte의 트랜지션에서 사용됩니다.
 */

// svelte/easing 모듈에서 sineIn, sineOut 함수를 가져옵니다.
import { sineIn, sineOut } from 'svelte/easing';

// 요소를 서서히 나타나게 하는 트랜지션을 생성하는 함수입니다.
export function fadeIn(
  // 첫 번째 매개변수는 사용되지 않으므로 _로 표시했습니다.
  _: HTMLElement,
  // 두 번째 매개변수는 트랜지션의 설정을 담은 객체입니다. 기본값은 duration이 150, delay가 duration인 객체입니다.
  { duration = 150, delay = duration }: SvelteTransitionConfig = {},
): SvelteTransitionReturnType {
  // 트랜지션의 설정을 반환합니다.
  return {
    // 트랜지션의 지속 시간입니다. duration에 10을 더한 값입니다.
    duration: duration + 10,
    // 트랜지션의 지연 시간입니다.
    delay,
    // 트랜지션의 가속 함수입니다. sineIn 함수를 사용합니다.
    easing: sineIn,
    // 트랜지션의 CSS를 생성하는 함수입니다. opacity를 t로 설정합니다.
    css: (t) => `opacity: ${t}`,
  };
}

// 요소를 서서히 사라지게 하는 트랜지션을 생성하는 함수입니다.
export function fadeOut(
  // 첫 번째 매개변수는 사용되지 않으므로 _로 표시했습니다.
  _: HTMLElement,
  // 두 번째 매개변수는 트랜지션의 설정을 담은 객체입니다. 기본값은 duration이 150인 객체입니다.
  { duration = 150 }: SvelteTransitionConfig = {},
): SvelteTransitionReturnType {
  // 트랜지션의 설정을 반환합니다.
  return {
    // 트랜지션의 지속 시간입니다.
    duration,
    // 트랜지션의 가속 함수입니다. sineOut 함수를 사용합니다.
    easing: sineOut,
    // 트랜지션의 CSS를 생성하는 함수입니다. opacity를 t로 설정합니다.
    css: (t) => `opacity: ${t}`,
  };
}

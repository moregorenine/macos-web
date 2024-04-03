// Desktop 컴포넌트를 import 합니다. Desktop.svelte 파일에서 export된 컴포넌트를 가져옵니다.
import Desktop from './components/Desktop/Desktop.svelte';

// 전역 스타일시트를 import 합니다. 이 스타일시트는 전체 애플리케이션에 적용됩니다.
import './css/global.scss';

// Desktop 컴포넌트의 인스턴스를 생성합니다. 이 컴포넌트는 'root'라는 id를 가진 HTML 요소에 마운트됩니다.
const desktop = new Desktop({
  target: document.getElementById('root'),
});

// desktop 인스턴스를 export 합니다. 이를 통해 다른 모듈에서 이 인스턴스를 import하여 사용할 수 있습니다.
export default desktop;

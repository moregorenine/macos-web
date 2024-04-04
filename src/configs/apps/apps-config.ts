import { createAppConfig } from '🍎/helpers/create-app-config';

const wallpapers = createAppConfig({
  title: 'Wallpapers',
  imageSrc: '/macos-web/app-icons/wallpapers/256.webp',
  resizable: true,

  height: 600,
  width: 800,

  dockBreaksBefore: true,
});

const calculator = createAppConfig({
  title: 'Calculator',
  imageSrc: '/macos-web/app-icons/calculator/256.webp',
  expandable: true,
  resizable: false,

  height: 300 * 1.414,
  width: 300,
});

const calendar = createAppConfig({
  title: 'Calendar',
  imageSrc: '/macos-web/app-icons/calendar/256.webp',
  resizable: true,
});

const vscode = createAppConfig({
  title: 'VSCode',
  imageSrc: '/macos-web/app-icons/vscode/256.webp',
  resizable: true,

  height: 600,
  width: 800,
});

const finder = createAppConfig({
  title: 'Finder',
  imageSrc: '/macos-web/app-icons/finder/256.webp',
  resizable: true,

  // dockBreaksBefore: true,
  shouldOpenWindow: false,
});

const safari = createAppConfig({
  title: 'Safari',
  imageSrc: '/macos-web/app-icons/safari/256.webp',
  resizable: true,
});

const systemPreferences = createAppConfig({
  title: 'System Preferences',
  imageSrc: '/macos-web/app-icons/systemPreferences/256.webp',
  resizable: true,
});

const purusTwitter = createAppConfig({
  title: `About the Developer`,
  imageSrc: '/macos-web/app-icons/purus-twitter/256.webp',
  resizable: true,

  dockBreaksBefore: true,

  height: 600,
  width: 800,
});

const viewSource = createAppConfig({
  title: `View Source`,
  imageSrc: '/macos-web/app-icons/view-source/256.webp',
  resizable: true,

  shouldOpenWindow: false,
  externalAction: () => window.open('https://github.com/puruvj/macos-web', '_blank'),
});

const ukraine = createAppConfig({
  title: `Support Ukraine`,
  imageSrc: '/macos-web/app-icons/ukraine/256.webp',
  resizable: true,

  shouldOpenWindow: false,
  externalAction: () => window.open('https://www.stopputin.net/', '_blank'),

  dockBreaksBefore: true,
});

const vercel = createAppConfig({
  title: `Powered by Vercel`,
  imageSrc: '/macos-web/app-icons/vercel/256.webp',
  resizable: true,

  shouldOpenWindow: false,
  externalAction: () =>
    window.open('https://vercel.com/?utm_source=purus-projects&utm_campaign=oss', '_blank'),

  dockBreaksBefore: true,
});

const appstore = createAppConfig({
  title: 'App Store',
  imageSrc: '/macos-web/app-icons/appstore/256.webp',
  resizable: true,
});

export const appsConfig = {
  finder,
  wallpapers,
  calculator,
  calendar,
  vscode,
  appstore,
  // safari,

  // 'system-preferences': systemPreferences,

  'purus-twitter': purusTwitter,
  'view-source': viewSource,

  vercel,

  ukraine,
};

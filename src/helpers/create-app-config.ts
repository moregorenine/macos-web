export type AppConfig = {
  title: string;
  imageSrc: string;
  isFolder?: boolean;

  resizable?: boolean;
  expandable?: boolean;
  height?: string | number;
  width?: string | number;

  shouldOpenWindow?: boolean;

  /** The action to do when dock button is clicked */
  externalAction?: (e: unknown) => void;

  /** Break before this app */
  dockBreaksBefore?: boolean;
};

export const createAppConfig = (et: AppConfig) => ({
  isFolder: false,
  shouldOpenWindow: true,
  dockBreaksBefore: false,

  resizable: true,
  expandable: false,

  width: 600,
  height: 500,
  ...et,
});

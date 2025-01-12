export type BuildMode = 'development' | 'production';
export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  html500: string
  src: string;
  locales?: string;
  buildLocales: string;
  favicon?: string;
}
export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
}
export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

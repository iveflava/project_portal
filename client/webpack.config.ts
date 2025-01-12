import path from 'path';
import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'dist'),
    html500: path.resolve(__dirname, 'public', '50x.html'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    buildLocales: path.resolve(__dirname, 'dist', 'locales'),
    favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
  };
  const mode = env.mode || 'development';
  const PORT = env.port || 3001;

  const isDev = mode === 'development';
  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });
  return config;
};

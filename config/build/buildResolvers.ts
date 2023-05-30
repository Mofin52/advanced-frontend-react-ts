import webpack, { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: ['node_modules', options.paths.src],
    mainFiles: ['index'],
    alias: {},
  };
}

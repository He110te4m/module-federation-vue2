import { Rollup } from 'vite';

export const externalsSkipList = new Set(['tslib']);

export function filterExternals(deps: string[]): string[] {
  return deps.filter((d) => !externalsSkipList.has(d));
}

export type ExternalOption = Required<Rollup.InputOptions>['external']

export function mergeExternal(originExternal: ExternalOption, externals: string[]): ExternalOption {
  if (typeof originExternal === 'string' || originExternal instanceof RegExp || Array.isArray(originExternal)) {
    return Array.from(new Set((externals as (string | RegExp)[]).concat(originExternal)));
  }

  return (source, importer, isResolved) => {
    return externals.includes(source) || originExternal(source, importer, isResolved);
  };
}

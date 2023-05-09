import { Connect, Plugin, ViteDevServer, normalizePath } from 'vite'
import { type BuildHelperParams, federationBuilder } from '@softarc/native-federation/build'
import { filterExternals, mergeExternal } from './externalStore';
import { existsSync, lstatSync, readFileSync } from 'fs'
import { join } from 'path'
import mime from 'mime-types'

export function moduleFederationPlugin (params: BuildHelperParams): Plugin {
  return {
    name: 'my-vite-module-federation',
    async options(opts) {
      await federationBuilder.init(params);
      const external = opts.external ?? [];
      opts.external = mergeExternal(
        external,
        filterExternals(federationBuilder.externals),
      );

      console.log('external: ', opts.external)
    },
    async closeBundle() {
      await federationBuilder.build();
    },
    transformIndexHtml(html: string) {
      return html.replace(/type="module"/g, 'type="module-shim"');
    },
    configureServer(server) {
      configureDevServer(server, params)
    },
  }
}

async function configureDevServer(server: ViteDevServer, params: BuildHelperParams) {
  await federationBuilder.build({
    skipExposed: true,
    skipMappings: true,
  })

  const op = params.options
  const dist = join(op.workspaceRoot, op.outputPath)
  server.middlewares.use(federationMiddlewares(dist))
}

function federationMiddlewares(dist: string): Connect.NextHandleFunction {
  return (req, res, next) => {
    if (!req.url || req.url.endsWith('.html')) {
      next()
      return
    }

    const file = join(dist, req.url)
    if (!existsSync(file) || !lstatSync(file).isFile()) {
      next()
      return
    }

    const content = readFileSync(file, 'utf-8')
    const modified = enhanceFile(file, content)

    res.setHeader('Access-Control-Allow-Origin', '*');
    const mimeType = mime.lookup(req.url)
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }

    res.write(modified)
    res.end()
  }
}

function enhanceFile(file: string, content: string) {
  if (!file.endsWith('remoteEntry.json')) {
    return content
  }

  let remoteEntry: Record<string, any> = {}
  try {
    const data = JSON.parse(content)
    // globalThis.console.log('解析后的 json 数据为： ', data)
    remoteEntry = {
      ...data,
      shared: (data.shared ?? []).map((el: Record<keyof any, any>) => ({
        ...el,
        outFileName: el.dev?.entryPoint.includes('/node_modules/')
          ? el.outFileName
          : normalizePath(join('@fs', el.dev?.entryPoint || ''))
      })),
      exposes: (data.exposes ?? []).map((el: Record<keyof any, any>) => ({
        ...el,
        outFileName: normalizePath(join('@fs', el.dev?.entryPoint || ''))
      }))
    }
    // globalThis.console.log('最终 remote json 为： ', data);
  } catch (error) {
  }

  return JSON.stringify(remoteEntry, null, 2)
}

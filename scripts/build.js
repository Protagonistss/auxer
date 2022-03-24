const { readdirSync } = require('fs')
const { resolve } = require('path')
const { build } = require('esbuild')

const packages = readdirSync(resolve(__dirname, '../packages')).filter(
  pck =>
    require(resolve(__dirname, `../packages/${pck}/package.json`)).buildOptions
      .ready
)

const buildPck = pck => {
  build({
    entryPoints: [resolve(__dirname, `../packages/${pck}/src/index.ts`)],
    bundle: true,
    format: 'esm',
    minify: false,
    outfile: resolve(__dirname, `../packages/${pck}/dist/${pck}.js`),
    tsconfig: resolve(__dirname, '../tsconfig.json')
  })
    .then(() => {
      console.log(`${pck} build ok`)
    })
    .catch(() => {
      console.error(`${pck} build failed`)
      process.exit(1)
    })
}

packages.forEach(pck => {
  buildPck(pck)
})

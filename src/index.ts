import express from 'express'
import { cac } from 'cac'
import chalk from 'chalk'
import * as path from 'path'
const { version } = require('../package.json')

const cli = cac('sar')

cli
  .command('[dir]', 'Start static local server.')
  .option('--port <port>', 'port')
  .option('-s, --spa', 'spa flag')
  .action((dir: string = '.', options: any) => {
    console.log(chalk`{cyan sar-cli ${version}}`)
    const app = express()
    const host = 'localhost'
    const port = options.port || 80
    const url = `http://${host}:${port}`
    const spaEntry = 'index.html'

    app.use(express.static(dir))
    if (options.spa) {
      app.get('*', (_request, response) => {
        response.sendFile(path.resolve(dir, spaEntry))
      })
    }

    app.listen(port, () => {
      console.log(chalk`🚀  Server is currently online on ${url}`)

      if (options.spa) {
        console.log(
          chalk`{cyan ✅  SPA mode enabled. All paths write to ${spaEntry} }`
        )
      }
    })
  })

cli.help()
cli.version(version)
cli.parse()

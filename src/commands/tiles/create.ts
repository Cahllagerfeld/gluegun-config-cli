import { GluegunToolbox } from 'gluegun'
import * as Enquirer from 'enquirer'
import { Listr } from 'listr2'
import * as fs from 'fs'

const enquirer = new Enquirer()

export default {
  name: 'create',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const tasks = new Listr(
      [
        {
          title: 'Get current Config',
          task: async (ctx, task) => {
            ctx.currentConfig = await fs.promises.readFile('config.json')
          }
        },
        {
          title: 'Get Object Name',
          task: async (ctx, task) => {
            console.log(ctx.currentConfig)
            ctx.input = await task.prompt({
              type: 'Input',
              message: 'Whats the name of the object?'
            })
          }
        }
      ],
      { concurrent: false, injectWrapper: { enquirer } }
    )
    await tasks.run()
  }
}

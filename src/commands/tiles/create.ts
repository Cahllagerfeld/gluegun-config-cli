import { GluegunToolbox } from 'gluegun'
import * as Enquirer from 'enquirer'
import { Listr } from 'listr2'
import { v4 as uuidv4 } from 'uuid';
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
            const parsedString = await fs.promises.readFile(
              'config.json',
              'utf8'
            )
            ctx.currentConfig = JSON.parse(parsedString)
          }
        },
        {
          title: 'Get Object Name',
          task: async (ctx, task) => {
            ctx.input = await task.prompt({
              type: 'Input',
              message: 'Whats the name of the object?'
            })
          }
        },
        {
          title: 'Create new Tile',
          task: async (ctx, task) => {
            ctx.currentConfig.tiles = [
              ...ctx.currentConfig.tiles,
              ...[{ id: uuidv4(), name: ctx.input }]
            ]
            await fs.promises.writeFile(
              'config.json',
              JSON.stringify(ctx.currentConfig)
            )
          }
        }
      ],
      { concurrent: false, injectWrapper: { enquirer } }
    )
    await tasks.run()
  }
}

import { GluegunToolbox } from 'gluegun'
import { Listr } from 'listr2'

export default {
  name: 'init',
  alias: ['i'],
  run: async (toolBox: GluegunToolbox) => {
    const {
      template: { generate }
    } = toolBox

    const tasks = new Listr(
      [
        {
          title: 'Initialize Project',
          task: async (ctx, task): Promise<void> => {
            await generate({
              template: 'config.json.ejs',
              target: 'config.json'
            })
          }
        }
      ],
      { concurrent: false }
    )

    await tasks.run()
  }
}

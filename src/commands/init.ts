import { GluegunToolbox } from 'gluegun'

export default {
  name: 'init',
  alias: ['i'],
  run: async (toolBox: GluegunToolbox) => {
    const {
      template: { generate }
    } = toolBox

    await generate({ template: 'config.json.ejs', target: 'config.json' })
  }
}

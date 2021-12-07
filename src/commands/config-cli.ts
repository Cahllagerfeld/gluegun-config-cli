import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'config-cli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Generate a Config File')
  }
}

module.exports = command

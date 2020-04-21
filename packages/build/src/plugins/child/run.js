// Run a specific plugin event handler
const run = async function({ event, error }, { pluginCommands, api, utils, constants, inputs, netlifyConfig }) {
  const { method } = pluginCommands.find(pluginCommand => pluginCommand.event === event)
  const runOptions = { api, utils, constants, inputs, netlifyConfig, error }
  addBackwardCompatibility(runOptions)
  await method(runOptions)
  return {}
}

// Add older names, kept for backward compatibility. Non-enumerable.
// TODO: remove after being out of beta
const addBackwardCompatibility = function(runOptions) {
  Object.defineProperties(runOptions, {
    pluginConfig: { value: runOptions.inputs },
  })
  // Make `constants.BUILD_DIR` non-enumerable
  Object.defineProperty(runOptions.constants, 'BUILD_DIR', {
    value: runOptions.constants.BUILD_DIR,
  })
}

module.exports = { run }
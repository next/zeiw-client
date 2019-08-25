const child_process = require('child_process')
const webpack = require('webpack')

const commitHash = child_process.execSync('git rev-parse HEAD').toString().trim()

export default (config) => {
  config.plugins.push(new webpack.DefinePlugin({
    '_zeiwBuild.commitHash': JSON.stringify(commitHash),
  }))
}

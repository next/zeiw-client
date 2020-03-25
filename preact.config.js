import child_process from 'child_process'
import webpack from 'webpack'

const commitHash = child_process.execSync('git rev-parse HEAD').toString().trim()

export default ({ plugins }) => {
  plugins.push(
    new webpack.DefinePlugin({
      '_zeiwBuild.commitHash': JSON.stringify(commitHash),
    })
  )
}

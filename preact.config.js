import childProcess from "child_process"
import webpack from "webpack"

const commitHash = childProcess.execSync("git rev-parse HEAD").toString().trim()

export default ({ plugins }) => {
	plugins.push(
		new webpack.DefinePlugin({
			"_zeiwBuild.commitHash": JSON.stringify(commitHash),
		}),
	)
}

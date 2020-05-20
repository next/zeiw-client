import childProcess from "child_process"
import webpack from "webpack"

export default ({ plugins }) => {
	plugins.push(
		new webpack.DefinePlugin({
			"process.env.VERSION": JSON.stringify(
				childProcess.execSync("git rev-parse HEAD").toString().trim(),
			),
		}),
	)
}

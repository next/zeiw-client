const Game = () => (
  <div className="dtc tc v-mid hidden" id="game">
    <div className="f4" id="stopwatch" />
    <div className="hidden items-center ma4">
      <canvas className="br3 ba bw3 ma2 shadow-4" id="canvas" />
    </div>
    <div id="countdown" />
  </div>
)

export default Game

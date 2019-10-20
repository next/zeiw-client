const Game = () => (
  <div className="dtc tc v-mid hidden" id="game">
    <div className="f4 ttu tracked">
      <span id="you" className="fw9" style={{ color: '#ff9900' }}></span> vs{' '}
      <span id="opponent" className="fw9"></span> | <span id="stopwatch" className="fw9"></span>{' '}
      seconds
    </div>
    <div className="hidden items-center mt3">
      <canvas className="br3 ba bw3 ma2 shadow-4" id="canvas" />
    </div>
    <div id="countdown" />
  </div>
)

export default Game

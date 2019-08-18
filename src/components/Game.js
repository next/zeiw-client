const Game = () => (
  <div className="dtc tc v-mid hidden" id="game">
    <div className="f4">
      Time Played: <span id="stopwatch">N/A</span> Seconds
    </div>
    <div className="hidden items-center ma4">
      <canvas className="br3 ba bw3 ma2 mb2 shadow-4" id="canvas" />
    </div>
    <div id="countdown" />
    <style jsx>{`
      canvas {
        width: 45%;
        position: relative;
        border-color: var(--gray);
      }
      canvas:before {
        padding-top: 100%;
      }
      #countdown {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16em;
      }
    `}</style>
  </div>
)

export default Game

const Game = () => (
  <div className="dtc tc v-mid hidden" id="game">
    <div className="f4" id="stopwatch" />
    <div className="hidden items-center ma4">
      <canvas className="br3 ba bw3 ma2 shadow-4" id="canvas" />
    </div>
    <div id="countdown" />
    <style>{`
      canvas {
        border-color: var(--gray);
        position: relative;
        width: 45%;
      }
      canvas:before {
        padding-top: 100%;
      }
      #countdown {
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        bottom: 0;
        display: flex;
        font-size: 16em;
        justify-content: center;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      }
    `}</style>
  </div>
)

export default Game

const Alert = () => (
  <div>
    <div id="notification" />

    <style jsx>{`
      #notification {
        left: calc(100% + 6px);
        padding: 15px 20px 15px 15px;
        position: fixed;
        top: 5%;
        background: var(--white);
        color: var(--black);
        border-left: 4px solid var(--success);
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
        transition: 1s left ease-in-out;
        cursor: pointer;
        z-index: 5;
      }
      #notification h3 {
        font-size: 15px;
        margin: 0;
      }
      #notification p {
        width: 200px;
        font-size: 12px;
        margin: 5px 0;
        word-wrap: break-word;
      }
    `}</style>
  </div>
)

export default Alert

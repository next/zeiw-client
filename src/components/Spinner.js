const Spinner = () => (
  <div>
    <style>
      {`
        .spinner {
          height: 40px;
          margin: 100px auto;
          position: relative;
          width: 40px;
        }
        .cube1, .cube2 {
          animation: sk-cubemove 1.8s infinite ease-in-out;
          background-color: var(--primary);
          height: 15px;
          left: 0;
          position: absolute;
          top: 0;
          width: 15px;
        }
        .cube2 {
          animation-delay: -0.9s;
        }
        @keyframes sk-cubemove {
          25% {
            transform: translateX(42px) rotate(-90deg) scale(0.5);
          }
          50% {
            transform: translateX(42px) translateY(42px) rotate(-179deg);
          }
          50.1% {
            transform: translateX(42px) translateY(42px) rotate(-180deg);
          }
          75% {
            transform: translateX(0px) translateY(42px) rotate(-270deg)
              scale(0.5);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}
    </style>
  </div>
)

export default Spinner

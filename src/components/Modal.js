const Modal = () => (
  <div>
    <style jsx>
      {`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background-color: var(--white);
          padding: 30px;
          max-width: 500px;
          max-height: 100vh;
          border-radius: 4px;
          overflow-y: auto;
          box-sizing: border-box;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          margin-top: 0;
          margin-bottom: 0;
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 1.25;
          color: var(--secondary);
          box-sizing: border-box;
        }
        .close {
          background: transparent;
          border: 0;
        }
        .header .close:before {
          content: '✕';
          color: var(--black);
        }
        .content {
          margin-top: 2rem;
          margin-bottom: 2rem;
          line-height: 1.5;
          color: var(--black);
        }
        .btn {
          font-size: 0.875rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          background-color: var(--gray);
          color: var(--black);
          border-radius: 0.25rem;
          border-style: none;
          border-width: 0;
          cursor: pointer;
          -webkit-appearance: button;
          text-transform: none;
          overflow: visible;
          line-height: 1.15;
          margin: 0;
          will-change: transform;
          -moz-osx-font-smoothing: grayscale;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          transition: -webkit-transform 0.25s ease-out;
          transition: transform 0.25s ease-out;
          transition: transform 0.25s ease-out, -webkit-transform 0.25s ease-out;
        }
        .btn-primary {
          background-color: var(--secondary);
          color: var(--white);
        }
        .btn-danger {
          background-color: var(--danger);
          color: var(--white);
        }
        @keyframes mmfadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes mmfadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes mmslideIn {
          from {
            transform: translateY(15%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes mmslideOut {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10%);
          }
        }
        .slide {
          display: none;
        }
        .slide.is-open {
          display: block;
        }
        .slide[aria-hidden='false'] .overlay {
          animation: mmfadeIn 0.3s cubic-bezier(0, 0, 0.2, 1);
        }
        .slide[aria-hidden='false'] .container {
          animation: mmslideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
        }
        .slide[aria-hidden='true'] .overlay {
          animation: mmfadeOut 0.3s cubic-bezier(0, 0, 0.2, 1);
        }
        .slide[aria-hidden='true'] .container {
          animation: mmslideOut 0.3s cubic-bezier(0, 0, 0.2, 1);
        }
        .slide .container,
        .slide .overlay {
          will-change: transform;
        }
        .btn-primary,
        .btn-danger {
          float: left !important;
        }
        .btn {
          float: right;
        }
        .mr2 {
          margin-right: 0.5rem !important;
        }
        .switch-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5em;
        }
        .switch-wrapper p {
          font-size: 1rem;
        }
        .switch {
          margin-left: 3rem;
          display: inline-block;
          height: 34px;
          position: relative;
          width: 60px;
        }
        .switch input {
          display: none;
        }
        .slider {
          background-color: var(--gray);
          bottom: 0;
          cursor: pointer;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transition: 0.4s;
        }
        .slider:before {
          background-color: var(--white);
          bottom: 4px;
          content: '';
          height: 26px;
          left: 4px;
          position: absolute;
          transition: 0.4s;
          width: 26px;
        }
        input:checked + .slider {
          background-color: var(--secondary);
        }
        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
        .badge {
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
          width: 32px;
          height: 32px;
        }
        #dev {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,h_32/v1564826121/icon/developer.svg');
        }
        #mod {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,h_32/v1564826121/icon/moderator.svg');
        }
        #tp {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,h_32/v1564826121/icon/testpilot.svg');
        }
        #pr,
        #prc {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,h_32/v1564826121/icon/phoenix-riders.svg');
        }
        #wd,
        #wdc {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,h_32/v1564826121/icon/winter-dragons.svg');
        }
        #db,
        #dbc {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,h_32/v1564826121/icon/demon-brigade.svg');
        }
        #prc,
        #wdc,
        #dbc {
          width: 48px;
          height: 48px;
        }
      `}
    </style>
  </div>
)

export default Modal

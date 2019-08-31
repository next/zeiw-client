const Modal = () => (
  <div>
    <style>
      {`
        .overlay {
          align-items: center;
          background: rgba(0, 0, 0, 0.6);
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
        }
        .container {
          background-color: var(--white);
          border-radius: 4px;
          box-sizing: border-box;
          max-height: 100vh;
          max-width: 500px;
          overflow-y: auto;
          padding: 30px;
        }
        .header {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
        .title {
          box-sizing: border-box;
          color: var(--secondary);
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.25;
          margin-bottom: 0;
          margin-top: 0;
        }
        .close {
          background: transparent;
          border: 0;
        }
        .header .close:before {
          color: var(--black);
          content: '✕';
        }
        .content {
          color: var(--black);
          line-height: 1.5;
          margin-bottom: 2rem;
          margin-top: 2rem;
        }
        .btn {
          backface-visibility: hidden;
          background-color: var(--gray);
          border-radius: 0.25rem;
          border-style: none;
          border-width: 0;
          color: var(--black);
          font-size: 0.875rem;
          line-height: 1.15;
          margin: 0;
          overflow: visible;
          padding-bottom: 0.5rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0.5rem;
          text-transform: none;
          transform: translateZ(0);
          transition: transform 0.25s ease-out;
          will-change: transform;
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
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 0.5em;
        }
        .switch-wrapper p {
          font-size: 1rem;
        }
        .switch {
          display: inline-block;
          height: 34px;
          margin-left: 3rem;
          position: relative;
          width: 60px;
        }
        .switch input {
          display: none;
        }
        .slider {
          background-color: var(--gray);
          bottom: 0;
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
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
        .badge {
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          height: 32px;
          width: 32px;
        }
        #dev {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,q_auto,h_32/v1567190586/icon/dev.svg');
        }
        #mod {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,q_auto,h_32/v1564826121/icon/moderator.svg');
        }
        #tp {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,q_auto,h_32/v1564826121/icon/testpilot.svg');
        }
        #pr, #prc {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,q_auto,h_32/v1564826121/icon/phoenix-riders.svg');
        }
        #wd, #wdc {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,q_auto,h_32/v1564826121/icon/winter-dragons.svg');
        }
        #db, #dbc {
          background-image: url('https://res.cloudinary.com/zeiw/image/upload/c_scale,q_auto,h_32/v1564826121/icon/demon-brigade.svg');
        }
        #prc, #wdc, #dbc {
          height: 48px;
          width: 48px;
        }
      `}
    </style>
  </div>
)

export default Modal

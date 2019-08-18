const Tooltip = () => (
  <div>
    <style jsx>
      {`
        .tippy-iOS {
          cursor: pointer !important;
          -webkit-tap-highlight-color: transparent;
        }
        .tippy-popper {
          transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
          max-width: calc(100% - 8px);
          pointer-events: none;
          outline: 0;
        }
        .tippy-popper[x-placement^='top'] .tippy-backdrop {
          border-radius: 40% 40% 0 0;
        }
        .tippy-popper[x-placement^='top'] .tippy-roundarrow {
          bottom: -7px;
          bottom: -6.5px;
          -webkit-transform-origin: 50% 0;
          transform-origin: 50% 0;
          margin: 0 3px;
        }
        .tippy-popper[x-placement^='top'] .tippy-roundarrow svg {
          position: absolute;
          left: 0;
          -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
        }
        .tippy-popper[x-placement^='top'] .tippy-arrow {
          border-top: 8px solid #333;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          bottom: -7px;
          margin: 0 3px;
          -webkit-transform-origin: 50% 0;
          transform-origin: 50% 0;
        }
        .tippy-popper[x-placement^='top'] .tippy-backdrop {
          -webkit-transform-origin: 0 25%;
          transform-origin: 0 25%;
        }
        .tippy-popper[x-placement^='top']
          .tippy-backdrop[data-state='visible'] {
          -webkit-transform: scale(1) translate(-50%, -55%);
          transform: scale(1) translate(-50%, -55%);
        }
        .tippy-popper[x-placement^='top'] .tippy-backdrop[data-state='hidden'] {
          -webkit-transform: scale(0.2) translate(-50%, -45%);
          transform: scale(0.2) translate(-50%, -45%);
          opacity: 0;
        }
        .tippy-popper[x-placement^='top']
          [data-animation='shift-toward'][data-state='visible'] {
          -webkit-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='shift-toward'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(-20px);
          transform: translateY(-20px);
        }
        .tippy-popper[x-placement^='top'] [data-animation='perspective'] {
          -webkit-transform-origin: bottom;
          transform-origin: bottom;
        }
        .tippy-popper[x-placement^='top']
          [data-animation='perspective'][data-state='visible'] {
          -webkit-transform: perspective(700px) translateY(-10px) rotateX(0);
          transform: perspective(700px) translateY(-10px) rotateX(0);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='perspective'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: perspective(700px) translateY(0) rotateX(60deg);
          transform: perspective(700px) translateY(0) rotateX(60deg);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='fade'][data-state='visible'] {
          -webkit-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='fade'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='shift-away'][data-state='visible'] {
          -webkit-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='shift-away'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
        .tippy-popper[x-placement^='top'] [data-animation='scale'] {
          -webkit-transform-origin: bottom;
          transform-origin: bottom;
        }
        .tippy-popper[x-placement^='top']
          [data-animation='scale'][data-state='visible'] {
          -webkit-transform: translateY(-10px) scale(1);
          transform: translateY(-10px) scale(1);
        }
        .tippy-popper[x-placement^='top']
          [data-animation='scale'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(-10px) scale(0.5);
          transform: translateY(-10px) scale(0.5);
        }
        .tippy-popper[x-placement^='bottom'] .tippy-backdrop {
          border-radius: 0 0 30% 30%;
        }
        .tippy-popper[x-placement^='bottom'] .tippy-roundarrow {
          top: -7px;
          -webkit-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
          margin: 0 3px;
        }
        .tippy-popper[x-placement^='bottom'] .tippy-roundarrow svg {
          position: absolute;
          left: 0;
          -webkit-transform: rotate(0);
          transform: rotate(0);
        }
        .tippy-popper[x-placement^='bottom'] .tippy-arrow {
          border-bottom: 8px solid #333;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          top: -7px;
          margin: 0 3px;
          -webkit-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
        }
        .tippy-popper[x-placement^='bottom'] .tippy-backdrop {
          -webkit-transform-origin: 0 -50%;
          transform-origin: 0 -50%;
        }
        .tippy-popper[x-placement^='bottom']
          .tippy-backdrop[data-state='visible'] {
          -webkit-transform: scale(1) translate(-50%, -45%);
          transform: scale(1) translate(-50%, -45%);
        }
        .tippy-popper[x-placement^='bottom']
          .tippy-backdrop[data-state='hidden'] {
          -webkit-transform: scale(0.2) translate(-50%);
          transform: scale(0.2) translate(-50%);
          opacity: 0;
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='shift-toward'][data-state='visible'] {
          -webkit-transform: translateY(10px);
          transform: translateY(10px);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='shift-toward'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(20px);
          transform: translateY(20px);
        }
        .tippy-popper[x-placement^='bottom'] [data-animation='perspective'] {
          -webkit-transform-origin: top;
          transform-origin: top;
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='perspective'][data-state='visible'] {
          -webkit-transform: perspective(700px) translateY(10px) rotateX(0);
          transform: perspective(700px) translateY(10px) rotateX(0);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='perspective'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: perspective(700px) translateY(0) rotateX(-60deg);
          transform: perspective(700px) translateY(0) rotateX(-60deg);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='fade'][data-state='visible'] {
          -webkit-transform: translateY(10px);
          transform: translateY(10px);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='fade'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(10px);
          transform: translateY(10px);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='shift-away'][data-state='visible'] {
          -webkit-transform: translateY(10px);
          transform: translateY(10px);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='shift-away'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
        .tippy-popper[x-placement^='bottom'] [data-animation='scale'] {
          -webkit-transform-origin: top;
          transform-origin: top;
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='scale'][data-state='visible'] {
          -webkit-transform: translateY(10px) scale(1);
          transform: translateY(10px) scale(1);
        }
        .tippy-popper[x-placement^='bottom']
          [data-animation='scale'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateY(10px) scale(0.5);
          transform: translateY(10px) scale(0.5);
        }
        .tippy-popper[x-placement^='left'] .tippy-backdrop {
          border-radius: 50% 0 0 50%;
        }
        .tippy-popper[x-placement^='left'] .tippy-roundarrow {
          right: -12px;
          -webkit-transform-origin: 33.33333333% 50%;
          transform-origin: 33.33333333% 50%;
          margin: 3px 0;
        }
        .tippy-popper[x-placement^='left'] .tippy-roundarrow svg {
          position: absolute;
          left: 0;
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
        }
        .tippy-popper[x-placement^='left'] .tippy-arrow {
          border-left: 8px solid #333;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          right: -7px;
          margin: 3px 0;
          -webkit-transform-origin: 0 50%;
          transform-origin: 0 50%;
        }
        .tippy-popper[x-placement^='left'] .tippy-backdrop {
          -webkit-transform-origin: 50% 0;
          transform-origin: 50% 0;
        }
        .tippy-popper[x-placement^='left']
          .tippy-backdrop[data-state='visible'] {
          -webkit-transform: scale(1) translate(-50%, -50%);
          transform: scale(1) translate(-50%, -50%);
        }
        .tippy-popper[x-placement^='left']
          .tippy-backdrop[data-state='hidden'] {
          -webkit-transform: scale(0.2) translate(-75%, -50%);
          transform: scale(0.2) translate(-75%, -50%);
          opacity: 0;
        }
        .tippy-popper[x-placement^='left']
          [data-animation='shift-toward'][data-state='visible'] {
          -webkit-transform: translateX(-10px);
          transform: translateX(-10px);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='shift-toward'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(-20px);
          transform: translateX(-20px);
        }
        .tippy-popper[x-placement^='left'] [data-animation='perspective'] {
          -webkit-transform-origin: right;
          transform-origin: right;
        }
        .tippy-popper[x-placement^='left']
          [data-animation='perspective'][data-state='visible'] {
          -webkit-transform: perspective(700px) translateX(-10px) rotateY(0);
          transform: perspective(700px) translateX(-10px) rotateY(0);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='perspective'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: perspective(700px) translateX(0) rotateY(-60deg);
          transform: perspective(700px) translateX(0) rotateY(-60deg);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='fade'][data-state='visible'] {
          -webkit-transform: translateX(-10px);
          transform: translateX(-10px);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='fade'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(-10px);
          transform: translateX(-10px);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='shift-away'][data-state='visible'] {
          -webkit-transform: translateX(-10px);
          transform: translateX(-10px);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='shift-away'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
        }
        .tippy-popper[x-placement^='left'] [data-animation='scale'] {
          -webkit-transform-origin: right;
          transform-origin: right;
        }
        .tippy-popper[x-placement^='left']
          [data-animation='scale'][data-state='visible'] {
          -webkit-transform: translateX(-10px) scale(1);
          transform: translateX(-10px) scale(1);
        }
        .tippy-popper[x-placement^='left']
          [data-animation='scale'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(-10px) scale(0.5);
          transform: translateX(-10px) scale(0.5);
        }
        .tippy-popper[x-placement^='right'] .tippy-backdrop {
          border-radius: 0 50% 50% 0;
        }
        .tippy-popper[x-placement^='right'] .tippy-roundarrow {
          left: -12px;
          -webkit-transform-origin: 66.66666666% 50%;
          transform-origin: 66.66666666% 50%;
          margin: 3px 0;
        }
        .tippy-popper[x-placement^='right'] .tippy-roundarrow svg {
          position: absolute;
          left: 0;
          -webkit-transform: rotate(-90deg);
          transform: rotate(-90deg);
        }
        .tippy-popper[x-placement^='right'] .tippy-arrow {
          border-right: 8px solid #333;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          left: -7px;
          margin: 3px 0;
          -webkit-transform-origin: 100% 50%;
          transform-origin: 100% 50%;
        }
        .tippy-popper[x-placement^='right'] .tippy-backdrop {
          -webkit-transform-origin: -50% 0;
          transform-origin: -50% 0;
        }
        .tippy-popper[x-placement^='right']
          .tippy-backdrop[data-state='visible'] {
          -webkit-transform: scale(1) translate(-50%, -50%);
          transform: scale(1) translate(-50%, -50%);
        }
        .tippy-popper[x-placement^='right']
          .tippy-backdrop[data-state='hidden'] {
          -webkit-transform: scale(0.2) translate(-25%, -50%);
          transform: scale(0.2) translate(-25%, -50%);
          opacity: 0;
        }
        .tippy-popper[x-placement^='right']
          [data-animation='shift-toward'][data-state='visible'] {
          -webkit-transform: translateX(10px);
          transform: translateX(10px);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='shift-toward'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(20px);
          transform: translateX(20px);
        }
        .tippy-popper[x-placement^='right'] [data-animation='perspective'] {
          -webkit-transform-origin: left;
          transform-origin: left;
        }
        .tippy-popper[x-placement^='right']
          [data-animation='perspective'][data-state='visible'] {
          -webkit-transform: perspective(700px) translateX(10px) rotateY(0);
          transform: perspective(700px) translateX(10px) rotateY(0);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='perspective'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: perspective(700px) translateX(0) rotateY(60deg);
          transform: perspective(700px) translateX(0) rotateY(60deg);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='fade'][data-state='visible'] {
          -webkit-transform: translateX(10px);
          transform: translateX(10px);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='fade'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(10px);
          transform: translateX(10px);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='shift-away'][data-state='visible'] {
          -webkit-transform: translateX(10px);
          transform: translateX(10px);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='shift-away'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(0);
          transform: translateX(0);
        }
        .tippy-popper[x-placement^='right'] [data-animation='scale'] {
          -webkit-transform-origin: left;
          transform-origin: left;
        }
        .tippy-popper[x-placement^='right']
          [data-animation='scale'][data-state='visible'] {
          -webkit-transform: translateX(10px) scale(1);
          transform: translateX(10px) scale(1);
        }
        .tippy-popper[x-placement^='right']
          [data-animation='scale'][data-state='hidden'] {
          opacity: 0;
          -webkit-transform: translateX(10px) scale(0.5);
          transform: translateX(10px) scale(0.5);
        }
        .tippy-tooltip {
          position: relative;
          color: #fff;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          padding: 0.3125rem 0.5625rem;
          line-height: 1.4;
          text-align: center;
          background-color: #333;
        }
        .tippy-tooltip[data-size='small'] {
          padding: 0.1875rem 0.375rem;
          font-size: 0.75rem;
        }
        .tippy-tooltip[data-size='large'] {
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
        }
        .tippy-tooltip[data-animatefill] {
          overflow: hidden;
          background-color: transparent;
        }
        .tippy-tooltip[data-interactive],
        .tippy-tooltip[data-interactive] .tippy-roundarrow path {
          pointer-events: auto;
        }
        .tippy-tooltip[data-inertia][data-state='visible'] {
          transition-timing-function: cubic-bezier(0.54, 1.5, 0.38, 1.11);
        }
        .tippy-tooltip[data-inertia][data-state='hidden'] {
          transition-timing-function: ease;
        }
        .tippy-arrow,
        .tippy-roundarrow {
          position: absolute;
          width: 0;
          height: 0;
        }
        .tippy-roundarrow {
          width: 18px;
          height: 7px;
          fill: #333;
          pointer-events: none;
        }
        .tippy-backdrop {
          position: absolute;
          background-color: #333;
          border-radius: 50%;
          width: calc(110% + 2rem);
          left: 50%;
          top: 50%;
          z-index: -1;
          transition: all cubic-bezier(0.46, 0.1, 0.52, 0.98);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .tippy-backdrop:after {
          content: '';
          float: left;
          padding-top: 100%;
        }
        .tippy-backdrop + .tippy-content {
          transition-property: opacity;
          will-change: opacity;
        }
        .tippy-backdrop + .tippy-content[data-state='visible'] {
          opacity: 1;
        }
        .tippy-backdrop + .tippy-content[data-state='hidden'] {
          opacity: 0;
        }
      `}
    </style>
  </div>
)

export default Tooltip

import withStyles from '../util/jss'

const MinimizeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <rect fill="#fff" width="10" height="1" x="1" y="6"></rect>
  </svg>
)

const MaximimizeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="#fff"></rect>
  </svg>
)

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <polygon
      fill="#ffffff"
      fill-rule="evenodd"
      points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
    ></polygon>
  </svg>
)

export default withStyles(
  {
    root: {
      display: 'grid',
      height: '20px',
      position: 'fixed',
      width: 'calc(100% - 4px)',
      gridTemplateColumns: '1fr repeat(3, 25px)',
      marginLeft: '4px'
    },
    draggable: {
      marginTop: '4px',
      height: 'calc(100% - 4px)',
      WebkitAppRegion: 'drag'
    },
    frameIcon: {
      width: '100%',
      display: 'grid',
      '& > svg': {
        margin: 'auto'
      },
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.05)'
      }
    },
    dangerIcon: {
      width: '100%',
      display: 'grid',
      '& > svg': {
        margin: 'auto'
      },
      '&:hover': {
        background: '#f04747'
      }
    }
  },
  ({ classes }) => (
    <div class={classes.root}>
      <div class={classes.draggable} />
      <div class={classes.frameIcon} onClick={_zeiwNative.frame.minimize}>
        <MinimizeIcon />
      </div>
      <div class={classes.frameIcon} onClick={_zeiwNative.frame.maximize}>
        <MaximimizeIcon />
      </div>
      <div class={classes.dangerIcon} onClick={_zeiwNative.frame.close}>
        <CloseIcon />
      </div>
    </div>
  )
)

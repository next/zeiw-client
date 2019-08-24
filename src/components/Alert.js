import withStyles from '../util/jss'

export default withStyles(
  {
    root: {
      borderBottomLeftRadius: '2px',
      borderLeft: '4px solid var(--success)',
      borderTopLeftRadius: '2px',
      boxShadow: '0 0 4px 2px rgba(0, 0, 0, 0.1)',
      zIndex: '5',
      background: 'var(--white)',
      color: 'var(--black)',
      cursor: 'pointer',
      left: 'calc(100% + 6px)',
      padding: '15px 20px 15px 15px',
      position: 'fixed',
      top: '5%',
      transition: '1s left ease-in-out',
      '& > h3': {
        fontSize: '15px',
        margin: 0
      },
      '& > p': {
        width: '200px',
        fontSize: '12px',
        margin: '5px 0',
        wordWrap: 'break-word'
      }
    }
  },
  ({ classes }) => <div id="notification" class={classes.root} />
)

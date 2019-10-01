import Tippy from './Tooltip'

const Customize = () => (
  <div aria-hidden="true" className="modal slide" id="modal-c">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Customization</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div
          className="content"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '2rem'
          }}
        >
          <Tippy content="Original Orange">
            <span
              data-color="#ff9900"
              style={{
                borderRadius: 9999,
                height: '2.5rem',
                marginRight: '1rem',
                width: '2.5rem',
                backgroundColor: '#ff9900'
              }}
            ></span>
          </Tippy>
          <Tippy content="Hacker Green">
            <span
              data-color="#00ff00"
              style={{
                borderRadius: 9999,
                height: '2.5rem',
                marginRight: '1rem',
                width: '2.5rem',
                backgroundColor: '#00ff00'
              }}
            ></span>
          </Tippy>
          <Tippy content="Beautiful Blue">
            <span
              data-color="#0066ff"
              style={{
                borderRadius: 9999,
                height: '2.5rem',
                marginRight: '1rem',
                width: '2.5rem',
                backgroundColor: '#0066ff'
              }}
            ></span>
          </Tippy>
          <Tippy content="Fancy Fuchsia">
            <span
              data-color="#ff00ff"
              style={{
                borderRadius: 9999,
                height: '2.5rem',
                width: '2.5rem',
                backgroundColor: '#ff99ff'
              }}
            ></span>
          </Tippy>
        </div>
        <div className="footer">
          <button className="btn" data-micromodal-close>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Customize
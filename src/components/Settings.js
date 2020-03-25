const Settings = () => (
  <div aria-hidden='true' className='modal slide' id='modal-gs'>
    <div className='overlay' data-micromodal-close tabIndex={-1}>
      <div className='container' role='dialog'>
        <div className='header'>
          <h2 className='title'>Settings</h2>
          <button className='close' data-micromodal-close />
        </div>
        <div className='content'>
          <div className='audio switch-wrapper'>
            <p>Play Audio</p>
            <label className='switch' htmlFor='audio'>
              <input id='audio' type='checkbox' />
              <span className='slider round' />
            </label>
          </div>
          <div className='beta switch-wrapper'>
            <p>Beta Features</p>
            <label className='switch' htmlFor='beta'>
              <input id='beta' type='checkbox' />
              <span className='slider round' />
            </label>
          </div>
        </div>
        <div className='footer'>
          <button className='btn btn-danger' id='reset'>
            Factory Reset
          </button>
          <button className='btn' data-micromodal-close>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Settings

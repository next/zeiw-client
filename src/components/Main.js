import Tippy from './Tooltip'

const Main = () => (
  <div className='dtc tc v-mid' id='home'>
    <img className='w-30' src='https://play.zeiw.me/images/logo.png' />
    <Tippy content='Amount of current server connections' placement='bottom'>
      <h1 className='f4 ttu tracked mt0 mt4' id='online'>
        CONNECTING ...
      </h1>
    </Tippy>
    <Tippy content='Find Match' placement='bottom'>
      <svg
        className='w4 bg br3 pa4 ma2 shadow-4'
        id='playBtn'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <defs />
        <path d='M12 11l-1 1 1 1 1-1-1-1zm0-9a10 10 0 100 20 10 10 0 000-20zm2 12l-8 4 4-8 8-4-4 8z' />
      </svg>
    </Tippy>
    <Tippy content='Host Party' placement='bottom'>
      <svg
        className='w4 bg br3 pa4 ma2 shadow-4'
        id='hostBtn'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <defs />
        <path d='M12 2a10 10 0 100 20 10 10 0 000-20zm-2 15V8l6 4-6 5z' />
      </svg>
    </Tippy>
    <Tippy content='Join Party' placement='bottom'>
      <svg
        className='w4 bg br3 pa4 ma2 shadow-4'
        id='joinBtn'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <defs />
        <path d='M12 2a10 10 0 100 20 10 10 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' />
      </svg>
    </Tippy>
  </div>
)

export default Main

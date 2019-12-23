import Tippy from './Tooltip'

const Main = () => (
  <div className='dtc tc v-mid' id='home'>
    <img
      className='w-30'
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA5cAAAEcBAMAAAChU13kAAAAD1BMVEVHcEwAMJKYZQD/qgAAVP/6WA7oAAAAAXRSTlMAQObYZgAABCpJREFUeNrt3V1u4jAUBtAAWQBIXUDFChDdQCux/zWNqlEHgRLie2MnDD3fu7F9T3ix/NN137k0TzeZjwo5dUXZBVr1+RnVSKJ7mDBhwoQJEyZMmDBhwoQJEyZMmC+MeVkwLR0LbXZjrSKFXEh0svdPmDBhwoQJEyZMmDBhwoQJ84Uxdx9tckp9MzBhwoQJEyZMmDBhwoQJEyZMmDBn5vCTfUvM8/EnYcyBVn10RoX1/ZyJebgNTJgwYcKECRMmTJgwYcKE+SKY1/nvGjkeB0QLMW9b9alvtLC0n+nFn3vMv93DhAkTJkyYMGHChAkTJkyYMGHCfHXMhdb0xvrepYDCCWN+5x0mTJgwYcKECRMmTJgwYcKEec0hmqfHzK0A/cOcsatruipfdxuyUnu5htrDhAkTJkyYMGHChAkTJkyYMGFWwsw7LoSZO9IXxrxl2RcuAo6J5goKEyZMmDBhwoQJEyZMmDBhNscsFK3h2KUwZ1zGCxMmTJgwYcKECRMmTJgwYcKECbPSo0aPHf9LzGnRhTC/6jnChAkTJkyYMGHChAkTJkyYMGHCfHXM8Oimbx6qdhP0aV3Mu4m/pTBzpYUJEyZMmDBhwoQJEyZMmDDXxewrOA51W/f5qNMTYEYc7xbMYMKECRMmTJgwYcKECRMmTJgw18Js5dgA87Hoy2Hun+dPCRMmTJgwYcKECRMmTJgwfx1mU8cGmOcxiBqYhaeHWmF+Te6nggkTJkyYMGHChAkTJkyYMGHChPl7MfvIKFKOdTHPLR92i5elfmDChAkTJkyYMGHChAkTJsxnwFzGsRBzxmvwd6IwYcKECRMmTJgwYcKECRMmTJgwazlG9hk1xWywnBcpUnibT2SP1VJ/SpgwYcKECRMmTJgwYcKECbN8caOaY1PMVgeHYMKECRMmTJgwYcKECRMmTJgwYcJcHfOyhmMOs8sHJkyYMGHChAkTJkyYMGHChAkTZvT3ZjrCTGLO3mAJEyZMmDBhwoQJEyZMmDBh1sScG5gwYcKECRMmTJgwYcKECRMmTJirYV4WTAozktMymOHC3WK85R1hwoQJEyZMmDBhwoQJEyZMmC1EYcKECRMmTJgwYcKECRMmTJgwYcKEmZjTviXmqChMmDBhwoQJEyZMmDBhwoQJ8+kx70TrOp4fnRjblTkWYBZWb+zapD7fFCZMmDBhwoQJEyZMmDBhwoQJM3NN89KOQwOr63gMiJ4Dj5BHqjd9cXafbwoTJkyYMGHChAkTJkyYMGEug3nNYbkMDezYKANdbScbvQfqtslPfDOzZjBhwoQJEyZMmDBhwoQJEyZMmDBhroTZQPThdLepVjNE83Xfx8cDEyZMmDBhwoQJEyZMmDBhwoS5ouj0wLbNHUf76uZlE3Wcrvt+znhgwoQJEyZMmDBhwoQJEybMJOYftAJ/zOFYPFsAAAAASUVORK5CYII='
    />
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

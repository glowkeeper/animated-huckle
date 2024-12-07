import { Animations, useIsMobile } from '../utils'

export const Header = () => {

  return (

    <header>

      {useIsMobile() ? (

        <h1>Animated Dr Huckle</h1>

      ): (

        <>
          <ul>
              <li>{Animations.walking.title}: <strong>{Animations.walking.key}</strong></li>
              <li>{Animations.idle.title}: <strong>{Animations.idle.key}</strong></li>
              <li>{Animations.standingJump.title}: <strong>{Animations.standingJump.key}</strong></li>
              <li>{Animations.running.title}: <strong>{Animations.running.key}</strong></li> 
          </ul>
          <h1>Animated Dr Huckle</h1>
          <div>&nbsp;</div>

        </>

      )}
              
    </header>
  );
}

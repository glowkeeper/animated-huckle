import { useIsMobile } from '../utils'

export const Footer = () => {

  return (
    <footer>

      {useIsMobile() ? (

        <p>steve@huckle.studio © 2024, <a href="https://huckle.studio">Dr Steve Huckle</a></p>

      ): (

        <>

          <p>steve@huckle.studio © 2024, <a href="https://huckle.studio">Dr Steve Huckle</a></p>
          <p>powered by <a href="https://r3f.docs.pmnd.rs/getting-started/introduction" target="_blank">react-three-fiber</a></p>
          <p>&nbsp;</p>

        </>

      )}
      
    </footer>
  )
}

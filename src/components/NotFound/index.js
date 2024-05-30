import {Container, Image, Heading, Para} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isdarkTheme} = value

      const NotFoundImgUrl = isdarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Container themeColor={isdarkTheme}>
            <Image src={NotFoundImgUrl} alt="not found" />
            <Heading themeColor={isdarkTheme}>Page Not Found</Heading>
            <Para themeColor={isdarkTheme}>
              we are sorry, the page you requested could not be found.
            </Para>
          </Container>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound

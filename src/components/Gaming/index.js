import {Component} from 'react'
import {IoLogoGameControllerB} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import GameItem from '../GameItem'
import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import {
  MainBody,
  SidebarContainer,
  GamingMenuContainer,
  IconContainer,
  MenuHeading,
  GamingContainer,
  LoaderContainer,
  FailureContainer,
  FailureImg,
  FailureText,
  RetryButton,
  VideosList,
  GamingMainContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    videoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getvideoList()
  }

  getvideoList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const optial = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, optial)
    const data = await response.json()
    if (response.ok === true) {
      const update = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      this.setState({videoList: update, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {videoList} = this.state
    return (
      <VideosList>
        {videoList.map(each => (
          <GameItem key={each.id} videoDetails={each} />
        ))}
      </VideosList>
    )
  }

  loader = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <LoaderContainer className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkTheme ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </LoaderContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  failureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const theme = isDarkTheme ? 'dark' : 'light'
        const imgUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailureContainer>
            <FailureImg src={imgUrl} alt="failure view" />

            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme} as="p">
              We are having some trouble to complete your request. Please try
              again
            </FailureText>
            <RetryButton type="button" onClick={this.getVideos}>
              Retry
            </RetryButton>
          </FailureContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const theme = isDarkTheme ? 'dark' : 'light'
          return (
            <GamingMainContainer data-testid="gaming" theme={theme}>
              <Header />
              <MainBody>
                <SidebarContainer>
                  <SideBar />
                </SidebarContainer>
                <GamingContainer>
                  <GamingMenuContainer theme={theme}>
                    <IconContainer theme={theme}>
                      <IoLogoGameControllerB size={40} color="#ff0b37" />
                    </IconContainer>
                    <MenuHeading theme={theme}>Gaming</MenuHeading>
                  </GamingMenuContainer>
                  {this.checkApiStatus()}
                </GamingContainer>
              </MainBody>
            </GamingMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Gaming

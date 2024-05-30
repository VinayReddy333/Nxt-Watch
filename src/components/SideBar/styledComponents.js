import styled from 'styled-components'

export const Container = styled.div`
dispaly:flex;
flex-direction: column;
justify-content: space-between;
 background-color: ${props => (props.theme === 'dark' ? '#212121' : '#f4f4f4')};
  `

export const LogoIcons = styled.img`
  width: 40px;
  margin: 0px 6px 0px 0px;
`

export const ContactUsContainer = styled.div`
  padding: 7px;
`

export const Text = styled.p`
  font-weight: 600;
  color: ${props => (props.theme === 'dark' ? '#f4f4f4' : '#212121')};
`

import styled from 'styled-components'

export const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
background-color:${props => (props.themeColor ? '#383838' : '#f9f9f9')};`

export const Image = styled.img`
width:400px;`

export const Heading = styled.h1`
color:${props => (props.themeColor ? '#f9f9f9' : '#0f0f0f')};
font-family:'Roboto';
font-size:20px;`

export const Para = styled.p`
color:${props => (props.themeColor ? ' #d7dfe9' : '#1e293b')}
font-family:'Roboto';
font-size: 15px;
max-width: 300px;
text-align: center;`

import axios from 'axios'
import React from 'react'

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
    return <h1>Index</h1>
}

LandingPage.getInitialProps = async () => {
    const response = await axios.get('/api/users/currentuser')
    return response.data;
}

export default LandingPage
import React from 'react'
import { Link } from 'react-router-dom'
import Google from '../../components/Google/Google'

export default function Home() {
  return (
    <div>
        <h1
        style={{
          fontSize: "24px",
        }}
      >
        Welcome to Firebase Authentication
      </h1>
      <p>Don't Have an Account? <Link to='/signup'>Create an account</Link></p>
      <p>Have an Account? <Link to='/login'>Login</Link></p>
      <div className="">
        <Google />
      </div>
    </div>
  )
}

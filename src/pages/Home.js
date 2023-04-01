import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [localStorage.getItem("token")])
  return (
    <>
      <div>HOMEEEEEEEEEEEEE</div>
    </>
  )
}

export default Home
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../apis/post'

const Login = () => {
  const [loginForm, setLoginForm] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const onChange = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    userLogin(loginForm)
    .then((response) => {
      console.log(response)
      localStorage.setItem("token", response.data.token)
      setLoading(false)
      navigate("/")
    })
  }

  return (
    <Flex
      justify="center"
      mt={230}
    >
      <Flex
        maxWidth="30%"
        justify="center"
      >
        <form onSubmit={onSubmit}>
          <Input
            required
            name="email"
            placeholder="Email"
            type="email"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{ color: "gray.500"}}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500"
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500"
            }}
            bg="gray.50"
          />
          <Input
            required
            name="password"
            placeholder="Password"
            type="password"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{ color: "gray.500"}}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500"
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500"
            }}
            bg="gray.50"
          />
          <Button
            type="submit"
            width="100%"
            height="36px"
            mt={2}
            mb={2}
            isLoading={loading}
          >
            Log In
          </Button>
          <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>New Here ?</Text>
            <Text
              color="blue.500" 
              fontWeight={700} 
              cursor="pointer"
              onClick={() => {
                navigate("/register")
              }}
            >
              SIGN UP
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
    
  )
}

export default Login
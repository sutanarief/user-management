import React, { useState } from 'react'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { userRegister } from '../apis/post'
import Swal from 'sweetalert2'

const Register = () => {
  const [signUpForm, setSignUpForm] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (e) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    userRegister(signUpForm)
    .then((response) => {
      setLoading(false)
      Swal.fire("register success")
      .then((result) => {
        if(result.isConfirmed) {
          navigate("/login")
        }
      })
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
          name="name"
          placeholder="Name"
          type="text"
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
            Sign Up
          </Button>
          <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>Have an account ?</Text>
            <Text
              color="blue.500" 
              fontWeight={700} 
              cursor="pointer"
              onClick={() => {
                navigate("/login")
              }}
            >
              Log In
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

export default Register
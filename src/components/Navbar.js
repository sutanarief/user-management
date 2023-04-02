import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <Box>
      <Flex
        bg="white" 
        height="44px" 
        padding="6px 12px"
        justify="end"
        alignItems="center"
      >
        <Text 
        mr={10}
        cursor="pointer"
        onClick={logOut}
        >Logout</Text>
      </Flex>
    </Box>
  )
}

export default Navbar
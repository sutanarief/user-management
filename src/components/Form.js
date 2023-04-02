import { Button, Flex, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { getAllData } from '../apis/get'
import { createUser } from '../apis/post'
import { editUser } from '../apis/put'

const Form = ({ setUserData, onClose, data, action }) => {
  const [inputForm, setInputForm] = useState({
    name: data.name || "",
    born_date: data.born_date || "",
    address: data.address || "",
    gender: data.gender || ""
  })
  const [radioValue, setRadioValue] = useState(inputForm.gender || "")
  const [loading, setLoading] = useState(false)


  const onChange = (e) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    inputForm.gender = radioValue
    setLoading(true)
    if(action == "create") {
      createUser(inputForm)
      .then((response) => {
        Swal.fire("Success Create User")
        onClose(false)
        getAllData()
        .then((response) => setUserData(response.data))
        setLoading(false)
      })
    } else if (action == "edit") {
      editUser(data.id, inputForm)
      .then((response) => {
        Swal.fire("Success Edit User")
        onClose(false)
        getAllData()
        .then((response) => setUserData(response.data))
        setLoading(false)
      })
    }
  }

  return (

        <form onSubmit={onSubmit}>
          <Input
            required
            name="name"
            placeholder="Nama"
            type="text"
            value={inputForm.name}
            disabled={action == "view"}
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
            name="address"
            placeholder="Alamat"
            type="text"
            value={inputForm.address}
            disabled={action == "view"}
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
          <Flex>
            <Text mb='8px' fontSize="10pt">Jenis Kelamin : </Text>
            <RadioGroup ml={5} onChange={setRadioValue} value={radioValue}>
              <Stack direction='row'>
                <Radio isDisabled={action == "view"} size="sm" isChecked={inputForm.gender == "l" ? true : false} value='l'>Pria</Radio>
                <Radio isDisabled={action == "view"} size="sm" isChecked={inputForm.gender == "p" ? false : true} value='p'>Wanita</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
          <Input
            required
            name="born_date"
            placeholder="Tanggal Lahir"
            type="date"
            value={inputForm.born_date}
            disabled={action == "view"}
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
          {action != "view" && (
          <Button
            type="submit"
            width="100%"
            height="36px"
            mt={2}
            mb={2}
            isLoading={loading}
          >
            Save
          </Button>
          )}
      </form>
  )
}

export default Form
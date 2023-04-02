import { Box, Button, Flex, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteUser } from '../apis/delete'
import { getAllData, getDataById } from '../apis/get'
import ModalInput from '../components/ModalInput'
import Navbar from '../components/Navbar'

const Home = () => {

  const [userData, setUserData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState("")
  const [data, setData] = useState({})
  const navigate = useNavigate()

  
  const actionButton = (id) => {
    return (
      <>
        <Button
          onClick={() => {
            getDataById(id)
            .then((response) => {
              setData(response.data)
              setIsOpen(true)
              setAction("view")
            })
          }}
        >
          View
        </Button>
        <Button
          onClick={() => {
            getDataById(id)
            .then((response) => {
              setData(response.data)
              setIsOpen(true)
              setAction("edit")
            })
          }}
        >Edit</Button>
        <Button
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                deleteUser(id)
                .then(() => {
                  getAllData()
                  .then((response) => setUserData(response.data))
                })
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          }}
        >
          Delete
        </Button>
      </>
    )
  }

  const formatBornDate = (str) => {
    let strSplit = str.split("-")
    const bulanTemplate = [
      "Januari", 
      "Februari", 
      "Maret", 
      "April", 
      "Mei", 
      "Juni", 
      "Juli", 
      "Agustus", 
      "September", 
      "Oktober",
      "November", 
      "Desember"
    ]

    return `${strSplit[2]} ${bulanTemplate[Number(strSplit[1]) - 1]}, ${strSplit[0]}`
  }

  const formatCreatedAtDate = (date) => {

    const dateTime = new Date(date);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };

    const formattedDateTime = dateTime.toLocaleString('id-ID', options);
    const removedPukul = formattedDateTime.split(" pukul ")
    const changeDot = removedPukul[1].replaceAll(".", ":")
    return `${removedPukul[0]} ${changeDot}`
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [localStorage.getItem("token")])

  useEffect(() => {
    getAllData()
    .then((response) => {
      setUserData(response.data)
    })
  }, [])

  return (
    <>
      <Navbar />
      <ModalInput setData={setData} isOpen={isOpen} onClose={setIsOpen} action={action} data={data} setUserData={setUserData}/>
      <Box
        p={10}
      >
        <Flex
          direction="column"
        >
          <Button
            width="fit-content"
            mb={5}
            onClick={() => {
              setIsOpen(true)
              setAction("create")
            }}
          >Tambah User</Button>
          <TableContainer
          width="100%"
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Alamat</Th>
                  <Th>P/W</Th>
                  <Th>Tanggal Lahir</Th>
                  <Th>Tanggal Input</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userData.length ? userData.map((user, index) => (
                  <>
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.address}</Td>
                      <Td>{user.gender == "l" ? "Pria" : "Wanita"}</Td>
                      <Td>{formatBornDate(user.born_date)}</Td>
                      <Td>{formatCreatedAtDate(user.created_at)}</Td>
                      <Td>{actionButton(user.id)}</Td>
                    </Tr>
                  </>
                )) : <Skeleton/>}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </>
  )
}

export default Home
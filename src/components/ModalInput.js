import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import Form from './Form'

const ModalInput = ({ isOpen, onClose, data, action, setUserData, setData }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        onClose(false)
        setData({})
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{action == "create" ? "Tambah Data" : action == "edit" ? "Edit Data" : "Lihat Data"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form action={action} setUserData={setUserData} onClose={onClose} data={data}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalInput
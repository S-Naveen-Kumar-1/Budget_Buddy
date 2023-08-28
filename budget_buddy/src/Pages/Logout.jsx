import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
  const { setIsAuth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    setIsLoggedOut(true);
    onOpen();
  };

  const closeModal = () => {
    setIsLoggedOut(false);
    onClose();
    navigate('/');
  };

  return (
    <>
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You have been successfully logged out.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Logout;

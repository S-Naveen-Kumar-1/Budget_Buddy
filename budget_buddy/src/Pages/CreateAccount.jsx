import React, { useContext, useReducer, useState } from 'react';
import Footer from "./Footer";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  Box,
} from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContextProvider';
import Logo1 from "../Images/1.png"

import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT': {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case 'RESET_FORM': {
      return {
        ...initState,
      };
    }
    default: {
      throw new Error(`Invalid action type`);
    }
  }
};

const initState = {
  fullName: '',
  aadhaarNumber: '',
  dateOfBirth: '',
  mobile: '',
  email: '',
  password: '',
  balance:10000
};

function CreateAccount() {
  const navigate = useNavigate();
  const { setAccountDetails, accountDetails } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/Account_details`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      setAccountDetails([...accountDetails, state]);
      setIsModalOpen(true);
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const payload = {
      name: name,
      value: type === 'date' ? value : value,
    };
    dispatch({ type: 'CHANGE_INPUT', payload: payload });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <Box p={6} bg="#A2B5F7">
    <Flex p={8}>
      <Box flex="1" p={4} color="white">
        <img width="50%" style={{height:"40%",}} src={Logo1} alt="Bank" />
        <p style={{color:"black"}}>
           "Welcome to our online account creation portal! Creating an account with us is the first step towards enjoying a seamless banking experience. Our platform offers a secure and user-friendly way to set up your account, making it easier than ever to manage your finances.

   To get started, please fill out the form on the right. Provide your full name, Aadhaar number, and date of birth to verify your identity. We take your privacy seriously, so rest assured that your personal information is safe with us. Additionally, we'll need your mobile number and email address to keep you updated on your account status and important notifications.
  
   Once you've filled out the required information, choose a strong password to secure your account. We recommend using a combination of letters, numbers, and special characters for maximum security. After submitting the form, your account will be created, and you'll be able to access your banking services online.
  
  
   Thank you for choosing our bank for your financial needs. We look forward to serving you and helping you achieve your financial goals!"
  
   Feel free to customize and adjust the paragraph to align with your bank's specific messaging and services.

        </p>
      </Box>
      <Box flex="1" style={{backgroundColor:"#A2B5F7"}} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
        <form >
          <FormControl>
            <FormLabel color="blue.500">Full Name</FormLabel>
            <Input
              placeholder="Full Name"
              name="fullName"
              value={state.fullName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="blue.500">Aadhaar Number</FormLabel>
            <Input
              placeholder="Aadhaar Number"
              name="aadhaarNumber"
              value={state.aadhaarNumber}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="blue.500">Date of Birth</FormLabel>
            <Input
              type="date"
              name="dateOfBirth"
              value={state.dateOfBirth}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="blue.500">Mobile Number</FormLabel>
            <Input
              placeholder="Mobile Number"
              name="mobile"
              value={state.mobile}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="blue.500">Email</FormLabel>
            <Input
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="blue.500">Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
            Create Account
          </Button>
        </form>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Created</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Your account has been successfully created!</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
    <Footer/>
    </Box>

  );
}

export default CreateAccount;


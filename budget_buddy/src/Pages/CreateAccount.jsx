import React, { useContext, useReducer } from 'react';
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
} from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContextProvider';


//reducer function
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

// initial state for create account
const initState = {
  fullName: '',
  aadhaarNumber: '',
  dateOfBirth: '',
  mobile: '',
  email: "",
  password: '',
};

function CreateAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //usecontext data
  const { accountDetails, setAccountDetails } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initState);

  const handleSubmit = () => {
    setAccountDetails([...accountDetails, state]);
    onClose();
    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/Account_details`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(state)
    })
    dispatch({type:"RESET_FORM"})
  };
// console.log(accountDetails)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const payload = {
      name: name,
      value: type === 'date' ? (value) : value,
    };
    dispatch({ type: 'CHANGE_INPUT', payload: payload });
  };

  return (
    <>
      <Button backgroundColor="transparent" color="white" onClick={onOpen}>Create Account</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder='Full Name'
                name='fullName'
                value={state.fullName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Aadhaar Number</FormLabel>
              <Input
                placeholder='Aadhaar Number'
                name='aadhaarNumber'
                value={state.aadhaarNumber}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type='date'
                placeholder='Date of Birth'
                name='dateOfBirth'
                value={state.dateOfBirth}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder='Mobile Number'
                name='mobile'
                value={state.mobile}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Full Name'
                name='email'
                value={state.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={state.password}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateAccount;

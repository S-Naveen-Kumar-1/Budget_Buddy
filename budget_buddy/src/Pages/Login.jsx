import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContextProvider';

function Login() {
  const { accountDetails,setAccountDetails, Login,isAuth,setIsAuth } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const handleSubmit = () => {
    // console.log(accountDetails)
    for (let i = 0; i < accountDetails.length; i++) {
      // console.log(typeof(accountDetails[0].password))
      if (email === accountDetails[i].email && password == accountDetails[i].password) {
        alert("Login success");
        //add chakra alert icon
        setEmail("");
        setPassword("");
        setLoginError(false);
        onClose();
        return; 
      }
    }
    setLoginError(true);
  };

  return (
    <>
      <Button onClick={onOpen} backgroundColor="transparent" color="white">LOGIN</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>LOGIN</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {loginError && <p style={{ color: 'red' }}>Invalid email or password</p>}
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

export default Login;

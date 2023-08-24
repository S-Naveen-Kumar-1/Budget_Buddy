import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from './AuthContext';
import { Link as ReactRouterLink } from 'react-router-dom'; 
import { Link as ChakraLink } from '@chakra-ui/react'; 

const SignUp = ({ onSignUp }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    login();
    onSignUp();
  };

  return (
    <Box p={8} maxWidth="400px" mx="auto">
      <Text fontSize="xl" mb={4}>
        Sign Up
      </Text>
      <VStack spacing={4} align="center">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSignUp}>
          <ChakraLink as={ReactRouterLink} to="/signup">Sign Up</ChakraLink>
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUp;

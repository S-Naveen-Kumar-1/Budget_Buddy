import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react'; // Import ChakraLink
import Login from "../Pages/Login"
import Logo1 from "../Images/Logo.png"
import { useContext } from 'react';

import { AuthContext } from '../Context/AuthContextProvider';
import Logout from '../Pages/Logout';
const NavBar = () => {
  const { isAuth } = useContext(AuthContext);
console.log(isAuth)
  return (
    <Box bg="gray.700" color="white">
      <Flex justify="space-between" align="center" p={4}>
        {/* <ChakraLink as={ReactRouterLink} to="/"> */}
          <Image src={Logo1}  height="60px" borderRadius="50%"/>
        {/* </ChakraLink> */}
        <ChakraLink as={ReactRouterLink} to="/" mx={2} _hover={{ textDecoration: 'none' }}>
            Home
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/account" mx={2} _hover={{ textDecoration: 'none' }}>
            Account
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/currency" color="greenRGBA(0, 0, 0, 0.24)" mx={2} _hover={{ textDecoration: 'none' }}>
            Currency Conversion
          </ChakraLink>
          
          {
            isAuth ?
            <ChakraLink as={ReactRouterLink}  to="/transaction"  mx={2} _hover={{ textDecoration: 'none' }}>
            Make Transactions
            </ChakraLink>
            :
            <ChakraLink as={ReactRouterLink}  mx={2} _hover={{ textDecoration: 'none' }}>
             <Login />
            </ChakraLink>
          }
          {
            !isAuth ?
            <ChakraLink as={ReactRouterLink} to="/createaccount"  mx={2} _hover={{ textDecoration: 'none' }}>
            Create Account
            </ChakraLink>
            :
            <ChakraLink as={ReactRouterLink}  mx={2} _hover={{ textDecoration: 'none' }}>
             <Logout />
            </ChakraLink>
          }
          
      </Flex>
    </Box>
  );
};

export default NavBar;

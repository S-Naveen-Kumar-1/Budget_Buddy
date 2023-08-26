import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import {
  Box,
  Heading,
  Text,
  Divider,
  VStack,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";

export const Account = () => {
  const { accountDetails, userEmail, userPassword } = useContext(AuthContext);
  const [signupUser, setSignupUser] = useState(null);
  console.log(userEmail, userPassword)
  if (!signupUser) {
    for (let i = 0; i < accountDetails.length; i++) {
      if (
        userEmail == accountDetails[i].email &&
        userPassword == accountDetails[i].password
      ) {
        setSignupUser(accountDetails[i]);
        break; // No need to continue the loop once found
      }
    }
  }

  return (
    <Box p={6}>
      <Heading as="h1" size="lg" mb={4}>
        Bank Account Dashboard
      </Heading>
      {signupUser ? (
        <VStack spacing={4} align="stretch">
          <Box
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
          >
            <Text fontSize="xl" fontWeight="bold">Account Overview</Text>
            <Divider mt={2} />
            <Flex flexWrap="wrap" justifyContent="space-between" margin="auto" alignItems="center">
              <Box>
                <HStack spacing={4} mt={3}>
                  <Text fontWeight="bold">Account Holder:</Text>
                  <Text>{signupUser.fullName}</Text>
                </HStack>
                <HStack spacing={4} mt={2}>
                  <Text fontWeight="bold">Account Number:</Text>
                  <Text>{signupUser.aadhaarNumber}</Text>
                </HStack>
                <HStack spacing={4} mt={2}>
                  <Text fontWeight="bold">Date of Birth:</Text>
                  <Text>{signupUser.dateOfBirth}</Text>
                </HStack>
              </Box>
              <Box>
                <HStack spacing={4} mt={2}>
                  <Text fontWeight="bold">Email:</Text>
                  <Text>{signupUser.email}</Text>
                </HStack>
                <HStack spacing={4} mt={2}>
                  <Text fontWeight="bold">Mobile:</Text>
                  <Text>{signupUser.mobile}</Text>
                </HStack>
                <HStack spacing={4} mt={2}>
                  <Text fontWeight="bold">Toatal Balance:</Text>
                  <Text>{1000}</Text>
                </HStack>
              </Box>
            </Flex>
            {/* Render more account details here */}
          </Box>
          <Box
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
          >
            <Text fontSize="xl">Transactions</Text>
            <Divider mt={2} />
            {/* Render transaction history here */}
          </Box>
          <Button colorScheme="blue">Make a Transaction</Button>
        </VStack>
      ) : (
        <Text>No account found.</Text>
      )}
    </Box>
  );
};

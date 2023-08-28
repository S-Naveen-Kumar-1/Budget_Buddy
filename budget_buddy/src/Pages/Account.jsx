import { useContext, useState, useEffect } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,

} from "@chakra-ui/react";

export const Account = () => {


  const { accountDetails, userEmail, userPassword } = useContext(AuthContext);
  const [signupUser, setSignupUser] = useState(null);
  // console.log(userEmail, userPassword)
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])

  function FetchData() {


    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/transaction_details`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })

  }

  useEffect(() => {
    FetchData()
  }, []);
  function FetchData1() {


    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/Account_details`)
      .then(res => res.json())
      .then(data => {
        setData1(data)
      })

  }

  useEffect(() => {
    FetchData1()
  }, []);

  if (!signupUser) {
    for (let i = 0; i < data1.length; i++) {
      if (
        userEmail == data1[i].email &&
        userPassword == data1[i].password
      ) {
        setSignupUser(data1[i]);
        break;
      }
    }
  }
  console.log(data)
  return (
    <Box p={6} bg="#A2B5F7">
    <Box p={6} bg="#A2B5F7">
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
            // bg="white"
            bg="#A2B5F7"
            border="none"
          >
            <Text fontSize="xl" color="grey" fontWeight="bold">Account Overview</Text>
            <Divider mt={2} />
            <Flex flexWrap="wrap" justifyContent="space-between" margin="auto" alignItems="center">
              <Box bg="#A2B5F7">
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
              <Box bg="#A2B5F7">
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
                  <Text>{signupUser.balance}</Text>
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
            bg="#A2B5F7"
            border="none"
          >
        <Divider mt={2} />
            {/* Render transaction history here */}
            <Text fontSize="xl">Transactions</Text>
            <Divider mt={2} />
            <Table variant="simple" border="none"> 
              <Thead>
                <Tr>
                  <Th>Sl.No</Th>
                  <Th>Type</Th>
                  <Th>Time</Th>
                  <Th>Amount</Th>
                </Tr>
             </Thead>
              <Tbody>
                {data.map((transaction,index) => (
                  <Tr key={index+1}>
                    <Td>{index+1}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{transaction.time}</Td>
                    <Td>{transaction.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Button colorScheme="blue">Make a Transaction</Button>
        </VStack>
      ) : (
        <Text>No account found.</Text>
      )}
    </Box>
    </Box>

  );
};

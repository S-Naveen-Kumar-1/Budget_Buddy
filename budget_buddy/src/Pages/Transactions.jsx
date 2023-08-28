import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
import {
  Flex,
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Image
} from '@chakra-ui/react';
import Logo1 from "../Images/bank.png"
import Logo2 from "../Images/3.png"
import Logo3 from "../Images/dth.jpg"
import { useNavigate } from 'react-router-dom'; 


function TransactionPage() {
  const {  accountDetails, setAccountDetails,userEmail,userPassword} = useContext(AuthContext);
// console.log(userEmail,userPassword)
const navigate = useNavigate(); 

let currentUser={fullName:"Guest"}
for (let i = 0; i < accountDetails.length; i++) {
    // console.log(typeof(accountDetails[0].password))
    if (userEmail === accountDetails[i].email && userPassword == accountDetails[i].password) {
        currentUser=accountDetails[i]
    }
  }
//   console.log(currentUser,"user")
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileAmount, setMobileAmount] = useState('');
  const [dthNumber, setDthNumber] = useState('');
  const [dthAmount, setDthAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferToAccount, setTransferToAccount] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [type,setType]=useState("Mobile Recharge")

  const [amount, setAmount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    setTransactionSuccess(true);
    setShowSuccessModal(true); // Open the success modal
  };
  const closeModalAndRedirectToAccounts = () => {
    setShowSuccessModal(false);
    navigate('/account'); // Replace '/accounts' with your actual route
  };


  function fetchAndUpdateData(updatedBalance) {
    const updatedUser = { ...currentUser, balance: updatedBalance };

    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/Account_details/${currentUser.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        setAccountDetails(prevDetails =>
          prevDetails.map(detail => (detail.id === currentUser.id ? updatedUser : detail))
        );
      })
      .catch(error => {
        console.error("Error updating account details:", error);
      });
  }

  function fetchAndSaveTransactionDetails(type, amount) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const transactionData = {
      type: type,
      time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      amount: amount,
    };

    fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/transaction_details`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful response if needed
      })
      .catch(error => {
        console.error("Error saving transaction details:", error);
      });
  }

  useEffect(() => {
    if (mobileAmount !== '') {
      fetchAndUpdateData(currentUser.balance - mobileAmount);
      fetchAndSaveTransactionDetails("DTH Recharge", mobileAmount);

    }
  }, [mobileAmount]);

  useEffect(() => {
    if (dthAmount !== '') {
      fetchAndSaveTransactionDetails("DTH Recharge", dthAmount);
      fetchAndUpdateData(currentUser.balance - dthAmount);
      // Call fetchAndUpdateData or any other logic for DTH amount
    }
  }, [dthAmount]);

  useEffect(() => {
    if (transferAmount !== '') {
      fetchAndSaveTransactionDetails("DTH Recharge", transferAmount);
      fetchAndUpdateData(currentUser.balance - transferAmount);

      // Call fetchAndUpdateData or any other logic for transfer amount
    }
  }, [transferAmount]);


const handleMobileRecharge=()=>{
    setType("Mobile Recharge")
   setAmount(mobileAmount)
   setIsModalOpen(true);

}
const handleDthRecharge=()=>{
    setType("DTH Recharge")
   setAmount(dthAmount) 
   setIsModalOpen(true);

}
const handleMoneyTransfer=()=>{
    setType("Money Tranfer")
    setAmount(transferAmount)
    setIsModalOpen(true);

  }
 
let arr=[
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
  Logo1,
  Logo2,
  Logo3,
]
 
const [slideshowIndex, setSlideshowIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSlideshowIndex((prevIndex) => (prevIndex + 1) % arr.length);
  }, 2000);

  return () => {
    clearInterval(interval);
  };
}, []);
  return (
    <Box p={6} bg="#A2B5F7">

          <Text fontSize="xl" fontWeight="bold" mb={4} margin="20px">
      Welcome, <span style={{ color: 'grey' }}>{currentUser.fullName}</span>
    </Text>
         <Flex justifyContent="center" style={{gap:"100px"}} alignItems="center" height="300px">
        {arr.slice(slideshowIndex, slideshowIndex + 3).map((image, index) => (
          <Image
          key={index}
          src={image}
          alt={`Image ${index}`}
          marginRight="20px"
          height="250px" 
          width="250px"  
          borderRadius="15px"
          />
        ))}
      </Flex>
   
<Flex direction="column" align="center" p={8}>
   
    <Box borderWidth={1} borderRadius="lg" boxShadow="lg" p={4}>
      <HStack spacing={4} align="stretch">
        <Button colorScheme="blue" onClick={handleMobileRecharge}>Mobile Recharge</Button>
        <Button colorScheme="blue" onClick={handleDthRecharge}>DTH Recharge</Button>
        <Button colorScheme="blue" onClick={handleMoneyTransfer}>Money Transfer</Button>
      </HStack>
    </Box>

    <Modal isOpen={isModalOpen} onClose={closeModalAndRedirect}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {type === "Mobile Recharge" && (
            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Mobile Number"
                value={mobileNumber}
                type='number'
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Amount"
                value={mobileAmount}
                type='number'
                onChange={(e) => setMobileAmount(e.target.value)}
              />
            </FormControl>
          )}
          {type === "DTH Recharge" && (
            <FormControl>
              <FormLabel>DTH Number</FormLabel>
              <Input
                type='number'
                placeholder="DTH Number"
                value={dthNumber}
                onChange={(e) => setDthNumber(e.target.value)}
              />
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Amount"
                value={dthAmount}
                type='number'
                onChange={(e) => setDthAmount(e.target.value)}
              />
            </FormControl>
          )}
          {type === "Money Tranfer" && (
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  placeholder="Amount"
                  value={transferAmount}
                  type="number"
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
                <FormLabel>Transfer To Account</FormLabel>
                <Input
                  placeholder="Transfer To Account"
                  value={transferToAccount}
                  type="number"
                  onChange={(e) => setTransferToAccount(e.target.value)}
                />
              </FormControl>
            )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={closeModalAndRedirect}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Flex>
  <Modal isOpen={showSuccessModal} onClose={closeModalAndRedirectToAccounts}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your transaction was successful.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModalAndRedirectToAccounts}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    
  );
}

export default TransactionPage;
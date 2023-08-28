import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Select, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Alert, AlertIcon } from '@chakra-ui/react';
import Footer from './Footer';

const exchangeRates = {
  USD: 1,
  EUR: 0.92251,
  GBP: 0.79013,
  AUD: 1.5533,
  CAD: 1.3548,
  JPY: 145.72,
  NZD: 1.6851,
  RUB: 0.92251,
  INR: 82.65,
};

function CurrencyConversion() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConvert = () => {
    const convertedValue = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    const result = `${amount} ${fromCurrency} equals ${convertedValue.toFixed(2)} ${toCurrency}`;
    setConvertedAmount(result);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConvertedAmount(null);
  };

  return (
    <Box p={6} bg="lightblue">
    <Box p={6} bg="lightblue">
      <FormControl>
        <FormLabel>From Currency</FormLabel>
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>To Currency</FormLabel>
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={handleConvert}>
        Convert
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Conversion Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {convertedAmount && (
              <Alert status="success">
                <AlertIcon />
                {convertedAmount}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    <Footer/>
    </Box>

  );
}

export default CurrencyConversion;

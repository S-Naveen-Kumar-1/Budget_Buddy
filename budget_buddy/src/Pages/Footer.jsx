import React from "react";
import Logo1 from "../Images/Logo.png"



import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Container,
  Divider,
  Link,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillClockCircle,
  AiFillInstagram,
} from "react-icons/ai";

function Footer() {
  return (
    <Box id="footer1"  p={6}>
          <Divider mt={6} />
      <Container maxW="container.lg">
        <HStack spacing={200}>
          <Box id="company_info">
            <VStack align="flex-start">
              <Heading fontSize="xl" mt={2}>
                Discover Our Banking World
              </Heading>
              <Text fontSize="md" mt={2}>
                Embrace the possibilities of modern banking for a brighter
                financial future.
              </Text>
              <Image src={Logo1} height="100px" borderRadius="50%" alt="Bank Logo" />
            </VStack>
          </Box>
          <Box id="contact_footer">
            <VStack align="flex-start">
              <Heading fontSize="xl" mt={2}>
                Reach Out to Us
              </Heading>
              <HStack id="num" spacing={2} mt={2}>
                <Icon as={AiFillPhone} fontSize="md" />
                <Text fontSize="md">+1 (123) 456-7890</Text>
              </HStack>
              <HStack id="location" spacing={2} mt={2}>
                <Icon as={AiFillEnvironment} fontSize="md" />
                <Text fontSize="md">123 Bank Street, City</Text>
              </HStack>
              <HStack id="time" spacing={2} mt={2}>
                <Icon as={AiFillClockCircle} fontSize="md" />
                <Text fontSize="md">Mon - Fri 9:00 AM - 5:00 PM</Text>
              </HStack>
              <HStack id="logos" spacing={2} mt={2}>
                <Icon as={AiFillClockCircle} fontSize="md" />
                <Text fontSize="md">Mon - Fri 9:00 AM - 5:00 PM</Text>
              </HStack>
              <HStack id="logos" spacing={2} mt={2}>
                  <Icon as={AiFillInstagram} fontSize="lg" />
                  <Text fontSize="md">Follow us to get more info</Text>

                {/* You can add more social media links and icons here */}
              </HStack>
            </VStack>
          </Box>
        </HStack>
        <Divider mt={6} />
        <Box textAlign="center">
          <Text>&copy; 2023 Bank Name. All rights reserved.</Text>
          <Link color="blue.500" href="/privacy-policy">
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;

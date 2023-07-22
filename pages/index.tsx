import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Checkbox } from "@chakra-ui/react";
import Calculator from './Calculator';
import Disclaimer from './Disclaimer';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previouslyAccepted, setPreviouslyAccepted] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("acceptedDisclaimer");
    if (accepted === "true") {
      setPreviouslyAccepted(true);
    } else {
      onOpen();
    }
  }, []);

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  }

  const handleOkClick = () => {
    if (checkboxChecked) {
      localStorage.setItem("acceptedDisclaimer", "true");
      setPreviouslyAccepted(true);
      onClose();
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.900">
      <Calculator />
      <Modal isOpen={!previouslyAccepted} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Disclaimer />
            <Flex mt={4}>
              <Checkbox colorScheme="green" isChecked={checkboxChecked} onChange={handleCheckboxChange}>I understand</Checkbox>
              <Spacer />
              <Button colorScheme="blue" onClick={handleOkClick} isDisabled={!checkboxChecked}>OK</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Home;

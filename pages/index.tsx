import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Calculator from './Calculator';
import Disclaimer from './Disclaimer';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.900">
      <Calculator />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Disclaimer />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Home;

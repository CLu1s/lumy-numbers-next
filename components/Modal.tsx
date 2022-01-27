import { Fragment, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  title: string;
  children: any;
  cancelButton?: boolean;
  cancelButtonText?: string;
  action?: () => void;
  actionButtonText?: string;
  actionColor?: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function ModalComponent({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="ghost" onClick={onSubmit}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

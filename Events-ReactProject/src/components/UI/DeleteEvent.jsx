import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const DeleteEvent = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let toast = useToast();

  // delete event
  const deleteEvent = async () => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });
    const deletingStatus = response.status;
    return deletingStatus;
  };

  // delete
  const handleDelete = async () => {
    const status = await deleteEvent();

    switch (status) {
      case 200:
        toast({
          title: "Success!",
          description: "Your event was deleted succesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        break;
      case 404:
        toast({
          title: "Oops",
          description: `The event you tried to delete cannot be found ${status} `,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: "Woah",
          description: `Something happened! Not sure what "${status}" means though...`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
    }
  };

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Do you really want to delete this event?</ModalBody>

          <ModalFooter gap={4}>
            <Link to="/">
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Link>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

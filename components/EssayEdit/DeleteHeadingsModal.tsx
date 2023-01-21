import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@chakra-ui/react'
import React from "react";
import { Essay } from '../../lib/Types';

type Props = {
    headerId: number,
    header: string,

    headings: Essay[],
    setHeadings: Function,

    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function DeleteHeadingModal(props: Props) {

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Your Heading</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are You Sure You Want To Delete <b>{props.header}</b>? Once it's deleted, it can't be recovered.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => {
                            fetch("http://localhost:3000/api/Headings/DeleteHeading", {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "id": props.headerId
                                })
                            }).then(() => {
                                // Removes the deleted essay from the essays array
                                let headings = props.headings.filter((header) => {
                                    return header.id !== props.headerId;
                                });

                                props.setHeadings(headings);
                            });

                            props.onClose();
                        }}>
                            Delete
                        </Button>
                        <Button variant='outline' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

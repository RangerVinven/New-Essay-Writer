import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@chakra-ui/react'
import React from "react";
import { Essay } from '../../lib/Types';

type Props = {
    essayId: number,
    essay: string,

    essays: Essay[],
    setEssays: Function,

    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function DeleteEssayModal(props: Props) {

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Your Essay</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are You Sure You Want To Delete <b>{props.essay}</b>? Once it's deleted, it can't be recovered.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => {
                            fetch("http://localhost:3000/api/Essays/DeleteEssay", {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "id": props.essayId
                                })
                            }).then(() => {
                                // Removes the deleted essay from the essays array
                                let essays = props.essays.filter((essay) => {
                                    return essay.id !== props.essayId;
                                });                                

                                props.setEssays([...essays]);
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

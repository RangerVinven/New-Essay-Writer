import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@chakra-ui/react'
import React, { useState } from "react";

type Props = {
    essays: Object[],
    setEssays: Function,
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function AddEssayModal(props: Props) {

    const [essayName, setEssayName] = useState("");

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create An Essay</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input value={essayName} placeholder="Your Essay Name" onChange={(event) => {
                            setEssayName(event.target.value);
                        }} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={() => {
                            fetch("http://localhost:3000/api/Essays/AddEssay", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "EssayName": essayName
                                })
                            }).then(data => data.json()).then((res) => {
                                // Adds the essay to the essays
                                props.setEssays([{
                                    id: res.id,
                                    Name: essayName
                                }, ...props.essays]);
                                props.onClose();
                            })
                        }}>
                            Create
                        </Button>
                        <Button variant='outline' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

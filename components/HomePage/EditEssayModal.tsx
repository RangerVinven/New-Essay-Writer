import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@chakra-ui/react'
import React, { useState } from "react";
import { Essay } from '../../lib/Types';

type Props = {
    essays: Essay[],
    setEssays: Function,
    oldEssayId: number,
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function EditEssayModal(props: Props) {

    const [newEsasyName, setNewEssayName] = useState("");

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create An Essay</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Your Essay Name" onChange={(event) => {
                            setNewEssayName(event.target.value);
                        }} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={() => {
                            fetch("http://localhost:3000/api/EditEssayName", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "id": props.oldEssayId,
                                    "NewEssayName": newEsasyName
                                })
                            }).then(data => data.json()).then((res) => {
                                // Updates the essays to include the new essay name
                                let essays = props.essays.filter((essay) => {
                                    return essay.id !== res.id;
                                });                                

                                // Sets the essays to [essay with new name, other essays]
                                props.setEssays([{
                                    id: res.id,
                                    Name: res.name
                                }, ...essays]);
                                
                                props.onClose();
                            })
                        }}>
                            Update
                        </Button>
                        <Button variant='outline' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@chakra-ui/react'
import React, { useState } from "react";
import { Essay, Header } from '../../lib/Types';

type Props = {
    headerId: number,
    header: string,

    headings: Header[],
    setHeadings: Function,

    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function RenameHeadingModal(props: Props) {

    const [newHeader, setNewHeader] = useState("");

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Rename Your Heading</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Your Header" onChange={(event) => {
                            setNewHeader(event.target.value);
                        }} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={() => {
                            fetch("http://localhost:3000/api/Headings/EditHeader", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "id": props.headerId,
                                    "NewHeader": newHeader
                                })
                            }).then(data => data.json()).then((res) => {
                                // Removes the edited heading from the headings array
                                // let headings = props.headings.filter((header) => {
                                //     return header.id !== res.id;
                                // });                                

                                // // Sets the essays to [essay with new name, other essays]
                                // props.setHeadings([{
                                //     id: res.id,
                                //     Name: res.name,
                                //     Essay: res.Essay,
                                //     Order_In_Essay: res.Order_In_Essay
                                // }, ...headings]);

                                
                                let headings: Header[] = [];
                                
                                // Loops through the headings, removing the old heading and adding the new one
                                for (let i = 0; i < props.headings.length; i++) {
                                    
                                    // Doesn't add the old header (before its name change)
                                    if(props.headings[i].id == res.id) {
                                        // Adds the new (edited) header when it's in the right order
                                        headings.push({
                                            id: res.id,
                                            Name: res.name,
                                            Essay: res.Essay,
                                            Order_In_Essay: res.Order_In_Essay
                                        });
                                    } else {
                                        headings.push(props.headings[i])
                                    }
                                }

                                props.setHeadings(headings);
                                
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

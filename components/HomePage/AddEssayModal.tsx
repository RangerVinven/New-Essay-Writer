import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@chakra-ui/react'
import React from 'react'

type Props = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function AddEssayModal(props: Props) {

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create An Essay</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Your Essay Name" />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button variant='outline' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

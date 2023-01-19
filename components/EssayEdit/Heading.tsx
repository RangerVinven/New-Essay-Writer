import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Header } from '../../lib/Types'
import DeleteHeadingModal from './DeleteHeadingsModal'

type Props = {
    header: Header

    headings: Header[],
    setHeadings: Function,
}

export default function Heading(props: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="mb-2 text-center flex items-center justify-center">
            <DeleteHeadingModal headerId={props.header.id} header={props.header.Name} headings={props.headings} setHeadings={props.setHeadings} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            <h3 className="text-xl font-medium mr-4">{ props.header.Name }</h3>
            <IconButton size="sm" onClick={onOpen} aria-label="Delete Heading" icon={<DeleteIcon />} colorScheme="red"/>
        </div>
    )
}

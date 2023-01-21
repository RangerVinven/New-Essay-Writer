import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Header } from '../../lib/Types'
import DeleteHeadingModal from './DeleteHeadingsModal'
import RenameHeadingModal from './RenameHeadingsModal'

type Props = {
    header: Header

    headings: Header[],
    setHeadings: Function,
}

export default function Heading(props: Props) {

    const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
    const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();

    return (
        <div className="mb-2 text-center flex items-center justify-center">
            <DeleteHeadingModal headerId={props.header.id} header={props.header.Name} headings={props.headings} setHeadings={props.setHeadings} isOpen={deleteIsOpen} onOpen={deleteOnOpen} onClose={deleteOnClose} />
            <RenameHeadingModal headerId={props.header.id} header={props.header.Name} headings={props.headings} setHeadings={props.setHeadings} isOpen={editIsOpen} onOpen={editOnOpen} onClose={editOnClose} />

            <h3 className="text-xl font-medium mr-4">{ props.header.Name }</h3>
            <IconButton className="mr-2" size="sm" onClick={editOnOpen} aria-label="Edit Heading" icon={<EditIcon />} colorScheme="blue"/>
            <IconButton size="sm" onClick={deleteOnOpen} aria-label="Delete Heading" icon={<DeleteIcon />} colorScheme="red"/>
        </div>
    )
}

import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { IconButton, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { Essay } from "../../lib/Types"
import DeleteEssayModal from "./DeleteEssayModal"
import EditEssayModal from "./EditEssayModal"

type Props = {
    essays: Essay[],
    setEssays: Function,
    id: number,
    name: string
}

export default function EssayTile(props: Props) {

    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    return (
        <div className="w-fit h-fit relative">
            <div className="absolute z-10 right-0 top-0 mt-2 mr-2">
                    <IconButton className="mr-2" onClick={onEditOpen} aria-label="Edit Essay Name" icon={<EditIcon />} colorScheme="blue"/>
                    <IconButton onClick={onDeleteOpen} aria-label="Delete Essay" icon={<DeleteIcon />} colorScheme="red"/>
            </div>

            <Link href={"/" + encodeURIComponent(props.name)}>
                <div className="h-64 w-64 mb-11 rounded-md bg-gray-400 relative flex justify-center items-center p-2 hover:cursor-pointer">
                    <EditEssayModal essays={props.essays} setEssays={props.setEssays} oldEssayId={props.id} isOpen={isEditOpen} onOpen={onEditOpen} onClose={onEditClose} />
                    <DeleteEssayModal essays={props.essays} setEssays={props.setEssays} essayId={props.id} essay={'"' + props.name + '"'} isOpen={isDeleteOpen} onOpen={onDeleteOpen} onClose={onDeleteClose} />

                    <h3 className="text-center text-xl">{props.name}</h3>
                </div>
            </Link>
        </div>
    )
}

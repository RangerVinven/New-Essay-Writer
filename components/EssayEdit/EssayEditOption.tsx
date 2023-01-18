import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
    title: string
}

export default function EssayEditOption(props: Props) {
    return (
        <div>
            <Button colorScheme="green">{props.title}</Button>
        </div>
    )
}

import { AddIcon } from '@chakra-ui/icons';
import { Input, Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Sentence } from '../../lib/Types';

type Props = {
    sentence: Sentence
}

export default function SentencePopover(props: Props) {

    const [newSentence, setNewSentence] = useState("");

    return (
        <Popover placement='top' isLazy>
            <PopoverTrigger>
                <h3 className="mb-10 hover:cursor-pointer">{props.sentence.Sentence}</h3>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>
                    <h3 className="text-left">Edit your sentence</h3>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                    <InputGroup size='sm'>
                        <Input
                            placeholder='Your new sentence'
                            onChange={(event) => setNewSentence(event.target.value)}
                        />
                        <InputRightElement>
                            <IconButton aria-label='Add your new sentence' className="ml-3" icon={<AddIcon />} />
                        </InputRightElement>
                        </InputGroup>
                </PopoverBody>
            </PopoverContent>
    </Popover>
  )
}

import { AddIcon } from '@chakra-ui/icons';
import { Input, Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, InputGroup, InputRightElement, IconButton, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AlternativeSentence, Sentence } from '../../lib/Types';
import LoadingSpinner from '../General/LoadingSpinner';

type Props = {
    sentence: Sentence
}

async function getAlternativeSentences(sentenceId: number, setAlternativeSentencesLoading: Function, setAlternativeSentences: Function) {
    fetch("http://localhost:3000/api/AlternativeSentence/GetAlternativeSentences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sentenceId: sentenceId
        })
    }).then(res => res.json()).then(res => {
        setAlternativeSentencesLoading(false);
        setAlternativeSentences(res.sentences);
    })
}

export default function SentencePopover(props: Props) {

    const [newSentence, setNewSentence] = useState("");

    const [selectedSentence, setSelectedSentence] = useState("1");
    const [alternativeSentences, setAlternativeSentences] = useState<AlternativeSentence[]>([]);

    const [alternativeSentencesLoading, setAlternativeSentencesLoading] = useState(false);

    return (
        <Popover placement='top' isLazy>
            <PopoverTrigger>
                <h3 onClick={() => {
                    getAlternativeSentences(props.sentence.id, setAlternativeSentencesLoading, setAlternativeSentences);
                }} className="mb-10 hover:cursor-pointer">{props.sentence.Sentence}</h3>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>
                    <h3 className="text-left">Edit your sentence</h3>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                    {
                        alternativeSentencesLoading ? <LoadingSpinner /> : <RadioGroup colorScheme="green" onChange={setSelectedSentence} value={selectedSentence}>
                        <Stack direction='column'>
                            {
                                alternativeSentences.map(sentence => {
                                    return <Radio value={sentence.id.toString()}>
                                        <h3 className="text-left">
                                            { sentence.Sentence }
                                        </h3>
                                    </Radio>
                                })
                            }
                        </Stack>
                      </RadioGroup>
                    }

                    <InputGroup className="mt-4" size='sm'>
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

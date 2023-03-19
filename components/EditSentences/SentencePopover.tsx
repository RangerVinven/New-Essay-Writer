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

async function updateAlternativeSentence(alternativeSentence: AlternativeSentence, sentence: Sentence) {

    // Sets the new selectedSentence
    // setSelectedSentence(alternativeSentence.id.toString());

    // Updates the sentence to be the selected sentence
    fetch("http://localhost:3000", {
        method: "UPDATE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            alternativeId: alternativeSentence.id,
            sentenceId: sentence.id,
            alternativeSentence: alternativeSentence.Sentence,
            sentence: sentence.Sentence
        })
    })
}

export default function SentencePopover(props: Props) {

    const [newSentence, setNewSentence] = useState("");

    const [selectedSentence, setSelectedSentence] = useState(props.sentence.id.toString());
    const [alternativeSentences, setAlternativeSentences] = useState<AlternativeSentence[]>([]);

    const [alternativeSentencesLoading, setAlternativeSentencesLoading] = useState(false);

    useEffect(() => {
        console.log(selectedSentence)
    }, [selectedSentence]);

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
                        // alternativeSentencesLoading ?
                        // <LoadingSpinner />
                        // : <RadioGroup colorScheme="green" onChange={setSelectedSentence} value={props.sentence.Sentence.toString()}>
                        //     <Stack direction='column'>
                        //         <Radio value={props.sentence.Sentence.toString()}>
                        //             <h3 className="text-left">
                        //                 { props.sentence.Sentence }
                        //             </h3>
                        //         </Radio>

                        //         {
                        //             alternativeSentences.map(alternativeSentence => {
                        //                 return (
                        //                     <Radio
                        //                     key={alternativeSentence.id}
                        //                     // onClick={() => updateAlternativeSentence(alternativeSentence, props.sentence)}
                        //                     value={alternativeSentence.Sentence.toString()}
                        //                     // isChecked={sentence.Sentence === selectedSentence}
                        //                     >

                        //                         <h3 className="text-left">
                        //                             { alternativeSentence.Sentence }
                        //                         </h3>

                        //                     </Radio>
                        //                 )
                        //             })
                        //         }
                        //     </Stack>
                        // </RadioGroup>

                        alternativeSentencesLoading ? <LoadingSpinner /> : <RadioGroup onChange={setSelectedSentence} defaultValue={props.sentence.id.toString()}>
                            <Radio value={props.sentence.id.toString()}>
                                <h3> {props.sentence.Sentence} </h3>
                            </Radio>

                            {
                                alternativeSentences.map((sentence: AlternativeSentence) => {
                                    return (
                                        <Radio value={sentence.id.toString()}>
                                            <h3> {sentence.Sentence} </h3>
                                        </Radio>
                                    )
                                })
                            }
                        </RadioGroup>
                    }

                    <InputGroup className="mt-4" size='sm'>
                        <Input
                            placeholder='Your new sentence'
                            onChange={(event) => setNewSentence(event.target.value)}
                        />
                        <InputRightElement>
                            <IconButton onClick={async () => {
                                fetch("http://localhost:3000/api/AlternativeSentence/MakeAlternativeSentence", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        newSentence: newSentence,
                                        paragraph: props.sentence.Paragraph,
                                        sentenceId: props.sentence.id
                                    })
                                }).then(response => response.json()).then(response => {
                                    setAlternativeSentences([...alternativeSentences, response.sentence]);
                                })

                            }} aria-label='Add your new sentence' className="ml-3" icon={<AddIcon />} />
                        </InputRightElement>
                    </InputGroup>
                </PopoverBody>
            </PopoverContent>
    </Popover>
  )
}

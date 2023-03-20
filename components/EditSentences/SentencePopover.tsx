import { AddIcon } from '@chakra-ui/icons';
import { Input, Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, InputGroup, InputRightElement, IconButton, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AlternativeSentence, Sentence } from '../../lib/Types';
import LoadingSpinner from '../General/LoadingSpinner';

type Props = {
    sentence: Sentence
}

async function getAlternativeSentences(sentenceId: number, setAlternativeSentencesLoading: Function, setAlternativeSentences: Function, sentence: Sentence) {
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
        setAlternativeSentences([sentence, ...res.sentences]);
    })
}

async function updateAlternativeSentence(alternativeSentence: AlternativeSentence | Sentence, sentence: Sentence, setSentenceToDisplay: Function) {   

    // Updates the sentence to be the selected sentence
    fetch("http://localhost:3000/api/AlternativeSentence/SetAlternativeSentence", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "alternativeSentenceId": alternativeSentence.id,
            "sentenceId": sentence.id,
            "alternativeSentence": alternativeSentence.Sentence,
            "sentence": sentence.Sentence
        })
    });

    setSentenceToDisplay(alternativeSentence);
}

export default function SentencePopover(props: Props) {

    const [newSentence, setNewSentence] = useState("");

    const [sentenceToDisplay, setSentenceToDisplay] = useState(props.sentence);

    const [selectedSentence, setSelectedSentence] = useState(props.sentence.id.toString());
    const [alternativeSentences, setAlternativeSentences] = useState<object[]>([]);

    const [alternativeSentencesLoading, setAlternativeSentencesLoading] = useState(false);

    return (
        <Popover placement='top' isLazy>
            <PopoverTrigger>
                <h3 onClick={() => {
                    getAlternativeSentences(sentenceToDisplay.id, setAlternativeSentencesLoading, setAlternativeSentences, props.sentence);
                }} className="mb-10 hover:cursor-pointer">{sentenceToDisplay.Sentence}</h3>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>
                    <h3 className="text-left">Edit your sentence</h3>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                    {
                        alternativeSentencesLoading ? <LoadingSpinner /> : <RadioGroup onChange={setSelectedSentence} defaultValue={props.sentence.id.toString()}>
                            {/* <div>
                                <Radio onClick={() => updateAlternativeSentence(props.sentence, sentenceToDisplay, setSentenceToDisplay)} value={props.sentence.id.toString()}>
                                    <h3> {props.sentence.Sentence} </h3>
                                </Radio>
                            </div> */}

                            {
                                alternativeSentences.map((sentence: any) => {
                                    return (
                                        <div onClick={() => updateAlternativeSentence(sentence, sentenceToDisplay, setSentenceToDisplay)}>
                                            <Radio value={sentence.id.toString()} key={sentence.id}>
                                                <h3> {sentence.Sentence} </h3>
                                            </Radio>
                                        </div>
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

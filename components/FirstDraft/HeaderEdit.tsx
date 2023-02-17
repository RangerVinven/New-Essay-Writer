import { Button, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Header } from '../../lib/Types'
import LoadingSpinner from '../General/LoadingSpinner'

type Props = {
    essayId: number,
    header: Header
}

function saveParagraphs(paragraphs: string, headerId: number, essayId: number) {
    const paragraphsArray = paragraphs.split("\n\n");    
    
    fetch("http://localhost:3000/api/Paragraph/MakeParagraphs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Paragraphs": paragraphsArray,
            "EssayId": essayId,
            "HeaderId": headerId
        })
    });
}

async function getSentences(headerId: number, setParagraphs: Function) {
    const response = await fetch("http://localhost:3000/api/Sentences/GetSentences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            HeaderId: headerId
        })
    }).then(res => res.json()).then(sentences => {

        let paragraphs = ""
        
        if(sentences.Sentences.length !== 0) {
            let currentParagraph = sentences.Sentences[0].Paragraph;
            
            for (let i = 0; i < sentences.Sentences.length; i++) {

                // Creates a newline if it's a new paragraph
                if(currentParagraph !== sentences.Sentences[i].Paragraph) {
                    paragraphs = paragraphs + "\n\n";
                    currentParagraph = sentences.Sentences[i].Paragraph;
                }

                paragraphs = paragraphs + sentences.Sentences[i].Sentence + " ";
            }
        }

        setParagraphs(paragraphs);
    })
}

export default function HeaderEdit(props: Props) {

    const [paragraphs, setParagraphs] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSentences(props.header.id, setParagraphs);
        setLoading(false);
    }, []);


    return (

        <div>
            {
                loading ? <LoadingSpinner /> : 
                
                <div className="w-full text-left mb-1">
                    <h1 className="text-xl">{ props.header.Name }</h1>
                    <Textarea value={paragraphs} minHeight="sm" onChange={(event) => {
                        setParagraphs(event.target.value);

                        // Autosaves the paragraphs after each sentence                        
                        if([".", "?", "!"].includes(event.target.value.slice(-1))) {
                            saveParagraphs(event.target.value, props.header.id, props.essayId);
                        }
                    }} />
        
                    <div className="mt-2 flex justify-end">
                        <Button colorScheme="green" onClick={() => saveParagraphs(paragraphs, props.header.id, props.essayId)}>Save</Button>
                    </div>
                </div>
            }
        </div>
    )
}

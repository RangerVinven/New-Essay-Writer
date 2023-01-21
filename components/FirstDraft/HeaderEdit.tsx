import { Button, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Header } from '../../lib/Types'

type Props = {
    header: Header
}

function saveParagraphs(paragraphs: string) {
    const paragraphsArray = paragraphs.split("\n\n");
    
    fetch("http://localhost:3000/api/Paragraph/MakeParagraphs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Paragraphs": paragraphsArray
        })
    }).then(res => res.json()).then(res => {
        console.log(res);
        
    })
    
}

export default function HeaderEdit(props: Props) {

    // For splitting the paragraphs into sentences
    const segmenter = new Intl.Segmenter("en", {
        granularity: "grapheme"
    })
    const [paragraphs, setParagraphs] = useState("");

    return (
        <div className="w-full text-left mb-1">
            <h1 className="text-xl">{ props.header.Name }</h1>
            <Textarea minHeight="sm" onChange={(event) => setParagraphs(event.target.value)} />

            <div className="mt-2 flex justify-end">
                <Button colorScheme="green" onClick={() => saveParagraphs(paragraphs)}>Save</Button>
            </div>
        </div>
    )
}

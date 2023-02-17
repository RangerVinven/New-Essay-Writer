import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../General/LoadingSpinner';
import { Header } from '../../lib/Types';
import { Sentence } from '../../lib/Types';

type Props = {
    essayId: number
}

async function getSentences(headerId: number, setSentences: Function, setLoadingSentences: Function) {
    await fetch("http://localhost:3000/api/Sentences/GetSentences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                HeaderId: headerId
            })
        }).then(res => res.json()).then(res => {            
            setSentences(res.Sentences);
            setLoadingSentences(false)                       
        })
}

export default function EditSentences(props: Props) {

    const [headings, setHeadings] = useState([]);
    const [sentences, setSentences] = useState([]);

    // The number is for the order in the essay, not the header id
    const [selectedHeader, setSelectedHeader] = useState(1);

    const [loadingHeaders, setLoadingHeaders] = useState(true);
    const [loadingSentences, setLoadingSentences] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/Headings/GetHeadings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                essayId: props.essayId
            })
        }).then(res => res.json()).then(res => {
            setLoadingHeaders(false);
            setHeadings(res.headings);
            
            getSentences(res.headings[0].id, setSentences, setLoadingSentences);
        })
    }, [])

    return (
        <div className="h-full w-full">
            {
                loadingHeaders ? <LoadingSpinner /> : <div className="w-full flex">
                    <div className="w-1/4">
                        {
                            headings.map((heading: Header) => {
                                console.log(heading);
                                
                                let styling = "mb-5 text-lg text-left hover:cursor-pointer";

                                // Makes the selected header's font bold
                                if (heading.Order_In_Essay === selectedHeader) {
                                    styling = styling + " font-bold";
                                } else {
                                    styling = styling + " font-medium";
                                }

                                return <h3 onClick={() => {
                                    setLoadingSentences(true);
                                    getSentences(heading.id, setSentences, setLoadingSentences);

                                    setSelectedHeader(heading.Order_In_Essay);
                                }} className={styling}>{heading.Name}</h3>
                            })   
                        }
                    </div>

                    <div className="w-1/2">
                        <div className="bg-gray-50 margin-4 rounded-md">
                            {
                                loadingSentences ? <LoadingSpinner /> : <div>
                                    {
                                        sentences.map((sentence: Sentence) => {
                                            return <h3 className="mb-5 hover:cursor-pointer">{sentence.Sentence}</h3>
                                        }) 
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <div className="w-1/4"></div>
                </div>
            }
        </div>
    )
}

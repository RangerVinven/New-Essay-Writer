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
                                return <h3 className="mb-5 text-lg font-medium text-left hover:cursor-pointer">{heading.Name}</h3>
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

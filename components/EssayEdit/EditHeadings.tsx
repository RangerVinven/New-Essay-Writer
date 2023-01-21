import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../General/LoadingSpinner';
import Heading from './Heading';

type Props = {
    essayId: number
}

type Header = {
    id: number,
    Name: string,
    Essay: number,
    Order_In_Essay: number
}

function addHeader(newHeader: string, essayId: number, orderInEssay: number, setNewHeaderLoading: Function, setNewHeader: Function, headings: Object[], setHeadings: Function) {
    setNewHeaderLoading(true);

    fetch("http://localhost:3000/api/Headings/AddHeading", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            essayId: essayId,
            headerName: newHeader,
            orderInEssay: orderInEssay
        })
    }).then(data => data.json()).then((res) => {
        setNewHeaderLoading(false);
        setHeadings([...headings, res.header])
        
    })
}

export default function EditHeadings(props: Props) {

    const [headings, setHeadings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newHeader, setNewHeader] = useState<string>("");
    const [newHeaderLoading, setNewHeaderLoading] = useState(false); // For the loading icon when a header gets added

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
            setLoading(false);
            setHeadings(res.headings); 
            setNewHeader("");
        })
    }, []);

    return (
        <div className="flex justify-center items-center w-1/3">
            {
                loading ? <LoadingSpinner /> : <div className="bg-gray-50 rounded-md w-full">
                    {
                        headings.map((heading: Header) => {
                            return <Heading headings={headings} setHeadings={setHeadings} header={heading} />
                        })
                    }
                    <div className="mt-5">
                        <InputGroup>
                            <Input value={newHeader} onChange={(event) => {
                                setNewHeader(event.target.value);
                            }} type="text" placeholder="New header..." />
                            <InputRightElement className="none" onClick={() => addHeader(newHeader, props.essayId, headings.length+1, setNewHeaderLoading, setNewHeader, headings, setHeadings)} children={
                                newHeaderLoading ? <IconButton isLoading icon={<AddIcon />} aria-label={"Add header loading"} /> : <IconButton icon={<AddIcon />} aria-label={"Add header loading"} />
                            } aria-label={"Add header"} />
                        </InputGroup>
                    </div>
                </div>
            }
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Header } from '../../lib/Types';
import LoadingSpinner from '../General/LoadingSpinner';

type Props = {
    essayId: number
}

export default function FirstDraft(props: Props) {

    const [headings, setHeadings] = useState<Header[]>([]);
    const [loading, setLoading] = useState(true);

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
        })
    }, []);

    return (
        <div className="h-screen">
            {
                loading ? <LoadingSpinner /> : <div className="bg-gray-50 rounded-md w-full">
                    {
                        headings.map(heading => {
                            return <div>
                                <h1>{ heading.Name }</h1>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}

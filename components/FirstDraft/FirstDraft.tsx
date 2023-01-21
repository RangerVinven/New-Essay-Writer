import React, { useEffect, useState } from 'react'
import { Header } from '../../lib/Types';
import LoadingSpinner from '../General/LoadingSpinner';
import HeaderEdit from './HeaderEdit';

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
        <div className="h-screen  w-full">
            {
                loading ? <LoadingSpinner /> : <div className="bg-gray-50 rounded-md w-1/2 p-5">
                    {
                        headings.map(header => {
                            return <HeaderEdit header={header} />
                        })
                    }
                </div>
            }
        </div>
    )
}

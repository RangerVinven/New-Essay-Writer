import React from "react"

type Props = {
    name: string
}

export default function EssayTile(props: Props) {
    return (
        <div className="h-64 w-64 mb-11 rounded-md bg-gray-400 flex justify-center items-center p-2 hover:cursor-pointer">
            <h3 className="text-center text-xl">{props.name}</h3>
        </div>
    )
}

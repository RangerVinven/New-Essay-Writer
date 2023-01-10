import React from "react"

type Props = {
    name: string
}

export default function EssayTile(props: Props) {
    return (
        <div className="h-36 w-36 rounded-md bg-gray-400">
            <h3>{props.name}</h3>
        </div>
    )
}

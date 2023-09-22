import React from 'react'
import ContentPart from './ContentPart'

export default function Content({ contentItems }) {
    return (
        <>
        {
            contentItems.map(item => (
                <ContentPart
                    key={item.id}
                    title={item.name}
                    total={item.exercises}
                />
            ))
        }
        </>
    )
}

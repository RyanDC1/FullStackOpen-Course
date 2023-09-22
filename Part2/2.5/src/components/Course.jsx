import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

export default function Course({ name, parts, total = 0 }) {

    return (
        <>
            <Header title={name} />
            <Content contentItems={parts} />
            <Total total={total} />
        </>
    )
}
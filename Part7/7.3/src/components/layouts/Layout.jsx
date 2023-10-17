import React from 'react'

export default function Layout({ children, header, footer }) {
    return (
        <>
            <header>
                {header}
            </header>
            <div>
                {children}
            </div>
            <footer>
                {footer}
            </footer>
        </>
    )
}

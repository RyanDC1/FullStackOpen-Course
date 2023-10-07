import React, { useEffect, useState } from 'react'
import Login from '../auth/Login'
import { clearUserSession, getUserSession, initUserSession, updateUserSession } from '../auth/session'

export default function AuthSession({ children }) {

    const [user, setUser] = useState()

    useEffect(() => {
        const user = getUserSession()
        if(user)
        {
            initUserSession()
            setUser(user)
        }
    }, [])


    return (
        user ?
            <>
                <div>
                    <span>{user.name} Logged in  <button id='logout-btn' onClick={onLogout}>Logout</button></span>
                </div>
                {children}
            </>
            :
            <Login
                onLogin={(user) => setUser(user)}
            />
    )

    function onLogout() {
        setUser(undefined)
        clearUserSession()
    }
}

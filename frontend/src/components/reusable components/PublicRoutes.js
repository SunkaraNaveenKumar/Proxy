import React from 'react'
import useAuth from '../custom hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
const PublicRoutes = () => {
    const { isLoggedIn } = useAuth()

    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default PublicRoutes
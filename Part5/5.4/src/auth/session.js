import BlogService from "../services/BlogService";
import jwt_decode from "jwt-decode";

export function initUserSession () {
    const token = localStorage.getItem('token')
    if(token) {
        updateUserSession(token)
    }
}

export function updateUserSession (token) {
    if(token)
    {
        BlogService.setToken(token)
        localStorage.setItem('token', token)
    }
    else {
        console.error("Invalid token supplied")
    }
}

export function getUserSession () {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : undefined
}

export function clearUserSession () {
    BlogService.setToken(null)
    localStorage.removeItem('token')
}
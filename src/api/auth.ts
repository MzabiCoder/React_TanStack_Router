import { api } from "@/lib/axios";
import { type Password } from "../types"

export const registerUser = async ({ name, email, password }: Password) => {
    try {
        const res = await api.post('/auth/register', {
            name, email, password
        })
        return res.data
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to register';
        throw new Error(message)
    }
}

export const loginUser = async (credentials: { email: string, password: string }) => {
    try {
        const res = await api.post('/auth/login', {
            credentials
        })
        return res.data
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to login';
        throw new Error(message)
    }
}

export const logoutnUser = async () => {
    try {
        await api.post('/auth/logout')
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to login';
        throw new Error(message)
    }
}


export const refreshAccessToken = async () => {
    try {
        const res = await api.post('/auth/refresh');
        return res.data
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to login';
        throw new Error(message)
    }
}
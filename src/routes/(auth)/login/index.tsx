import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';


export const Route = createFileRoute('/(auth)/login/')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');



    const { mutateAsync, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: data => {
            setAccessToken(data.accessToken);
            setUser(data.user);
            navigate({ to: '/ideas' })
        },
        onError: (err: any) => {
            setError(err.message)
        }
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            mutateAsync({ email, password })
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return <div className='max-w-md mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Login</h1>
        {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                {error}
            </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" autoComplete='off' className="w-full border border-gray rounded-md p-2" placeholder='Email' />
            <input onChange={e => setPassword(e.target.value)} value={password} type="text" autoComplete='off' className="w-full border border-gray rounded-md p-2" placeholder='Password' />
            <button disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50">{isPending ? 'Login....' : "Login"}</button>
        </form>
        <p className="text-sm text-center mt-4">Dont Have an account ? {' '} <Link className='text-blue-600 hover:underline font-medium' to="/register">Register</Link> </p>
    </div>
}

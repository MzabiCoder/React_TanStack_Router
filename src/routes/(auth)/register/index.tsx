import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';


export const Route = createFileRoute('/(auth)/register/')({
    component: RegisterPage,
})

function RegisterPage() {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');



    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: data => {
            setAccessToken(data.accessToken);
            setUser(data.user);
            navigate({ to: '/ideas' })
        },
        onError: (err: any) => {
            setError(err.message)
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await mutateAsync({ name, email, password })
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return <div className='max-w-md mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Register</h1>
        {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                {error}
            </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input onChange={e => setName(e.target.value)} value={name} type="text" autoComplete='off' className="w-full border border-gray rounded-md p-2" placeholder='Name' />
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" autoComplete='off' className="w-full border border-gray rounded-md p-2" placeholder='Email' />
            <input onChange={e => setPassword(e.target.value)} value={password} type="text" autoComplete='off' className="w-full border border-gray rounded-md p-2" placeholder='Password' />
            <button disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50">{isPending ? 'Register....' : "Register"}</button>
        </form>
        <p className="text-sm text-center mt-4">Already Have an account ? {' '} <Link className='text-blue-600 hover:underline font-medium' to="/login">Login</Link> </p>
    </div>
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { QueryClient, queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { type Idea } from '@/types';
import { api } from '@/lib/axios';


const fetchIdeas = async (): Promise<Idea[]> => {
    try {
        const res = await api('/ideas');
        return res.data
    } catch (error) {
        throw new Error(`Failed to fetch ideas....${error}`)
    }
}

const ideasQueryOptions = () => queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchIdeas()
})


export const Route = createFileRoute('/ideas/')({
    head: () => ({
        meta: [
            {
                title: 'Browse Idea'
            }
        ]
    }),
    component: IdeasPage,
    loader: async ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideasQueryOptions())
    }
})

function IdeasPage() {
    const { data: ideas } = useSuspenseQuery(ideasQueryOptions());
    console.log(ideas)
    return <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
        <ul className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
            {ideas.map(idea => (
                <li key={idea.id} className='p-4 border border-gray-300 rounded shadow bg-white flex flex-col justify-between'>
                    <h2 className='text-lg font-semibold'>{idea.title}</h2>
                    <p className='text-gray-700 mt-2'>{idea.summary}</p>
                    <Link to="/ideas/$ideaId" params={{ ideaId: idea.id.toString() }} className='text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 transition rounded hover:bg-blue-700 '>View Idea</Link>
                </li>
            ))}
        </ul>
    </div>
}

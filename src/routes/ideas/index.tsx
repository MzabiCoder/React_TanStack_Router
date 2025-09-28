import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/api/ideas';
import IdeaCard from '@/components/IdeadCard';

const ideasQueryOptions = () => queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchIdeas(),
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
    const { data } = useSuspenseQuery(ideasQueryOptions());
    const ideas = [...data].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
            {ideas.map(idea => (
                <IdeaCard key={idea._id} idea={idea} />
            ))}
        </div>
    </div>
}

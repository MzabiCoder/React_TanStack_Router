import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { type Idea } from '@/types';
import { api } from '@/lib/axios';

const fetchidea = async (ideaID: string): Promise<Idea> => {
    const res = await api(`/ideas/${ideaID}`);
    return res.data
};


const ideaQueryOptions = (ideaId: string) => {
    return queryOptions({
        queryKey: ['idea', ideaId],
        queryFn: () => fetchidea(ideaId)
    })
}
export const Route = createFileRoute('/ideas/$ideaId/')({
    component: IdeaDetails,
    loader: async ({ params, context: { queryClient } }) => queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
})

function IdeaDetails() {
    const { ideaId } = Route.useParams()
    const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))

    return <div className='p-4'>
        <Link to="/ideas" className='text-blue-500 underline block mb-4'>
            Back To Ideas
        </Link>
        <h2 className='text-2xl font-bold'>{idea.title}</h2>
        <p className='mt-2'>{idea.description}</p>
    </div>
}

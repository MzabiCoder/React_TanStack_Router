import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { fetchIdea } from '@/api/ideas';
import { deleteIdea } from '@/api/ideas';
import { useAuth } from '@/context/AuthContext';


const ideaQueryOptions = (ideaId: string) => {
    return queryOptions({
        queryKey: ['idea', ideaId],
        queryFn: () => fetchIdea(ideaId)
    })
}
export const Route = createFileRoute('/ideas/$ideaId/')({
    component: IdeaDetails,
    loader: async ({ params, context: { queryClient } }) => queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
})

function IdeaDetails() {
    const { user } = useAuth()
    const { ideaId } = Route.useParams()
    const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

    const navigate = useNavigate();

    const { mutateAsync: deleteMutate, isPending } = useMutation({
        mutationFn: () => deleteIdea(ideaId),
        onSuccess: () => {
            navigate({ to: '/ideas' })
        }
    })

    const handleDlete = async () => {
        if (window.confirm('Are you sure !!!')) {
            await deleteMutate()
        }
    }

    return <div className='p-4'>
        <Link to="/ideas" className='text-blue-500 underline block mb-4'>
            Back To Ideas
        </Link>
        <h2 className='text-2xl font-bold'>{idea.title}</h2>
        <p className='mt-2'>{idea.description}</p>
        {user && (
            <>
                <Link to="/ideas/$ideaId/edit" params={{ ideaId: idea._id }} className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'>
                    {isPending ? 'Editing,,,,' : 'Edit'}
                </Link>
                <button onClick={handleDlete} disabled={isPending} className='disabled:opacity-50 hover:bg-red-700 text-sm bg-red-600 text-white mt-4 px-4 py-2 rounded transition'>
                    {isPending ? 'Deleting,,,,' : 'Delete'}
                </button>
            </>
        )}

    </div>
}

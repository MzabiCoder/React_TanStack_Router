import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useMutation, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { fetchIdea, editIdea } from '@/api/ideas'



const ideaQueryOptions = (id: string) => queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id)
})



export const Route = createFileRoute('/ideas/$ideaId/edit')({
    component: IdeaEditpage,
    loader: async ({ params, context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
    }
})



function IdeaEditpage() {
    const { ideaId } = Route.useParams();
    const navigate = useNavigate();
    const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

    const [title, setTitle] = useState(idea.title)
    const [summary, setSummary] = useState(idea.summary)
    const [description, setDescription] = useState(idea.description)
    const [tagsInout, settagsInout] = useState(idea.tags.join(','))



    const { mutateAsync, isPending } = useMutation({
        mutationFn: () =>
            editIdea(ideaId, {
                title,
                summary,
                description,
                tags: tagsInout.split(',').map((t: string) => t.trim()).filter(Boolean)
            }),
        onSuccess: () => {
            navigate({ to: '/ideas/$ideaId', params: { ideaId } })
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await mutateAsync()
    }
    return (
        <div className='space-y-6'>
            <div className="flex justify-between items-center">
                <h1 className='text-2xl font-bold'>Edit Idea</h1>
                <Link className='text-sm text-blue-600 hover:underline' to="/ideas/$ideaId" params={{ ideaId }} >back to Ideas</Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className='block text-gray-700 font-medium mb-1'>Title</label>
                    <input placeholder="enter a title" className='border w-full border-gray-300 rounded-md p-2 focus:outline-non focus:ring-blue-500' type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="summary" className='block text-gray-700 font-medium mb-1'>Summary</label>
                    <input placeholder="enter a title" className='border w-full border-gray-300 rounded-md p-2 focus:outline-non focus:ring-blue-500' type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description" className='block text-gray-700 font-medium mb-1'>Description</label>
                    <textarea rows={6} placeholder="enter a title" className=' border w-full border-gray-300 rounded-md p-2 focus:outline-non focus:ring-blue-500' id="body" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="tags" className='block text-gray-700 font-medium mb-1'>Tags</label>
                    <input placeholder="enter a title" className='w-full border border-gray-300 rounded-md p-2 focus:outline-non focus:ring-blue-500' type="text" id="tags" value={tagsInout} onChange={e => settagsInout(e.target.value)} />
                </div>
                <div className='mt-5'>

                    <button disabled={isPending} className='block w-full bg-blue-600 hover:bg-blue-700 text0white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isPending ? 'Updating...' : 'Update Idea'}
                    </button>
                </div>
            </form>
        </div>
    )
}

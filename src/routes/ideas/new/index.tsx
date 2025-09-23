import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { createIdea } from '@/api/ideas';
import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})


function NewIdeaPage() {

  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [summary, setSummary] = useState('')
  const [tags, setTags] = useState('');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({ to: '/ideas' })
    }
  })

  const handleSUmbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert('Please fill all fields!!');
      return;
    };

    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      })
    } catch (error) {
      //throw new Error(`failed to make a post request....${error}`);
      alert(`something ${error} went wrong`)
    }
  }
  return <div className='space-y-6'>
    <h1 className='text-3xl font-bold mb-6'>Create new idea</h1>
    <form onSubmit={handleSUmbit} className="space-y-4">
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
        <input placeholder="enter a title" className='w-full border border-gray-300 rounded-md p-2 focus:outline-non focus:ring-blue-500' type="text" id="tags" value={tags} onChange={e => setTags(e.target.value)} />
      </div>
      <div className='mt-5'>

        <button disabled={isPending} className='block w-full bg-blue-600 hover:bg-blue-700 text0white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'>
          {isPending ? 'Creating...' : 'Create Idea'}
        </button>
      </div>
    </form>
  </div>
}

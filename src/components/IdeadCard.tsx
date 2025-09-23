import type { Idea } from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from 'clsx'

const IdeaCard = ({ idea, button = true }: { idea: Idea, button?: boolean }) => {
    const Style = clsx({
        'text-blue-600 hover:undeline mt-3': !button,
        'text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 transition rounded hover:bg-blue-700': button
    })
    return <div key={idea.id} className='p-4 border border-gray-300 rounded shadow bg-white flex flex-col justify-between'>
        <h2 className='text-lg font-semibold'>{idea.title}</h2>
        <p className='text-gray-700 mt-2'>{idea.summary}</p>
        <Link to={`/ideas/$ideaId`} params={{ ideaId: idea.id.toString() }} className={Style}>
            {button ? 'View Idea' : 'Read more'}
        </Link>
    </div>
}

export default IdeaCard;
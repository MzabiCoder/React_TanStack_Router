import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
  return <div>
    <h1>Hello new Idea</h1>
  </div>
}

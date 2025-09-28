export type Idea = {
    _id: string,
    title: string,
    summary: string,
    description: string,
    tags: string,
    createdAt: string,

}

export interface Password {
    name: string
    email: string
    password: string
} 
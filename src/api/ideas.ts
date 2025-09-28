import { type Idea } from "@/types";
import { api } from "@/lib/axios";


export const fetchIdeas = async (limit?: number): Promise<Idea[]> => {
    const res = await api('/ideas', {
        params: limit ? { _limit: limit } : {}
    });
    return res.data
}

export const fetchIdea = async (ideaID: string): Promise<Idea> => {
    const res = await api(`/ideas/${ideaID}`);
    return res.data
};


export const createIdea = async (newIdea: Idea): Promise<Idea> => {
    const res = await api.post('/ideas', {
        ...newIdea,
        createdAt: new Date().toISOString()
    });
    return res.data
}


export const deleteIdea = async (id: string): Promise<void> => {
    const res = await api.delete(`/ideas/${id}`);
    return res.data
}

export const editIdea = async (ideaId: string, updatedIdea: {
    title: string,
    summary: string,
    description: string,
    tags: string[]
}): Promise<Idea> => {
    const res = await api.put(`/ideas/${ideaId}`, updatedIdea);
    return res.data
}
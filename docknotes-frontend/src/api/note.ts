import type {CreateNote} from "../interfaces/createNote.interface";
import type {Note, NoteUpdate} from "../interfaces/notes.interface";

const API_URL = "http://localhost:3000";

export const getNotes = async () : Promise<Note[]> => {
    const res = await fetch(`${API_URL}/notes`);
    if (!res.ok) throw new Error("Erreur lors de la récupération des notes");
    return res.json()
};

export const createNote = async (note : CreateNote) : Promise<Note> => {
    const res = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    });
    if(!res.ok) throw new Error("Erreur lors de la création de la note");
    return res.json()
};

export const updateNote = async (id: number, note : NoteUpdate) : Promise<Note> => {
    const res = await fetch(`${API_URL}/notes/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    });
    if(!res.ok) throw new Error("Erreur lors de la modification de la note");
    return res.json()
};

export const deleteNote = async (id: number) : Promise<void> => {
    const res = await fetch(`${API_URL}/notes/${id}`, {
        method : "DELETE"
    });
    if(!res.ok) throw new Error("Erreur lors de la suppression de la note");
};
import { useState } from "react";
import type { Note } from "../interfaces/notes.interface"
import { X } from "lucide-react";

interface Props {
    note : Note
    onSubmit: (id: number, data: { title: string; content: string; category_id: number | null }) => void;
    onClose: () => void;
}

const EditNoteForm = ({note, onSubmit, onClose}: Props) => {

    const [title, setTitle] = useState(note.title || "");
    const [content, setContent] = useState(note.content || "");
    const [categoryId, setCategoryId] = useState<number | null>(note.category_id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        onSubmit(note.id, {
            title: title.trim(),
            content: content.trim(),
            category_id: categoryId,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 w-full max-w-md flex flex-col gap-5 shadow-xl"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: note.color || "#FFFFFF" }}
                        />
                        <h2 className="text-xl font-semibold">Modifier la note</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-black"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={50}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
                />

                <textarea
                    placeholder="Contenu de la note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={500}
                    rows={5}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none focus:border-gray-500"
                />

                <div className="flex gap-3 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={!title.trim() || !content.trim()}
                        className="px-4 py-2 rounded-lg text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: note.color || "#000" }}
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditNoteForm
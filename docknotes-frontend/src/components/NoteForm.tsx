import { useState } from "react";
import { X } from "lucide-react";
import type { CreateNote } from "../interfaces/createNote.interface";
import type { Category } from "../interfaces/category.interface";

interface Props {
    color : string;
    categories : Category[];
    onSubmit : (data: CreateNote) => void;
    onClose: () => void
}

const NoteForm = ({color, categories, onSubmit, onClose} : Props) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        if(!title.trim() || !content.trim()) return;
        onSubmit({
            title: title.trim(),
            content: content.trim(),
            color,
            category_id: categoryId
        })
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-md flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full" style={{backgroundColor: color}}/>
                        <h2 className="text-xl font-semibold">Nouvelle note</h2>
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

                <select 
                    value={categoryId ?? ""}
                    onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none focus:border-gray-500"
                >
                    <option value="">Sans catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

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
                        style={{ backgroundColor: color }}
                    >
                        Créer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NoteForm
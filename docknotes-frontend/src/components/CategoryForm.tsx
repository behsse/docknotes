import { useState } from 'react'
import { X } from "lucide-react";

interface Props {
    onSubmit : (data : {name : string; description? : string}) => void;
    onClose : () => void;
}

export const CategoryForm = ({onSubmit, onClose} : Props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim()) return;
        onSubmit({
            name : name.trim(),
            description: description.trim() || undefined
        })
    }

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <form onSubmit={handleSubmit} className='bg-white rounded-2xl p-8 w-full max-w-md flex flex-col gap-5 shadow-xl'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>Nouvelle catégorie</h2>
                    <button
                        type='button'
                        onClick={onClose}
                        className='cursor-pointer text-grey-500 hover:text-black'
                    >
                        <X className='w-5 h-5' />
                    </button>
                </div>
                <input 
                    type="text"
                    placeholder='Nom de la catégorie'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                    className='border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500' 
                />
                <input 
                    type="text"
                    placeholder='Description (optionnel)'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={255}
                    className='border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500' 
                />
                <div className='flex gap-3 justify-end'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100'
                    >
                        Annuler
                    </button>
                    <button
                        type='submit'
                        disabled={!name.trim()}
                        className='px-4 py-2 rounded-lg bg-black text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Créer
                    </button>
                </div>
            </form>
        </div>
    )
}

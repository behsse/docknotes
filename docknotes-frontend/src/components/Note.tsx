import { useEffect, useState } from "react"
import type { Note as NoteType} from "../interfaces/notes.interface"
import { Pencil, Save } from "lucide-react";

interface Props {
    note : NoteType
    onUpdate : (id: number, data : {content? : string}) => void;
    onEdit: (note: NoteType) => void;
}

export const Note = ({note, onUpdate, onEdit} : Props) => {

    const [content, setContent] = useState(note.content || "");
    const hasChanged = content !== (note.content || "")

    useEffect(() => {
        setContent(note.content || "");
    }, [note.content]);

    const formatDate = (date : string | null) => {
        if(!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

    return (
        <div className={`rounded-2xl p-5 flex flex-col h-70 gap-2`} style={{backgroundColor : note.color || "#fc03c6"}}>
            <div className="flex items-center justify-between">
                <p className="font-bold">{note.title}</p>
                <div className="flex gap-1">
                    {
                        hasChanged && (
                            <button
                                onClick={() => onUpdate(note.id, {content})}
                                className="cursor-pointer text-black/60"
                            >
                                <Save className="w-4 h-4"/>
                            </button>
                        )
                    }
                    <button
                        onClick={() => onEdit(note)}
                        className="cursor-pointer text-black/60 hover:text-black"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="This is a Docknotes note."
                className="flex-1 outline-none resize-none placeholder-black/80">
            </textarea>
            <p>{formatDate(note.date)}</p>
        </div>
    )
}

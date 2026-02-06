import { useEffect, useState } from "react"
import { Navbar } from "./components/Navbar"
import { NotesContainer } from "./components/NotesContainer"
import { SearchBar } from "./components/SearchBar"
import type { Note } from "./interfaces/notes.interface"
import type { CreateNote } from "./interfaces/createNote.interface"
import { createNote, getNotes, updateNote } from "./api/note"
import NoteForm from "./components/NoteForm"
import EditNoteForm from "./components/EditNoteForm"

function App() {
  
  const [notes, setNotes] = useState<Note[]>([])
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#fc03c6")
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data)
  };

  useEffect(() => {
    fetchNotes()
  }, []);

  const handleColorSelect = (color : string) => {
    setSelectedColor(color)
    setIsNoteFormOpen(true)
  }

  const handleCreateNote = async (data : CreateNote) =>{
    await createNote(data)
    setIsNoteFormOpen(false);
    await fetchNotes()
  }

  const handleUpdateNote = async (id : number, data: {title?: string; content?: string}) => {
    await updateNote(id, data);
    await fetchNotes();
  }

  const handleEditNote = async (id: number, data : {title : string, content: string, category_id: number | null}) => {
    await updateNote(id, {...data, date: new Date().toISOString()})
    setEditingNote(null)
    await fetchNotes()
  }

  return (
    <main className="h-screen flex overflow-hidden">
      <Navbar onColorSelect={handleColorSelect}/>
      <div className="flex-1 p-10 overflow-y-scroll">
        <div className="flex flex-col gap-30">
          <div className="flex justify-center">
            <SearchBar/>
          </div>
          <NotesContainer 
            notes={notes} 
            onUpdate={handleUpdateNote}
            onEdit={(note) => setEditingNote(note)}
          />
        </div>
      </div>
      {
        isNoteFormOpen && (
          <NoteForm
            color={selectedColor}
            onSubmit={handleCreateNote}
            onClose={() => setIsNoteFormOpen(false)}
            />
        )
      }
      {
        editingNote && (
          <EditNoteForm 
            note={editingNote}
            onSubmit={handleEditNote}
            onClose={() => setEditingNote(null)}
          />
        )
      }
    </main>
  )
}

export default App

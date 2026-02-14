import { useEffect, useState } from "react"
import { Navbar } from "./components/Navbar"
import { NotesContainer } from "./components/NotesContainer"
import { SearchBar } from "./components/SearchBar"
import type { Note } from "./interfaces/notes.interface"
import type { Category } from "./interfaces/category.interface"
import type { CreateNote } from "./interfaces/createNote.interface"
import { createNote, getNotes, updateNote, deleteNote } from "./api/note"
import NoteForm from "./components/NoteForm"
import EditNoteForm from "./components/EditNoteForm"
import { createCategory, getCategories } from "./api/category"
import { CategoryForm } from "./components/CategoryForm"
import { authClient } from "./lib/auth-client"
import { AuthPage } from "./components/AuthPage"
import { Routes, Route } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage"
import ContactPage from "./pages/ContactPage"
import { GalleryPage } from "./pages/GalleryPage"

function App() {
  
  const { data: session, isPending } = authClient.useSession()
  const [notes, setNotes] = useState<Note[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false)
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#fc03c6")
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    if(session){
      fetchNotes()
      fetchCategories()
    }
  }, [session]);

  const handleColorSelect = (color : string) => {
    setSelectedColor(color)
    setIsNoteFormOpen(true)
  }

  const handleCreateNote = async (data : CreateNote) =>{
    await createNote(data)
    setIsNoteFormOpen(false);
    await fetchNotes()
  }

  const handleCreateCategory = async (data : {name: string, description? : string}) => {
    await createCategory(data);
    setIsCategoryFormOpen(false);
    await fetchCategories();
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

  const handleDeleteNote = async (id : number) => {
    await deleteNote(id)
    await fetchNotes()
  }

  const handleSignOut = async () => {
    await authClient.signOut()
    setNotes([])
    setCategories([])
  }

  if (!session) {
  return <AuthPage onAuth={() => {}} />
}

  return (
    <main className="h-screen flex overflow-hidden">
      <Navbar onColorSelect={handleColorSelect} onOpenCategoryForm={() => setIsCategoryFormOpen(true)} userName={session.user.name} userImage={session.user.image} userId={session.user.id}/>
      <Routes>
        <Route 
          path="/"
          element={
          <div className="flex-1 p-10 overflow-y-scroll">
            <div className="flex flex-col gap-30">
              <div className="flex justify-center">
                <SearchBar/>
              </div>
              <NotesContainer 
                notes={notes} 
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
                onEdit={(note) => setEditingNote(note)}
                />
            </div>
          </div>
          }
        />
        <Route
          path="/profile/:slug"
          element={<ProfilePage onSignOut={handleSignOut} />}
        >
          <Route path="gallery" element={<GalleryPage />} />
        </Route>
        <Route
          path="/contact"
          element={
            <ContactPage />
          }
        />
      </Routes>  
      {
        isNoteFormOpen && (
          <NoteForm
            color={selectedColor}
            categories={categories}
            onSubmit={handleCreateNote}
            onClose={() => setIsNoteFormOpen(false)}
            />
        )
      }
      {
        editingNote && (
          <EditNoteForm 
            note={editingNote}
            categories={categories}
            onSubmit={handleEditNote}
            onClose={() => setEditingNote(null)}
          />
        )
      }
      {
        isCategoryFormOpen && (
          <CategoryForm 
            onSubmit={handleCreateCategory}
            onClose={() => setIsCategoryFormOpen(false)}
          />
        )
      }
    </main>
  )
}

export default App

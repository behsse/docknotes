import { FolderPlus } from "lucide-react";
interface Props {
    onColorSelect : (color : string) => void;
    onOpenCategoryForm : () => void;
}

export const Navbar = ({onColorSelect, onOpenCategoryForm} : Props) => {

    const colors = ["#3B82F6", "#F97316", "#EF4444", "#22C55E", "#A855F7"];
    
    return (
        <nav className="px-5 py-10 flex flex-col gap-20 border-r border-black h-full w-fit text-center">
            <h1 className="font-semibold text-lg">Docknotes</h1>
            <ul className="flex flex-col items-center gap-4">
                {
                 colors.map((color, index) => (
                    <li key={index}>
                        <button
                            className={`w-6 h-6 rounded-full cursor-pointer`}
                            style={{backgroundColor: color}}
                            onClick={() => onColorSelect(color)}
                        >
                        </button>
                    </li>
                 ))
                }
            </ul>
            <button
                onClick={onOpenCategoryForm}
                className="flex flex-col items-center gap-1 cursor-pointer text-black/60 hover:text-black"
            >   
                <FolderPlus className="w-4 h-4"/>
                <span className="text-xs">Catégorie</span>
            </button>
        </nav>
    )
}

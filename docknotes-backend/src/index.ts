import express, {Request, Response} from 'express';
import cors from "cors";
import categoriesRouter from "@/routes/categories.route";
import notesRouter from "@/routes/notes.route"
import db from '@/lib/db';

const app = express();
const port = 3000;

app.use(cors({origin : "http://localhost:5173"}))
app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.json({
        message : "Bienvenue sur l'API de Docknotes"
    });
});

app.use("/categories", categoriesRouter);
app.use("/notes", notesRouter);

// ========== DÉMARRAGE DU SERVEUR ==========
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try{
        await db.$connect();
        console.log("Databe connected successfull")
    } catch(error){
        console.log("Database connection failed:", error)
    }
});

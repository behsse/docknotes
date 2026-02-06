import express, { Request, Response } from "express";
import db from "@/lib/db";
import { Note } from "@/interfaces/notes.interface";

const router: express.Router = express.Router();

router.get("/", async (req : Request, res : Response) => {
    const {title} = req.query;

    if (title && typeof title === "string") {
      const data = await db.note.findMany({
        where : {
            content : {
                contains : title
            }
        },
        orderBy : { date : "desc"},
        include : {
            category : {
                select : {
                    name : true,
                    description : true
                }
            }
        }
      });
      return res.status(200).json(data);
    }
    const data = await db.note.findMany({
        orderBy : { date : "desc"},
        include : {
            category : {
                select : {
                    name : true,
                    description : true
                }
            }
        }
    })
    res.status(200).json(data)
});

// ========== GET /notes/:id - Récupérer UNE note par son identifiant ==========
router.get("/:id", async (req : Request, res : Response) => {
    try {
        const {id} = req.params
        
        const data = await db.note.findUnique({
            where : {id: Number(id)},
            include: {category : { select : {name : true, description : true}}}
        })

        if(!data){
            return res.status(404).json({message : "Note not found"});
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({message : "Error server", error});
    }
})

// ========== POST /notes - Créer une nouvelle note ==========
router.post("/", async (req : Request, res : Response) => {
    const {title, color, content, isFavorite, category_id} = req.body;

    if(!title || !content){
        return res.status(400).json({
            message : "Les champs title et content sont obligatoires"
        });
    };

    const newNote = await db.note.create({
        data : {
            title,
            color : color || "#fc03c6",
            content,
            date : new Date(),
            isFavorite : isFavorite || false,
            category_id : category_id || null
        }
    })

    res.status(201).json(newNote);
});

// ========== PUT /notes/:id - Remplacer entièrement une note ==========
router.put("/:id", async (req : Request, res : Response) => {
    const {id} = req.params;
    const {title, color, content, isFavorite, category_id} = req.body;

    if(!title || !content || !color){
        return res.status(400).json({
            message : "Les champs title et content sont obligatoires"
        });
    };

    const data = await db.note.update({
        where : {id : Number(id)},
        data : {
            title,
            color,
            content,
            isFavorite : isFavorite ?? false,
            category_id : category_id || null
        }
    });
    res.status(200).json(data);

});

// ========== PATCH /notes/:id - Modifier partiellement une note ==========
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, color, content, date, isFavorite, category_id } = req.body;

    const data : {
        title? : string;
        color? : string;
        content? : string;
        date? : Date;
        isFavorite? : boolean;
        category_id? : number | null
    } = {};

    if (title !== undefined){
        data.title = title
    }

    if (color !== undefined){
        data.color = color
    }

    if (content !== undefined){
        data.content = content
    }

    if (date !== undefined){
        data.date = new Date(date)
    }

    if (isFavorite !== undefined){
        data.isFavorite = isFavorite
    }

    if (category_id !== undefined){
        data.category_id = category_id
    }

    if (Object.keys(data).length === 0){
        return res.status(400).json({
            message : "Aucun champs à modifier"
        })
    }

    const note = await db.note.update({
        where : {id : Number(id)},
        data
    });
    res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// ========== DELETE /notes/:id - Supprimer une note ==========
router.delete("/:id", async (req : Request, res : Response) => {
    try{
        const {id} = req.params;

        await db.note.delete({
            where : {id : Number(id)}
        })
        res.status(204).json("Note supprimé avec succès");
    } catch(error){
        res.status(500).json({message : "Error server", error});
    }
})
export default router
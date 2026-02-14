import express, {Request, Response} from "express";
import {Resend} from "resend"

const router : express.Router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req : Request, res : Response) => {
    try {
        const {name, email, message} = req.body;

        if(!name?.trim() || !email?.trim() || !message?.trim()){
            return res.status(400).json({
                message : "Tous les champs sont requis"
            });
        };

        await resend.emails.send({
            from: "Mon site web <onboarding@resend.dev>",
            to : process.env.CONTACT_EMAIL!,
            subject : `Nouveau message de ${name}`,
            html : 
            `
            <h2>Nouveau message du formulaire de contact</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong> ${message}</p>
            `
        });
        res.status(200).json({message: "Message envoyé avec succès !!!!!"});
    } catch (error) {
        res.status(500).json({
            message : "Erreur lors de l'envoi du message"
        });
    };
});

export default router
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { sendContactMessage } from '../api/contact';

const ContactPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(false);

        try {
            await sendContactMessage({
                name : name.trim(),
                email : email.trim(),
                message : message.trim()
            });
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erreur lors de l'envoi du message");
        };

        setLoading(false);
    }

    return (
        <div className='h-screen flex items-center justify-center bg-zinc-100'>
            <form onSubmit={handleSubmit} className='bg-white rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5 shadow-lg'>
                <Link to="/" className='flex items-center gap-2 text-gray-400'>
                    <ArrowLeft size={16}/>
                    <span className='text-sm'>Retour</span>
                </Link>
                <h1 className='text-2xl font-bold text-center'>Contact</h1>
                <p className="text-sm text-center text-gray-500">Envoyer un message</p>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                {success && <p className="text-sm text-green-600 text-center">Message envoyé avec succès !</p>}

                <input 
                    type="text" 
                    placeholder="Nom" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
                />
                <textarea
                    placeholder="Votre message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500 resize-none"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white rounded-lg px-4 py-2 cursor-pointer disabled:opacity-50"
                >
                    {loading ? "..." : "Envoyer"}
                </button>
            </form>
        </div>
    )
}

export default ContactPage
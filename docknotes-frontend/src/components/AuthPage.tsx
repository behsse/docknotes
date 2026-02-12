import { useState } from "react";
import { authClient } from "../lib/auth-client";

interface Props {
    onAuth: () => void;
}

export const AuthPage = ({ onAuth }: Props) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (isSignUp) {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
            });
            if (error) {
                setError(error.message || "Erreur lors de l'inscription");
                setLoading(false);
                return;
            }
        } else {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });
            if (error) {
                setError(error.message || "Erreur lors de la connexion");
                setLoading(false);
                return;
            }
        }

        setLoading(false);
        onAuth();
    };

    const handleSocialSignIn = async (provider : "google" | "github") => {
        setError("")
        await authClient.signIn.social({
            provider,
            callbackURL: "http://localhost:5173/",
        })
    }

    return (
        <div className="h-screen flex items-center justify-center bg-zinc-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5 shadow-lg"
            >
                <h1 className="text-2xl font-bold text-center">Docknotes</h1>
                <p className="text-sm text-center text-gray-500">
                    {isSignUp ? "Créer un compte" : "Se connecter"}
                </p>

                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                {isSignUp && (
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white rounded-lg px-4 py-2 cursor-pointer disabled:opacity-50"
                >
                    {loading ? "..." : isSignUp ? "S'inscrire" : "Se connecter"}
                </button>


                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-300"/>
                    <span className="text-xs text-gray-400">ou</span>
                    <div className="h-px flex-1 bg-gray-300"/>
                </div>

                <button
                    type="button"
                    onClick={() => handleSocialSignIn("google")}
                    className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continuer avec Google
                </button>

                <button
                    type="button"
                    onClick={() => handleSocialSignIn("github")}
                    className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Continuer avec GitHub
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError("");
                    }}
                    className="text-sm text-gray-500 hover:text-black cursor-pointer"
                >
                    {isSignUp
                        ? "Déjà un compte ? Se connecter"
                        : "Pas de compte ? S'inscrire"}
                </button>
            </form>
        </div>
    );
};
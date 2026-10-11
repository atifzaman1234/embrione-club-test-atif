import { useState } from 'react'
import { useNavigate } from 'react-router';

export default function AdminLogin({ onLogin }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin@embrione.pes.edu' && pass === 'EmbrioneAdmin@2026') {
            onLogin();
            navigate('/admin');
        } else
            setError('Invalid Credentials')
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6 py-12">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-md shadow-2xl">

                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
                        Admin <span className="text-cyan-400">Portal</span>
                    </h2>
                    <p className="mt-2 text-xs text-slate-400">
                        Authenticate to manage pending member requests
                    </p>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@embrione.pes.edu"
                            value={username}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                    </div>

                    {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-cyan-500 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Sign In to Dashboard
                    </button>
                </form>

                {/* Credentials Reminder Box
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3.5 text-center">
                    <p className="text-[11px] font-medium text-slate-400">
                        Mandatory Credentials:
                    </p>
                    <p className="mt-1 font-mono text-xs text-cyan-400">
                        admin@embrione.pes.edu
                    </p>
                    <p className="font-mono text-xs text-slate-300">
                        EmbrioneAdmin@2026
                    </p>
                </div> */}

            </div>
        </div>
    );
}

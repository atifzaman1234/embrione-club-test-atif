import { Navigate } from 'react-router';

export default function AdminDashboard({ isAuthenticated, onLogout }) {
    // Guard Clause: If user directly enters /admin URL without authenticating, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
            <div className="mx-auto max-w-7xl">

                {/* Header Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-slate-800/80 pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Admin <span className="text-cyan-400">Dashboard</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Review, approve, or reject team member requests
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="self-start sm:self-auto rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                    >
                        Logout
                    </button>
                </div>

                {/* Metric Cards Bar */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Total Submissions
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-white">12</p>
                    </div>

                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                            Pending Approval
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-amber-400">3</p>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            Approved Members
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-emerald-400">9</p>
                    </div>
                </div>

                {/* Queue Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                        Pending Requests <span className="text-sm font-normal text-slate-400">(3)</span>
                    </h2>
                </div>

                {/* Moderation List */}
                <div className="space-y-4">

                    {/* Member Card 1 */}
                    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-slate-700 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start sm:items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                                alt="Alex Rivera"
                                className="h-16 w-16 shrink-0 rounded-full object-cover border-2 border-slate-700 bg-slate-800"
                            />
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold text-white">Alex Rivera</h3>
                                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-slate-700/50">
                                        PES1UG23CS001
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Core Member • Web Development (CSE, Sem 5)
                                </p>
                                <p className="mt-2 text-xs text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
                                    Passionate full-stack developer interested in building scalable web apps, high-performance APIs, and interactive UI animations.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t border-slate-800/80 lg:border-none w-full lg:w-auto justify-end">
                            <button
                                type="button"
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-600/20"
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-amber-500 shadow-lg shadow-amber-600/20"
                            >
                                Reject
                            </button>
                            <button
                                type="button"
                                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Member Card 2 */}
                    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-slate-700 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start sm:items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                                alt="David Chen"
                                className="h-16 w-16 shrink-0 rounded-full object-cover border-2 border-slate-700 bg-slate-800"
                            />
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold text-white">David Chen</h3>
                                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-slate-700/50">
                                        PES1UG23EC042
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Head • Design (ECE, Sem 6)
                                </p>
                                <p className="mt-2 text-xs text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
                                    UI/UX designer focused on design systems, component libraries, accessibility, and clean visual graphics for products.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t border-slate-800/80 lg:border-none w-full lg:w-auto justify-end">
                            <button
                                type="button"
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-600/20"
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-amber-500 shadow-lg shadow-amber-600/20"
                            >
                                Reject
                            </button>
                            <button
                                type="button"
                                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

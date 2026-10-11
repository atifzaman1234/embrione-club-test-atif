export default function Card({
    name = 'Team Member',
    role = 'Member',
    department = '',
    semester = '',
    domain = 'General',
    memberId = '',
    bio = 'No bio available yet.',
    imageUrl = null,
    imageAlt,
    isOnline = true,
    organization = 'The Embrione',
    githubUrl = 'https://github.com',
    linkedinUrl = 'https://linkedin.com',
}) {
    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10">

            {/* Background Subtle Glow Effect on Hover */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-300 group-hover:bg-cyan-500/20" />

            <div>
                {/* Top Header: Photo & Member Details */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={imageAlt || `${name} profile`}
                                className="h-16 w-16 rounded-full border-2 border-slate-700 object-cover transition-colors duration-300 group-hover:border-cyan-400"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-800 text-slate-400 transition-colors duration-300 group-hover:border-cyan-400 group-hover:text-cyan-300">
                                <svg viewBox="0 0 24 24" aria-label="Default user avatar" className="h-9 w-9 fill-current">
                                    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.14 0-7.5 2.52-7.5 5.625 0 .62.505 1.125 1.125 1.125h12.75c.62 0 1.125-.505 1.125-1.125 0-3.105-3.36-5.625-7.5-5.625Z" />
                                </svg>
                            </div>
                        )}
                        {isOnline && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-500" />}
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <h3 className="truncate text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                            {name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                            {role}
                        </p>
                        <p className="text-xs text-slate-400">
                            {[department, semester].filter(Boolean).join(' • ')}
                        </p>
                    </div>
                </div>

                {/* Domain Badge */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700/50">
                        {domain}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                        {memberId}
                    </span>
                </div>

                {/* Bio Description */}
                <p className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-3">
                    {bio}
                </p>
            </div>

            {/* Social Links & Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs">
                <span className="text-slate-500 text-[11px]">{organization}</span>

                <div className="flex items-center gap-3">
                    {githubUrl && <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-medium text-slate-400 transition-colors hover:text-white"
                    >
                        GitHub
                        <span className="text-[10px]">↗</span>
                    </a>}
                    {linkedinUrl && <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-medium text-slate-400 transition-colors hover:text-cyan-400"
                    >
                        LinkedIn
                        <span className="text-[10px]">↗</span>
                    </a>}
                </div>
            </div>

        </div>
    );
}

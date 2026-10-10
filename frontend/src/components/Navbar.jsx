import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { href: '/team', label: 'Team Directory' },
        { href: '/register', label: 'Register' },
        { href: '/admin', label: 'Admin Portal' },
    ];

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Brand Logo */}
                <Link
                    to="/team"
                    className="text-xl font-extrabold tracking-wider text-white"
                    onClick={() => setIsOpen(false)}
                >
                    THE <span className="text-cyan-400">EMBRIONE</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`text-sm font-medium transition-colors ${location.pathname === link.href
                                ? 'text-cyan-400 font-semibold'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? (
                        /* Close (X) Icon */
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        /* Hamburger (3 lines) Icon */
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
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="border-t border-slate-800 bg-slate-950/95 px-6 py-4 md:hidden">
                    <nav className="flex flex-col gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsOpen(false)} // Close menu when a link is clicked
                                className={`text-base font-medium transition-colors ${location.pathname === link.href
                                    ? 'text-cyan-400 font-semibold'
                                    : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
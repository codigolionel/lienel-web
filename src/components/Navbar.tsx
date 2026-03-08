import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

    useGSAP(() => {
        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 50 && !isMobileMenuOpen) {
                    // Scrolling down
                    gsap.to(navRef.current, {
                        yPercent: -150,
                        duration: 0.4,
                        ease: 'power3.inOut',
                    });
                } else if (!isMobileMenuOpen) {
                    // Scrolling up or at top
                    gsap.to(navRef.current, {
                        yPercent: 0,
                        duration: 0.4,
                        ease: 'power3.out',
                        backgroundColor: self.scroll() > 50 ? 'rgba(255, 252, 242, 0.7)' : 'transparent',
                        backdropFilter: self.scroll() > 50 ? 'blur(16px)' : 'blur(0px)',
                        borderColor: self.scroll() > 50 ? 'rgba(107, 112, 92, 0.15)' : 'transparent',
                        color: self.scroll() > 50 ? 'var(--color-moss)' : 'var(--color-primary)',
                        boxShadow: self.scroll() > 50 ? '0 10px 40px -10px rgba(0,0,0,0.1)' : 'none',
                    });
                }
            }
        });
    }, { scope: navRef, dependencies: [isMobileMenuOpen] });

    useEffect(() => {
        if (isMobileMenuOpen) {
            // Open animation
            gsap.to(mobileMenuRef.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.4,
                ease: 'power2.inOut',
            });
            gsap.fromTo(menuItemsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );
            // Lock body scroll
            document.body.style.overflow = 'hidden';

            // Adjust navbar styling for menu open
            gsap.to(navRef.current, {
                backgroundColor: 'transparent',
                backdropFilter: 'none',
                borderColor: 'transparent',
                color: 'var(--color-primary)',
                boxShadow: 'none',
                duration: 0.3
            });
        } else {
            // Close animation
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power2.inOut',
            });
            // Unlock body scroll
            document.body.style.overflow = '';

            // Re-evalute navbar styling based on scroll
            if (window.scrollY > 50) {
                gsap.to(navRef.current, {
                    backgroundColor: 'rgba(255, 252, 242, 0.7)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(107, 112, 92, 0.15)',
                    color: 'var(--color-moss)',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                    duration: 0.3
                });
            }
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const mobileLinks = [
        { href: '#inicio', label: 'Inicio' },
        { href: '#nosotros', label: 'Nosotros' },
        { href: '#servicios', label: 'Servicios' },
        { href: '#contacto', label: 'Contacto' },
    ];

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 uppercase text-sm tracking-widest font-sans font-medium px-4">
                <nav
                    ref={navRef}
                    className="flex items-center justify-between w-full max-w-5xl px-6 md:px-8 py-4 rounded-full border border-transparent text-primary transition-colors duration-300"
                >
                    <div className="flex items-center gap-2 cursor-pointer font-bold text-lg tracking-normal normal-case group relative z-50">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110 duration-500 ease-out">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        <span className={isMobileMenuOpen ? "text-[#fcf9f2]" : ""}>Linel</span>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-8">
                        <li><a href="#inicio" className="hover:opacity-70 transition-opacity">Inicio</a></li>
                        <li><a href="#nosotros" className="hover:opacity-70 transition-opacity">Nosotros</a></li>
                        <li><a href="#servicios" className="hover:opacity-70 transition-opacity">Servicios</a></li>
                        <li><a href="#contacto" className="hover:opacity-70 transition-opacity">Contacto</a></li>
                    </ul>

                    {/* Desktop CTA */}
                    <a href="https://wa.me/1165657291" target="_blank" rel="noopener noreferrer" className="hidden md:flex relative overflow-hidden group px-6 py-2 rounded-full font-medium tracking-normal normal-case bg-base text-primary hover:text-base border border-charcoal/20 transition-all duration-300 scale-100 hover:scale-105 items-center gap-2">
                        <span className="relative z-10 flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            WhatsApp
                        </span>
                        <div className="absolute inset-0 bg-[#25D366] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    </a>

                    {/* Mobile Menu Toggle button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden relative z-50 p-2 text-primary focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <div className={`transition-colors duration-300 ${isMobileMenuOpen ? "text-[#fcf9f2]" : ""}`}>
                            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </div>
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Fullscreen Overlay */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-40 bg-[#1A1A1A] opacity-0 pointer-events-none flex flex-col justify-center items-center backdrop-blur-md"
            >
                {/* Noise overlay for texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>

                <ul className="flex flex-col items-center gap-8 relative z-10 w-full px-6 text-[#fcf9f2]">
                    {mobileLinks.map((link, index) => (
                        <li
                            key={link.label}
                            ref={el => { menuItemsRef.current[index] = el; }}
                            className="w-full text-center"
                        >
                            <a
                                href={link.href}
                                onClick={handleLinkClick}
                                className="block text-4xl sm:text-5xl font-serif italic hover:text-accent transition-colors py-2"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}

                    <li
                        ref={el => { menuItemsRef.current[mobileLinks.length] = el; }}
                        className="mt-8"
                    >
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-white font-sans font-bold tracking-tight text-lg hover:scale-105 transition-transform"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Agendar Llamada
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;

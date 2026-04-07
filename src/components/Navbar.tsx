import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Facebook, Instagram } from 'lucide-react';
import perfilAgus from '../assets/perfilAgus.png';
import logoIcon from '../assets/LiNeL_logo_transparente.png';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 50 && !isMobileMenuOpen) {
                    gsap.to(navRef.current, {
                        yPercent: -150,
                        duration: 0.4,
                        ease: 'power3.inOut',
                    });
                } else if (!isMobileMenuOpen) {
                    gsap.to(navRef.current, {
                        yPercent: 0,
                        duration: 0.4,
                        ease: 'power3.out',
                        backgroundColor: self.scroll() > 50 ? 'rgba(11, 11, 16, 0.9)' : 'transparent',
                        backdropFilter: self.scroll() > 50 ? 'blur(16px)' : 'blur(0px)',
                        borderColor: self.scroll() > 50 ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        color: self.scroll() > 50 ? '#FFFFFF' : 'var(--color-primary)',
                        boxShadow: self.scroll() > 50 ? '0 10px 40px -10px rgba(0,0,0,0.5)' : 'none',
                    });
                }
            }
        });
    }, { scope: navRef, dependencies: [isMobileMenuOpen] });

    useEffect(() => {
        if (isMobileMenuOpen) {
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
            document.body.style.overflow = 'hidden';
            gsap.to(navRef.current, {
                backgroundColor: 'transparent',
                backdropFilter: 'none',
                borderColor: 'transparent',
                color: 'var(--color-primary)',
                boxShadow: 'none',
                duration: 0.3
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power2.inOut',
            });
            document.body.style.overflow = '';
            if (window.scrollY > 50) {
                gsap.to(navRef.current, {
                    backgroundColor: 'rgba(11, 11, 16, 0.9)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                    duration: 0.3
                });
            }
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.body.style.overflow = '';
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 350);
    };

    const handleDesktopLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    const mobileLinks = [
        { href: '#inicio', label: 'Inicio' },
        { href: '#servicios', label: 'Servicios' },
        { href: '#proceso', label: 'Proceso' },
        { href: '#nosotros', label: 'Nosotros' },
        { href: '#contacto', label: 'Contacto' },
    ];

    return (
        <>
            {/* ✦ Cal Sans en los links desktop — font-sans en botones y mobile */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4">
                <nav
                    ref={navRef}
                    className="flex items-center justify-between w-full max-w-7xl px-6 md:px-8 py-0 rounded-full border border-transparent text-primary transition-colors duration-300"
                >
                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-start gap-3 relative z-50">
                        <img
                            src={logoIcon}
                            alt="Linel Logo"
                            className="h-[48px] sm:h-[60px] w-auto object-contain transition-transform hover:scale-105 duration-500 ease-out"
                        />
                    </div>

                    {/* Desktop Menu — Cal Sans, uppercase, tracking */}
                    <ul
                        className="hidden md:flex flex-1 justify-center items-center gap-9 uppercase text-xs tracking-widest"
                        style={{ fontFamily: "'Cal Sans', sans-serif", WebkitTextStroke: '0.3px white' }}
                    >
                        {[
                            { href: '#inicio', label: 'Inicio' },
                            { href: '#servicios', label: 'Servicios' },
                            { href: '#proceso', label: 'Proceso' },
                            { href: '#nosotros', label: 'Nosotros' },
                            { href: '#contacto', label: 'Contacto' },
                        ].map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={(e) => handleDesktopLinkClick(e, item.href)}
                                    className="relative group pb-1 transition-opacity"
                                >
                                    {item.label}
                                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#EE32A0] transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right Actions */}
                    <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 md:gap-6">
                        {/* Desktop CTA */}
                        <div className="hidden md:flex flex-col items-center">
                            <a
                                href="#contacto"
                                onClick={(e) => handleDesktopLinkClick(e, '#contacto')}
                                className="relative overflow-hidden group px-6 py-2 rounded-lg font-sans font-medium tracking-normal normal-case text-sm bg-transparent text-white hover:text-white border border-white/60 transition-all duration-300 scale-100 hover:scale-105 flex items-center gap-2"
                            >
                                <span className="relative z-10 flex items-center gap-2">

                                    Contacto
                                </span>
                                <div className="absolute inset-0 bg-[linear-gradient(10deg,#EE32A0,#FF6B35)] opacity-80 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden relative z-50 p-2 -mr-2 text-primary font-sans focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <div className={`transition-colors duration-300 ${isMobileMenuOpen ? 'text-[#fcf9f2]' : ''}`}>
                                {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                            </div>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Fullscreen Overlay Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-40 bg-[#0a0a0a]/95 opacity-0 pointer-events-none flex flex-col justify-center items-center backdrop-blur-xl overflow-y-auto"
            >
                <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>

                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0 flex flex-col md:flex-row relative z-10 min-h-[100dvh]">

                    {/* Left Column */}
                    <div className="flex-1 flex flex-col justify-center items-start md:border-r border-white/10 md:pr-12 lg:pr-24 pt-12 md:pt-0 pb-12 md:pb-0">
                        <ul className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                            {mobileLinks.map((link, index) => (
                                <li
                                    key={link.label}
                                    ref={el => { menuItemsRef.current[index] = el as HTMLLIElement | null; }}
                                    className="w-full text-left"
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href)}
                                        className="inline-block text-2xl sm:text-3xl lg:text-4xl font-serif italic text-white/50 hover:text-white hover:translate-x-4 transition-transform duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div
                        className="flex-1 flex flex-col justify-center items-start md:pl-12 lg:pl-24 relative pb-24 md:pb-0 pt-3 md:pt-0"
                        ref={el => { menuItemsRef.current[mobileLinks.length + 1] = el as HTMLDivElement | null; }}
                    >
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-white/20 mb-6 shrink-0 bg-white/5">
                            <img src={perfilAgus} alt="Augusto Lionel" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <h3 className="font-sans font-bold text-base sm:text-xl text-white tracking-widest uppercase">Lastre Augusto Lionel</h3>
                            <p className="text-[#EE32A0] font-mono text-[10px] sm:text-sm uppercase tracking-widest">Diseñador Web Full Stack</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-4 text-white/50 font-mono text-[10px] sm:text-xs">
                            <a href="https://wa.me/5491165657291" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-3">
                                <span className="text-cyan-400 font-bold min-w-[70px]">WHATSAPP</span> +54 9 11 6565 7291
                            </a>
                            <a href="mailto:proyectos.linel@gmail.com" className="hover:text-white transition-colors flex items-center gap-3">
                                <span className="text-cyan-400 font-bold min-w-[70px]">EMAIL</span> proyectos.linel@gmail.com
                            </a>
                            <a href="https://linel.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-3">
                                <span className="text-cyan-400 font-bold min-w-[70px]">WEB</span> https://linel.com.ar
                            </a>
                        </div>

                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10 w-full max-w-xs pl-8">
                            <a
                                ref={el => { menuItemsRef.current[mobileLinks.length] = el as HTMLAnchorElement | null; }}
                                href="https://wa.me/5491165657291"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex relative overflow-hidden group px-6 py-3 rounded-full font-sans font-medium tracking-normal normal-case bg-transparent text-[#EE32A0] hover:text-white border border-[#EE32A0] transition-all duration-300 scale-100 hover:scale-105 items-center gap-2 shrink-0"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    WhatsApp
                                </span>
                                <div className="absolute inset-0 bg-[#EE32A0] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            </a>
                            <a href="https://www.facebook.com/linelDigital/?rdid=RL6EIKA1EUVzo1si" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#00D2D3] hover:text-[#00D2D3]/80 hover:border-[#00D2D3] hover:bg-white/5 transition-all duration-300 hover:scale-110 shrink-0">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/linel_digital?igsh=YWIxaXFobHFqdjFq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#00D2D3] hover:text-[#00D2D3]/80 hover:border-[#00D2D3] hover:bg-white/5 transition-all duration-300 hover:scale-110 shrink-0">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
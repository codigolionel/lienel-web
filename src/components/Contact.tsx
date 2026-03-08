import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            }
        });

        tl.fromTo(infoRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        ).fromTo(formRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            "-=0.6"
        );
    }, { scope: containerRef });

    return (
        <section id="contacto" ref={containerRef} className="relative w-full py-24 sm:py-32 md:py-48 px-8 sm:px-12 md:px-24 bg-black text-primary overflow-hidden min-h-[100dvh] flex items-center">
            {/* Background image with overlay */}
            <div
                className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity will-change-transform"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px) brightness(0.5)'
                }}
            ></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0f1c]/90 via-black/80 to-[#050812]/90"></div>

            <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Column: Contact Info */}
                <div ref={infoRef} className="flex flex-col">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-[1.1] mb-10 text-white text-pretty">
                        Consultas<br />
                        <span className="text-white/60 font-serif italic font-normal">Completa el formulario. </span>
                    </h2>

                    <div className="flex flex-col gap-6 text-white/80 font-mono text-[11px] sm:text-xs uppercase tracking-widest pl-4 border-l border-white/10">
                        <div className="group">
                            <span className="text-[10px] text-cyan-400 font-bold mb-1 block">Dirección</span>
                            <p className="group-hover:text-white transition-colors text-sm text-pretty">Mirave 1700/1800 Ituzaingo<br />Buenos Aires, Argentina</p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-cyan-400 font-bold mb-1 block">Teléfono / WhatsApp</span>
                            <p className="group-hover:text-white transition-colors text-sm">+54 9 11 6565-7297</p>
                            <p className="group-hover:text-white transition-colors text-sm">+54 9 11 6565-7291</p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-cyan-400 font-bold mb-1 block">Horario</span>
                            <p className="group-hover:text-white transition-colors text-sm">Lun a Vie de 9 a 17hs.</p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-cyan-400 font-bold mb-1 block">Email</span>
                            <a href="mailto:proyectos.linel@gmail.com" className="group-hover:text-white transition-colors text-sm hover:text-cyan-400 lowercase">proyectos.linel@gmail.com</a>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="font-sans font-bold text-xl tracking-tight text-white">Linel.</span>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <form
                    ref={formRef}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group/form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                    <div className="flex flex-col gap-6 w-full">
                        <div className="relative group/input">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre completo"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30 peer"
                                required
                            />
                        </div>

                        <div className="relative group/input">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30 peer"
                                required
                            />
                        </div>

                        <div className="relative group/input">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Teléfono"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30 peer"
                            />
                        </div>

                        <div className="relative group/input mt-2">
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Contanos tu idea o proyecto..."
                                rows={3}
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-white/30 resize-none peer"
                                required
                            ></textarea>
                        </div>

                        {/* Fake reCAPTCHA UI */}
                        <div className="p-3 bg-[#fafafa] rounded text-[#555] flex items-center justify-between border border-[#d3d3d3] mt-2 shadow-sm w-full max-w-[280px]">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-white border border-[#c1c1c1] rounded-sm hover:border-[#b2b2b2] cursor-pointer transition-colors flex items-center justify-center"></div>
                                <span className="font-sans text-xs font-medium">No soy un robot</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-6 opacity-80" />
                                <span className="text-[7px] text-[#999] mt-0.5">Privacidad - Condiciones</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 py-4 rounded-full border border-cyan-500 bg-transparent text-white font-sans font-bold uppercase tracking-widest text-[11px] hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            <Send className="w-3.5 h-3.5 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                            Enviar Mensaje
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default Contact;

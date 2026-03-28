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
        <section id="contacto" ref={containerRef} className="relative w-full py-24 sm:py-32 md:py-48 px-8 sm:px-12 md:px-24 bg-[#0B0B10] text-[#FFFFFF] overflow-hidden min-h-[100dvh] flex items-center">
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
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B0B10]/95 via-[#0B0B10]/80 to-black/95"></div>

            <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Column: Contact Info */}
                <div ref={infoRef} className="flex flex-col">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic text-[#FFFCF2] tracking-tight leading-tight mb-4 text-pretty">
                        Consultas<span className="text-[#00D2D3]">.</span>
                    </h2>
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-sans font-light mb-12" style={{opacity: 1}}>
                        Completa el formulario y daremos vida a tu proyecto.
                    </p>

                    <div className="flex flex-col gap-6 text-white/80 font-mono text-[11px] sm:text-xs uppercase tracking-widest pl-4 border-l border-white/10">
                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Dirección</span>
                            <p className="group-hover:text-white transition-colors text-sm text-pretty">Ituzaingó | Castelar<br />Buenos Aires, Argentina</p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Teléfono / WhatsApp</span>
                            <a href="https://wa.me/5491165657291" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors text-sm block">+54 9 11 6565-7291</a>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Horario</span>
                            <p className="group-hover:text-white transition-colors text-sm">Lun a Vie de 9 a 17hs.</p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Email</span>
                            <a href="mailto:proyectos.linel@gmail.com" className="group-hover:text-white transition-colors text-sm hover:text-[#00D2D3] lowercase">proyectos.linel@gmail.com</a>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="font-sans font-bold text-xl tracking-tight text-white">Linel</span>
                        <div className="flex items-center gap-3">
                            <a href="https://www.facebook.com/linelDigital" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#00D2D3] hover:text-[#00D2D3]/80 hover:border-[#00D2D3] transition-all duration-300">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/linel_digital?igsh=YWIxaXFobHFqdjFq" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#00D2D3] hover:text-[#00D2D3]/80 hover:border-[#00D2D3] transition-all duration-300">
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
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D2D3] to-transparent opacity-100"></div>

                    <div className="flex flex-col gap-6 w-full">
                        <div className="relative group/input">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre y Apellido"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-[#00D2D3] transition-colors placeholder:text-white/30 peer"
                                required
                            />
                        </div>

                        <div className="relative group/input">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-[#00D2D3] transition-colors placeholder:text-white/30 peer"
                                required
                            />
                        </div>

                        <div className="relative group/input">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Teléfono"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-[#00D2D3] transition-colors placeholder:text-white/30 peer"
                            />
                        </div>

                        <div className="relative group/input mt-2">
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Contanos tu idea o proyecto..."
                                rows={3}
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm focus:outline-none focus:border-[#00D2D3] transition-colors placeholder:text-white/30 resize-none peer"
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
                            className="relative w-full mt-4 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#00D2D3] backdrop-blur-sm px-8 py-4 font-sans font-bold uppercase tracking-widest text-[13px] sm:text-sm text-black hover:text-white transition-colors duration-300 hover:scale-105 group/btn"
                        >
                            <span className="absolute inset-0 bg-[#EE32A0] translate-y-full transition-transform duration-300 ease-in-out group-hover/btn:translate-y-0 z-0"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                <Send className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                                Enviar Mensaje
                            </span>
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default Contact;

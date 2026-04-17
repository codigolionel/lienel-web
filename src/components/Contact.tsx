import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

declare global {
    interface Window {
        turnstile?: {
            render: (
                container: string | HTMLElement,
                options: {
                    sitekey: string;
                    theme?: 'light' | 'dark' | 'auto';
                    size?: 'normal' | 'flexible' | 'compact';
                    callback?: (token: string) => void;
                    'expired-callback'?: () => void;
                    'error-callback'?: () => void;
                }
            ) => string;
            reset: (widgetId?: string) => void;
            getResponse?: (widgetId?: string) => string;
        };
    }
}

const Contact = () => {
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const turnstileContainerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: '',
        telefono: '',
    });

    const [turnstileToken, setTurnstileToken] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || '/server/contact.php';
    const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

    useEffect(() => {
        let attempts = 0;

        const tryRender = () => {
            attempts += 1;

            if (!turnstileContainerRef.current) return;

            if (window.turnstile && !widgetIdRef.current) {
                turnstileContainerRef.current.innerHTML = '';

                widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
                    sitekey: TURNSTILE_SITE_KEY,
                    theme: 'dark',
                    size: 'normal',
                    callback: (token: string) => {
                        setTurnstileToken(token);
                        setErrorMessage('');
                    },
                    'expired-callback': () => {
                        setTurnstileToken('');
                    },
                    'error-callback': () => {
                        setTurnstileToken('');
                        setErrorMessage('No se pudo cargar la verificación de seguridad.');
                    },
                });

                return;
            }

            if (attempts < 20) {
                setTimeout(tryRender, 300);
            } else {
                setErrorMessage('No se pudo cargar la verificación de seguridad.');
            }
        };

        tryRender();
    }, [TURNSTILE_SITE_KEY]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        if (formData.telefono.trim() !== '') {
            setStatus('error');
            setErrorMessage('No se pudo enviar el mensaje.');
            return;
        }

        if (!turnstileToken) {
            setStatus('error');
            setErrorMessage('Completá la verificación de seguridad.');
            return;
        }

        try {
            const resp = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.nombre,
                    contact: formData.email,
                    message: formData.mensaje,
                    token: turnstileToken,
                }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.error || 'Ocurrió un error al enviar tu consulta.');
            }

            setStatus('success');
            setFormData({
                nombre: '',
                email: '',
                mensaje: '',
                telefono: '',
            });
            setTurnstileToken('');

            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.reset(widgetIdRef.current);
            }

            setTimeout(() => {
                setStatus('idle');
                setErrorMessage('');
            }, 5000);
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message || 'No se pudo enviar el mensaje.');
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
        });

        tl.fromTo(
            infoRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        ).fromTo(
            formRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        );
    }, { scope: containerRef });

    return (
        <section
            id="contacto"
            ref={containerRef}
            className="relative w-full pt-16 pb-24 sm:pt-20 sm:pb-32 md:pt-24 md:pb-48 px-8 sm:px-12 md:px-24 bg-[#0B0B10] text-[#FFFFFF] overflow-hidden"
        >
            <div
                className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity will-change-transform"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px) brightness(0.5)',
                }}
            />

            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B0B10]/95 via-[#0B0B10]/80 to-black/95" />

            <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div ref={infoRef} className="flex flex-col">
                    <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#FFFCF2] tracking-tight leading-tight mb-4 text-pretty">
                        Contanos tu idea
                    </h2>

                    <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl font-sans font-normal mb-12">
                        Respondemos en menos de 24 horas. Sin compromiso.
                    </p>

                    <div className="flex flex-col gap-6 text-white/80 font-mono text-[11px] sm:text-xs uppercase tracking-widest pl-4 border-l border-white/10">
                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Dirección</span>
                            <p className="group-hover:text-white transition-colors text-sm text-pretty">
                                Ituzaingó | Castelar
                                <br />
                                Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Teléfono / WhatsApp</span>
                            <a
                                href="https://wa.me/5491165657291"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group-hover:text-white transition-colors text-sm block"
                            >
                                +54 9 11 6565-7291
                            </a>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Horario</span>
                            <p className="group-hover:text-white transition-colors text-sm">Lun a Vie de 9 a 17hs.</p>
                        </div>

                        <div className="group">
                            <span className="text-[10px] text-[#00D2D3] font-bold mb-1 block">Email</span>
                            <a
                                href="mailto:proyectos.linel@gmail.com"
                                className="group-hover:text-white transition-colors text-sm hover:text-[#00D2D3] lowercase"
                            >
                                proyectos.linel@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="font-sans font-bold text-lg tracking-tight text-white/60">Nuestras Redes</span>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/linelDigital/?rdid=RL6EIKA1EUVzo1si"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#00D2D3] hover:text-[#00D2D3]/80 hover:border-[#00D2D3] transition-all duration-300"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>

                            <a
                                href="https://www.instagram.com/linel_digital?igsh=YWIxaXFobHFqdjFq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#00D2D3] hover:text-[#00D2D3]/80 hover:border-[#00D2D3] transition-all duration-300"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <form
                    ref={formRef}
                    className="bg-white/5 backdrop-blur-xl border border-[#00D2D3]/20 p-8 sm:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group/form"
                    onSubmit={handleSubmit}
                >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D2D3] to-transparent opacity-100" />

                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="hidden opacity-0 mx-[-9999px]"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div className="flex flex-col gap-6 w-full">
                        <div className="relative group/input">
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/50 focus:bg-white/10 transition-colors placeholder:text-white/40 peer"
                                required
                            />
                        </div>

                        <div className="relative group/input">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Correo electrónico"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/50 focus:bg-white/10 transition-colors placeholder:text-white/40 peer"
                                required
                            />
                        </div>

                        <div className="relative group/input">
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                placeholder="Dejanos tu mensaje..."
                                value={formData.mensaje}
                                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/50 focus:bg-white/10 transition-colors placeholder:text-white/40 peer resize-none"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <div
                                ref={turnstileContainerRef}
                                className="min-h-[80px] w-full max-w-[320px]"
                            />
                        </div>

                        {status === 'error' && (
                            <p className="text-sm text-red-400 text-center font-bold tracking-tight">
                                {errorMessage}
                            </p>
                        )}

                        {status === 'success' && (
                            <p className="text-sm text-[#00D2D3] text-center font-bold tracking-tight">
                                ¡Gracias! Hemos recibido tu mensaje. Pronto te contactaremos.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="relative max-w-xs mx-auto w-full mt-4 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00D2D3] backdrop-blur-sm px-8 py-4 font-sans font-bold uppercase tracking-widest text-[13px] sm:text-sm text-black hover:text-white transition-colors duration-300 hover:scale-105 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 bg-[#EE32A0] translate-y-full transition-transform duration-300 ease-in-out group-hover/btn:translate-y-0 z-0" />
                            <span className="relative z-10 flex items-center gap-2">
                                {status === 'loading' ? (
                                    <>Enviando...</>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                                        Enviar Mensaje
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
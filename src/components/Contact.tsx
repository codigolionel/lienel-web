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
        telefono_real: '',
        mensaje: '',
        website: '',
    });

    const [turnstileToken, setTurnstileToken] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || '/server/contact.php';
    const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

    useEffect(() => {
        const scriptId = 'cloudflare-turnstile-script';
        let script = document.getElementById(scriptId) as HTMLScriptElement | null;

        const loadWidget = () => {
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
            }
        };

        if (window.turnstile) {
            loadWidget();
        } else if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.defer = true;
            script.onload = loadWidget;
            script.onerror = () => {
                setErrorMessage('No se pudo cargar la verificación de seguridad.');
            };
            document.body.appendChild(script);
        } else {
            script.addEventListener('load', loadWidget);
        }

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.reset(widgetIdRef.current);
                widgetIdRef.current = null;
            }
            const scriptToRemove = document.getElementById(scriptId);
            if (scriptToRemove && scriptToRemove.parentNode) {
                scriptToRemove.parentNode.removeChild(scriptToRemove);
            }
        };
    }, [TURNSTILE_SITE_KEY]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        if (formData.website.trim() !== '') {
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
                    phone: formData.telefono_real,
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
                telefono_real: '',
                mensaje: '',
                website: '',
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
            className="relative w-full pt-24 pb-28 sm:pt-32 sm:pb-36 md:pt-36 md:pb-48 px-6 sm:px-12 md:px-16 bg-[#0B0B10] text-[#FFFFFF] overflow-hidden"
        >
            <div
                className="absolute inset-0 z-0 opacity-60"
                style={{
                    background: 'radial-gradient(ellipse at 20% 50%, rgba(0,210,211,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(238,50,160,0.07) 0%, transparent 55%)',
                }}
            />

            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B0B10]/95 via-[#0B0B10]/80 to-black/95" />

            <div className="relative z-10 max-w-5xl mx-auto w-full">
                {/* Section header */}
                <div className="mb-16 md:mb-20">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D2D3] mb-4">Contacto</p>
                    <h2 className="text-4xl sm:text-5xl font-serif italic text-[#FFFCF2] tracking-tight leading-tight">
                        Contános tu idea
                    </h2>
                    <p className="text-white/45 text-base sm:text-lg font-normal mt-4 max-w-md leading-relaxed">
                        Respondemos en menos de 24 horas. Sin compromiso.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div ref={infoRef} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-6 text-white/80 font-sans text-sm pl-4 border-l border-white/10">
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
                    className="bg-[#0E0E18] border border-white/[0.08] p-8 sm:p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden"
                    onSubmit={handleSubmit}
                >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D2D3] to-transparent opacity-100" />

                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="hidden opacity-0 mx-[-9999px]"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div className="flex flex-col gap-5 w-full">
                        <div>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre *"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/40 focus:bg-white/[0.07] transition-all duration-200 placeholder:text-white/25"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Correo electrónico *"
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/40 focus:bg-white/[0.07] transition-all duration-200 placeholder:text-white/25"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                id="telefono_real"
                                name="telefono_real"
                                value={formData.telefono_real}
                                onChange={(e) => setFormData({ ...formData, telefono_real: e.target.value })}
                                placeholder="Teléfono / WhatsApp (opcional)"
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/40 focus:bg-white/[0.07] transition-all duration-200 placeholder:text-white/25"
                                autoComplete="tel"
                            />
                        </div>

                        <div>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                placeholder="Dejanos tu mensaje..."
                                value={formData.mensaje}
                                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00D2D3]/40 focus:bg-white/[0.07] transition-all duration-200 placeholder:text-white/25 resize-none"
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
                            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#00D2D3] px-8 py-4 font-sans font-semibold text-sm text-black hover:bg-[#00D2D3]/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(0,210,211,0.35)] disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                        >
                            {status === 'loading' ? (
                                <>Enviando...</>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    Enviar Mensaje
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </section>
    );
};

export default Contact;
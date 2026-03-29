import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/background-violet-blue.webp";
import { MousePointer2, Activity, Layers, CodeXml } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
    {
        title: "Landing Page",
        text: "Una página simple y profesional para mostrar tu negocio y empezar a recibir consultas.",
        tagline: "Tu negocio visible en internet",
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="landingGrad" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#00D2D3" />
                        <stop offset="1" stopColor="#EE32A0" />
                    </linearGradient>
                </defs>
                <path
                    d="M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM3 8h18M8 20v-2"
                    stroke="url(#landingGrad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "One Page",
        text: "Una web completa en una sola página, pensada para explicar bien lo que hacés y generar confianza.",
        tagline: "Más claridad, más consultas",
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="onePageGrad" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#00D2D3" />
                        <stop offset="1" stopColor="#EE32A0" />
                    </linearGradient>
                </defs>
                <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="url(#onePageGrad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                    stroke="url(#onePageGrad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Web Completa",
        text: "Una web con varias secciones, ideal para negocios que quieren una presencia más sólida.",
        tagline: "Si buscas posicionarte firme",
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="webGrad" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#00D2D3" />
                        <stop offset="1" stopColor="#EE32A0" />
                    </linearGradient>
                </defs>
                <path
                    d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z"
                    stroke="url(#webGrad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M3 9h18M9 21V9"
                    stroke="url(#webGrad)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

export default function Service() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const revealRefs = useRef<HTMLDivElement[]>([]);
    const telemetryRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<SVGSVGElement>(null);
    const siteRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [deckOrder, setDeckOrder] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDeckOrder(prev => {
                const newOrder = [...prev];
                const last = newOrder.pop()!;
                newOrder.unshift(last);
                return newOrder;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const featureCards = [
        { id: 0, title: 'Landing Pages', desc: 'enfocadas en captar clientes y generar conversiones.', color: 'bg-[#1A1A24]', border: 'border-white/5' },
        { id: 1, title: 'Corporativos', desc: 'presencia online para empresas y profesionales.', color: 'bg-[#1A1A24]', border: 'border-white/10' },
        { id: 2, title: 'Portfolios', desc: 'presentación visual de proyectos, trabajos o servicios.', color: 'bg-[#1A1A24]', border: 'border-[#00D2D3]/30' }
    ];

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useGSAP(
        () => {
            gsap.fromTo(
                revealRefs.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            const tl = gsap.timeline({ repeat: -1 });
            const messages = [
                "Que se vea profesional 😎",
                "Que se entienda rápido 😉",
                "Que funcione donde sea 🙂",
                "Que genere consultas 😄"
            ];
            const targetElement = telemetryRef.current;
            if (targetElement) {
                messages.forEach((msg) => {
                    tl.to(targetElement, {
                        duration: 1.5,
                        ease: "none",
                        onUpdate: function () {
                            const progress = this.progress();
                            const charCount = Math.floor(progress * msg.length);
                            targetElement.innerText = msg.substring(0, charCount);
                        }
                    })
                        .to(targetElement, { duration: 2 })
                        .to(targetElement, {
                            duration: 0.5,
                            onUpdate: function () {
                                const progress = 1 - this.progress();
                                const charCount = Math.floor(progress * msg.length);
                                targetElement.innerText = msg.substring(0, charCount);
                            }
                        });
                });
            }

            if (cursorRef.current && siteRef.current) {
                const cursor = cursorRef.current;
                const site = siteRef.current;
                const cursorTL = gsap.timeline({ repeat: -1, repeatDelay: 1 });
                cursorTL.set(cursor, { x: -120, y: -60 })
                    .to(cursor, { x: 0, y: 0, duration: 1.2, ease: "power2.inOut" })
                    .to(cursor, { scale: 0.85, duration: 0.08 })
                    .to(site, { scale: 1, duration: 0.4, ease: "back.out(1.7)" })
                    .to(cursor, { scale: 1, duration: 0.08 })
                    .to(site, { scale: 0, delay: 2, duration: 0.4 });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="servicios"
            ref={sectionRef}
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
            className="relative w-full text-[#FFFFFF] pt-0 pb-24 sm:pb-32 overflow-hidden font-sans"
        >
            <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>

            <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-[#00D2D3]/20 blur-[120px]" />
            <div className="absolute -right-20 bottom-20 h-[500px] w-[500px] rounded-full bg-[#EE32A0]/20 blur-[120px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-24">

                <div ref={addToRefs} className="text-center md:text-left mb-10 md:mb-14 max-w-3xl">
                    <p className="text-[#00D2D3] uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold mb-4 border border-[#00D2D3]/30 bg-[#00D2D3]/10 inline-flex items-center gap-2 px-4 py-2 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2D3]" />
                        No necesitás saber de diseño
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-[60px] font-serif italic font-normal text-[#FFFCF2] leading-tight md:leading-[1.1] mb-6">
                        Soluciones claras para tu web
                    </h2>
                    <p className="text-lg sm:text-xl text-[#FFFFFF]/80 leading-relaxed max-w-2xl">
                        Te ayudamos a elegir la mejor opción para tu negocio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-32">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="bg-[#111118] border border-white/10 rounded-3xl p-8 sm:p-10 hover:bg-white/[0.03] transition-colors duration-300 flex flex-col items-start relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00D2D3]/5 to-[#EE32A0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="bg-gradient-to-br from-[#00D2D3]/10 to-[#EE32A0]/10 border border-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shrink-0">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-outfit font-semibold text-[#FFFFFF] mb-4">
                                {service.title}
                            </h3>

                            <p className="text-sm sm:text-base text-[#FFFFFF]/70 leading-relaxed mb-8 flex-grow">
                                {service.text}
                            </p>

                            <div className="w-full h-[1px] bg-white/10 mb-6" />

                            <p className="text-lg font-outfit tracking-wide text-[#00D2D3]/80">
                                {service.tagline}
                            </p>
                        </div>
                    ))}

                    {/* PANEL 1 DINAMICO (DE FEATURES) */}
                    <div ref={addToRefs} className="feature-panel relative bg-[#111118] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#EE32A0]/50 transition-colors duration-500 shadow-sm h-[340px] flex flex-col items-center justify-end overflow-hidden group">
                        <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
                            <Layers className="w-6 h-6 text-[#00D2D3]" />
                            <span className="font-bold text-sm tracking-widest uppercase text-white">Servicios</span>
                        </div>
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                            {featureCards.map((card) => {
                                const positionIndex = deckOrder.indexOf(card.id);
                                const isFront = positionIndex === 2;
                                return (
                                    <div
                                        key={card.id}
                                        className={`absolute w-full max-w-[310px] p-8 rounded-full border ${card.color} ${card.border} transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xl flex flex-col items-center justify-center gap-4 text-center`}
                                        style={{
                                            transform: `translateY(${(2 - positionIndex) * -15}px) scale(${1 - (2 - positionIndex) * 0.05})`,
                                            zIndex: positionIndex,
                                            opacity: positionIndex === 0 ? 0.6 : positionIndex === 1 ? 0.8 : 1,
                                            filter: isFront ? 'none' : 'blur(2px)'
                                        }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <div className={`w-2 h-2 rounded-full ${isFront ? 'bg-[#00D2D3] shadow-[0_0_10px_#00D2D3]' : 'bg-white/30'}`}></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-sans text-[22px] text-white leading-tight">{card.title}</h4>
                                            <p className="text-sm md:text-base leading-relaxed text-white/80 mt-2">{card.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* PANEL 2 DINAMICO (DE FEATURES) */}
                    <div ref={addToRefs} className="feature-panel relative bg-[#111118] text-white rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#EE32A0]/50 transition-colors duration-500 shadow-xl h-[340px] flex flex-col justify-center overflow-hidden group">
                        <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
                            <div className="flex items-center gap-3 text-white">
                                <Activity className="w-6 h-6 text-[#00D2D3]" />
                                <span className="font-bold text-sm tracking-widest uppercase font-sans">Principios Web</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-[#00D2D3]">in Line</span>
                                <div className="w-2 h-2 rounded-full bg-[#00D2D3] shadow-[0_0_8px_#00D2D3] animate-pulse"></div>
                            </div>
                        </div>
                        <div className="relative w-full font-mono text-sm tracking-tight text-white/70 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="flex gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex">
                                <span className="text-[#EE32A0] font-bold mr-2">{'>'}</span>
                                <span ref={telemetryRef} className="min-h-[40px] text-white overflow-hidden text-ellipsis whitespace-nowrap blur-sm md:blur-none" style={{ filter: 'none' }}>Iniciando...</span>
                                <span className="inline-block w-2 h-4 bg-[#00D2D3] shadow-[0_0_5px_#00D2D3] ml-1 animate-[pulse_1s_step-end_infinite]"></span>
                            </div>
                        </div>
                    </div>

                    {/* PANEL 3 DINAMICO (DE FEATURES) */}
                    <div ref={addToRefs} className="feature-panel relative bg-[#111118] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#EE32A0]/50 transition-colors duration-500 shadow-sm h-[340px] flex flex-col overflow-hidden group">
                        <div className="flex items-center gap-3 z-20 mb-8">
                            <CodeXml className="w-6 h-6 text-[#00D2D3]" />
                            <span className="font-bold text-sm tracking-widest uppercase text-white">
                                Animaciones Web
                            </span>
                        </div>
                        <div className="relative w-full flex-1 flex items-center justify-center bg-black/30 rounded-xl border border-white/5 overflow-hidden group-hover:border-[#EE32A0]/20 transition-colors duration-500">
                            <div className="absolute z-10 pointer-events-none drop-shadow-lg">
                                <MousePointer2 ref={cursorRef} className="w-8 h-8 text-[#EE32A0] fill-[#EE32A0]" strokeWidth={1} />
                            </div>
                            <button ref={buttonRef} className="absolute bg-[#00D2D3] hover:bg-[#EE32A0] transition-colors text-[#0B0B10] px-6 py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(0,210,211,0.4)] hover:shadow-[0_0_20px_rgba(238,50,160,0.5)]">
                                Click
                            </button>
                            <div ref={siteRef} className="absolute w-[220px] h-[140px] bg-[#1A1A24] rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden scale-0">
                                <div className="h-6 bg-white/5 flex items-center px-2 gap-1 border-b border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="h-3 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                    <div className="h-8 bg-gradient-to-r from-[#00D2D3]/20 to-[#EE32A0]/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={addToRefs} className="bg-gradient-to-br from-[#00D2D3]/10 to-[#EE32A0]/10 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden backdrop-blur-sm">

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-32 bg-gradient-to-r from-[#00D2D3]/20 to-[#EE32A0]/20 blur-[80px] pointer-events-none" />

                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-5xl pb-7 sm:text-5xl md:text-5xl font-serif italic font-normal text-[#FFFFFF] mb-3">
                            ¿No estás seguro cuál elegir?
                        </h3>
                        <p className="text-base sm:text-lg text-[#FFFFFF]/80">
                            Te ayudamos a definirlo.
                        </p>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <a
                            href="https://wa.me/5491165657291"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#00D2D3] px-6 py-3.5 sm:px-8 sm:py-4 md:px-8 md:py-4 text-sm md:text-base font-bold text-black transition-all duration-300 hover:bg-[#00D2D3]/90 hover:scale-105"
                        >
                            Contactanos
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                <path
                                    d="M5 12h14M12 5l7 7-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            {/* Wave divider for smooth transition to AbautUs */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10 leading-[0]">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]"
                >
                    <path
                        d="M0,0 C300,100 900,20 1200,80 L1200,120 L0,120 Z"
                        fill="#09090E"
                    />
                </svg>
            </div>
        </section>
    );
}
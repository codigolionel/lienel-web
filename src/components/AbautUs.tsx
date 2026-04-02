import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import perfilAgus from "../assets/perfilAgus.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Differentiator = {
    title: string;
    text: string;
    icon: ReactNode;
};

type Step = {
    number: string;
    title: string;
    text: string;
    highlight?: boolean;
};

const differentiators: Differentiator[] = [
    {
        title: "Te guiamos en todo el proceso.",
        text: "De la idea a la web lista.",
        icon: (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="#00D2D3"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Pensamos en tu negocio",
        text: "Priorizamos que la web funcione para vos.",
        icon: (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                    d="M22 12h-4l-3 9L9 3l-3 9H2"
                    stroke="#00D2D3"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Claridad y confianza primero",
        text: "Para que te entiendan y te escriban.",
        icon: (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#00D2D3"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Para quienes empiezan desde cero",
        text: "Esto ya  no es un problema.",
        icon: (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                    stroke="#00D2D3"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const steps: Step[] = [
    {
        number: "01",
        title: "Nos contás tu idea",
        text: "Nos explicás tu negocio y qué querés lograr.",
    },
    {
        number: "02",
        title: "Definimos la solución",
        text: "Acordamos cómo debe ser tu web para que funcione.",
    },
    {
        number: "03",
        title: "Diseñamos tu página",
        text: "Creamos la web y ajustamos detalles con vos.",
    },
    {
        number: "04",
        title: "Entrega",
        text: "Tu web terminada, lista para conseguir clientes.",
        highlight: true,
    },
];

export default function AbautUs() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const revealRefs = useRef<HTMLDivElement[]>([]);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useGSAP(
        () => {
            revealRefs.current = revealRefs.current.filter(Boolean);

            gsap.fromTo(
                revealRefs.current,
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.to(
                ".step-element",
                {
                    strokeDashoffset: 0,
                    duration: 0.3,
                    ease: "none",
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: "#proceso",
                        start: "top 75%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="nosotros"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#09090E] px-6 py-24 text-[#F2F2F4] md:px-10 font-sans"
        >
            <div className="pointer-events-none absolute -left-24 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-400/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div ref={addToRefs} className="mb-20 text-center" style={{ opacity: 1 }}>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        Quienes somos
                    </div>

                    <h1 className="mb-5 text-4xl sm:text-4xl md:text-5xl lg:text-[70px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px]">
                        Sobre Linel
                    </h1>

                    <p className="mx-auto max-w-2xl text-sm sm:text-base leading-7 text-white md:text-lg md:leading-8" style={{ opacity: 1 }}>
                        Creamos páginas web claras, rápidas y pensadas para generar resultados.
                    </p>
                </div>

                <div className="mb-20 grid items-center gap-8 md:grid-cols-2">
                    <div ref={addToRefs} className="text-center lg:text-left flex flex-col items-center lg:items-start">
                        <h2 className="mb-5 text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px]">
                            Tu negocio, pero ahora
                            <span className="bg-[#00D2D3] to-pink-500 bg-clip-text text-transparent"> online.</span>
                        </h2>

                        <p className="mb-4 text-sm sm:text-base font-medium leading-7 text-white md:text-lg md:leading-8" style={{ opacity: 1 }}>
                            Ayudamos a personas y negocios que todavía no tienen presencia online
                            a dar ese primer paso de forma profesional.
                        </p>

                        <p className="text-sm sm:text-base font-medium leading-7 text-white md:text-lg md:leading-8" style={{ opacity: 1 }}>
                            Hacemos webs que representan bien tu negocio, generan confianza y
                            ayudan a conseguir clientes. Te acompañamos en todo el proceso,
                            incluso si no tenés experiencia.
                        </p>
                    </div>

                    <div
                        ref={addToRefs}
                        className="rounded-[20px] bg-white/10 p-[1px]"
                    >
                        <div className="h-full rounded-[19px] border border-white/5 bg-[#111118] p-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/15 to-pink-500/15">
                                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                    <defs>
                                        <linearGradient id="boltGradient" x1="3" y1="2" x2="21" y2="22">
                                            <stop stopColor="#00D2D3" />
                                            <stop offset="1" stopColor="#EE32A0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                                        stroke="url(#boltGradient)"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <p className="mb-4 text-lg sm:text-xl font-semibold leading-7 sm:leading-8 text-white">
                                Ordenamos tu idea y la convertimos en una página que funciona.
                            </p>

                            <p className="text-sm leading-7 text-white/70">
                                No importa el punto de partida. Si tenés un negocio pero no sabés
                                por dónde arrancar online, nosotros nos encargamos.
                            </p>

                            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                <div>
                                    <div className="bg-cyan-400 bg-clip-text text-1xl sm:text-1xl font-extrabold text-transparent">
                                        100% Acompañamiento
                                    </div>
                                    <div className="mt-1 text-xs text-white/70">completo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-20 grid items-start gap-8 md:grid-cols-2">
                    <div ref={addToRefs} className="text-center lg:text-left flex flex-col items-center lg:items-start">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                            Nuestra diferencia
                        </div>

                        <h2 className="mb-3 text-4xl sm:text-4xl md:text-5xl lg:text-[70px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px]">
                            Por qué

                            <span className="bg-[#EE32A0] bg-clip-text text-transparent"> elegirnos</span>
                        </h2>

                        <p className="text-sm leading-7 text-white/70 md:text-lg" style={{ opacity: 1 }}>
                            Trabajamos distinto. No hacemos webs en serie, acompañamos tu
                            proceso de principio a fin.
                        </p>

                        <div className="mt-8 sm:mt-12 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-[32px] sm:rounded-full border border-white/10 bg-white/5 p-5 sm:p-3 sm:pr-8 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
                            <img 
                                src={perfilAgus} 
                                alt="Augusto Lionel Lastre" 
                                className="h-32 w-32 sm:h-[142px] sm:w-[142px] rounded-full object-cover ring-[4px] ring-[#00D2D3] p-1.5"
                            />
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <span className="text-base sm:text-lg font-bold text-white tracking-wide">AUGUSTO LIONEL LASTRE</span>
                                <span className="text-xs sm:text-sm font-semibold text-[#00D2D3]">desarrollador Web FullStack.</span>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={addToRefs}
                        className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
                    >
                        {differentiators.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-4 lg:gap-5 py-6 ${index !== differentiators.length - 1 ? "border-b border-white/10" : ""
                                    }`}
                            >
                                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                                    {item.icon}
                                </div>

                                <div>
                                    <p className="mb-1 lg:mb-2 text-[17px] font-semibold text-white">
                                        {item.title}
                                    </p>
                                    <p className="text-[15px] leading-7 text-white/70">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="proceso" ref={addToRefs} className="mb-20">
                    <div className="mb-14 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                            El proceso
                        </div>

                        <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-[60px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px]">
                            Cómo{" "}
                            <span className="bg-cyan-400 bg-clip-text text-transparent">
                                trabajamos
                            </span>
                        </h2>
                    </div>

                    <div className="grid gap-12 sm:gap-14 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="text-center relative">
                                <div
                                    className="relative mx-auto mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/15 to-pink-500/15 z-10"
                                >
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 rounded-full" viewBox="0 0 88 88">
                                        <circle cx="44" cy="44" r="43" stroke="currentColor" strokeWidth="2" fill="none" className="text-cyan-400/20" />
                                        <circle 
                                            cx="44" cy="44" r="43" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            fill="none" 
                                            className="text-cyan-400 step-element overflow-visible" 
                                            strokeDasharray="271" 
                                            strokeDashoffset="271" 
                                            strokeLinecap="round" 
                                        />
                                    </svg>
                                    <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent relative z-10">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Animated Line connecting to the next step (Desktop only) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-[44px] left-[calc(50%+44px)] w-[calc(100%+56px-88px)] h-[2px] -translate-y-1/2 z-0">
                                        <svg className="w-full h-full" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor={index === 0 ? "#00D2D3" : index === 1 ? "#4F9CC2" : "#9E67B1"} />
                                                    <stop offset="100%" stopColor={index === 0 ? "#4F9CC2" : index === 1 ? "#9E67B1" : "#EE32A0"} />
                                                </linearGradient>
                                            </defs>
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" className="text-white/10" />
                                            <line 
                                                x1="0" y1="1" x2="100%" y2="1" 
                                                stroke={`url(#grad-${index})`} 
                                                strokeWidth="2" 
                                                strokeDasharray="1" 
                                                strokeDashoffset="1" 
                                                pathLength="1" 
                                                className="step-element" 
                                            />
                                        </svg>
                                    </div>
                                )}

                                <h4 className="mb-3 text-xl sm:text-2xl font-serif italic font-semibold text-white">
                                    {step.title}
                                </h4>

                                <p className="text-sm sm:text-base leading-relaxed text-white/85">
                                    {step.text}
                                </p>

                                {step.highlight && (
                                    <span className="mt-5 inline-block rounded-full bg-[#EE32A0] px-5 py-1.5 text-xs font-bold tracking-[0.08em] text-white">
                                        LISTO
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    ref={addToRefs}
                    className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111118] px-7 py-14 text-center md:px-14 md:py-20"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,210,211,0.06)_0%,transparent_50%,rgba(238,50,160,0.06)_100%)]" />

                    <div className="pointer-events-none absolute left-8 top-6 text-[7rem] font-extrabold leading-none text-white/10 md:text-[8rem]">
                        "
                    </div>

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <p className="mb-20 pt-10 text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-serif font-normal text-[#FFFCF2] leading-snug lg:leading-[75px]">
                            “Quien no se muestra, no vende. Tu web es el primer paso.”

                        </p>

                        <a
                            href="#contacto"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-3 rounded-full bg-[#EE32A0] px-8 py-3 sm:px-10 sm:py-4 text-lg sm:text-xl md:text-2xl font-serif italic font-normal tracking-[0.04em] text-white transition duration-300 hover:-translate-y-0.5"
                        >
                            Quiero mi web
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
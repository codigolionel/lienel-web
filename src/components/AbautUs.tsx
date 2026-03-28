import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        title: "Te guiamos, no solo diseñamos",
        text: "Estamos en todo el proceso, no solo entregamos el archivo.",
        icon: (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
        text: "Priorizamos que la web funcione para vos, no solo que se vea bonita.",
        icon: (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
        text: "Webs que generan confianza y convierten visitas en clientes.",
        icon: (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
        text: "Nuestro cliente ideal no tiene experiencia digital. Eso no es un problema.",
        icon: (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
                    <div ref={addToRefs}>
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
                        className="rounded-[20px] bg-gradient-to-br from-cyan-400/40 to-pink-500/40 p-[1px]"
                    >
                        <div className="h-full rounded-[19px] border border-white/5 bg-[#111118] p-8">
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
                                    <div className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl sm:text-3xl font-extrabold text-transparent">
                                        100%
                                    </div>
                                    <div className="mt-1 text-xs text-white/70">Acompañamiento</div>
                                </div>

                                <div>
                                    <div className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-2xl sm:text-3xl font-extrabold text-transparent">
                                        0
                                    </div>
                                    <div className="mt-1 text-xs text-white/70">
                                        Experiencia previa necesaria
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-20 grid items-start gap-8 md:grid-cols-2">
                    <div ref={addToRefs}>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-cyan-400 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
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
                    </div>

                    <div
                        ref={addToRefs}
                        className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
                    >
                        {differentiators.map((item, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 py-4 ${index !== differentiators.length - 1 ? "border-b border-white/5" : ""
                                    }`}
                            >
                                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-white/5">
                                    {item.icon}
                                </div>

                                <div>
                                    <p className="mb-1 text-[15px] font-semibold text-white">
                                        {item.title}
                                    </p>
                                    <p className="text-sm leading-6 text-white/70">{item.text}</p>
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

                        <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-[60px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px]">
                            Cómo{" "}
                            <span className="bg-cyan-400 bg-clip-text text-transparent">
                                trabajamos
                            </span>
                        </h2>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <div key={step.number} className="text-center">
                                <div
                                    className="relative mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 to-pink-500/15"
                                >
                                    <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-xl font-extrabold text-transparent">
                                        {step.number}
                                    </span>
                                </div>

                                <h4 className="mb-2 text-xl sm:text-2xl font-serif italic font-semibold text-white">
                                    {step.title}
                                </h4>

                                <p className="text-sm sm:text-base leading-relaxed text-white/70">
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
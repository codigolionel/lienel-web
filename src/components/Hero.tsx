import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Hero = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const textRef1 = useRef<HTMLParagraphElement>(null)
    const textRef2 = useRef<HTMLParagraphElement>(null)
    const textRef3 = useRef<HTMLParagraphElement>(null)
    const btnRef = useRef<HTMLDivElement>(null)
    const animatedTextRef = useRef<HTMLSpanElement>(null)

    useGSAP(() => {

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(textRef1.current,
            { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
            { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 },
            0.2
        )
            .fromTo(textRef2.current,
                { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 },
                0.4
            )
            .fromTo(textRef3.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                0.7
            )
            .fromTo(btnRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                0.9
            );

        const typeTl = gsap.timeline({ repeat: -1, delay: 1.5 });
        const messages = [
            "tu negocio necesita.",
            "trabaja por vos 24/7.",
            "te muestra al Mercado.",
            "tu necesitas hoy !",
        ];

        if (animatedTextRef.current) {
            messages.forEach((msg, index) => {
                const isLast = index === messages.length - 1;

                // Type
                typeTl.to(animatedTextRef.current, {
                    duration: 2.2,
                    ease: "none",
                    onUpdate: function () {
                        const progress = this.progress();
                        const charCount = Math.floor(progress * msg.length);
                        if (animatedTextRef.current) animatedTextRef.current.innerText = msg.substring(0, charCount);
                    }
                })
                    // Hold
                    .to(animatedTextRef.current, { duration: isLast ? 4 : 3.5 });

                // Erase (even the last one so it loops back to empty)
                typeTl.to(animatedTextRef.current, {
                    duration: 0.8,
                    ease: "none",
                    onUpdate: function () {
                        const progress = 1 - this.progress();
                        const charCount = Math.floor(progress * msg.length);
                        if (animatedTextRef.current) animatedTextRef.current.innerText = msg.substring(0, charCount);
                    }
                });
            });
        }

    }, { scope: containerRef })

    return (

        <section
            id="inicio"
            ref={containerRef}
            className="relative w-full p-6 sm:p-8 pt-20 bg-charcoal text-primary overflow-hidden flex flex-col items-center justify-center min-h-[100dvh]"
        >

            {/* content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8 md:gap-12 mt-32 md:mt-40 font-serif">

                <div className="flex flex-col gap-4 text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">

                    <div ref={textRef1} className="text-primary font-medium inline-flex flex-col md:flex-row items-center text-left mx-auto relative w-full md:w-auto">
                        {/* Plantilla invisible para bloquear el ancho y evitar saltos */}
                        <div className="opacity-0 pointer-events-none select-none flex flex-col md:flex-row items-center w-full md:w-fit mx-auto" aria-hidden="true">
                            <span className="md:mr-3 text-center md:text-left w-full md:w-auto">La Web que</span>
                            <span className="italic flex items-center justify-center md:justify-start w-full md:w-auto">te muestra al Mercado.<span className="inline-block w-[3px] md:w-[5px] ml-1 sm:ml-2"></span></span>
                        </div>

                        {/* Texto animado visible */}
                        <div className="absolute inset-0 flex flex-col md:flex-row items-center w-full">
                            <span className="md:mr-3 text-center md:text-left w-full md:w-auto">La Web que</span>
                            <span className="flex items-center justify-center md:justify-start w-full md:w-auto">
                                <span ref={animatedTextRef} className="text-accent italic whitespace-nowrap"></span>
                                <span className="inline-block w-[3px] md:w-[5px] h-[35px] sm:h-[50px] md:h-[65px] lg:h-[80px] bg-accent ml-1 sm:ml-2 animate-[pulse_1s_step-end_infinite]"></span>
                            </span>
                        </div>
                    </div>

                    <p ref={textRef2} className="text-white/80 italic text-4xl sm:text-5xl md:text-6xl mt-2 sm:mt-4">
                        Lista para vos.
                    </p>

                </div>

                <p ref={textRef3} className="text-white/60 font-sans text-base md:text-xl max-w-2xl mx-auto font-medium mt-4">
                    Sin complicaciones. Diseño de sitios claros, rápidos y adaptados a tu necesidad.
                </p>

                <div ref={btnRef} className="mt-8 font-sans">
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-base sm:text-lg md:px-6 md:py-3 md:text-base font-semibold text-white transition-all duration-300 hover:scale-105 group hover:border-white/40"
                    >
                        <span className="absolute inset-0 bg-accent translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-0"></span>
                        <span className="relative z-10 flex items-center gap-2 text-white">
                            Cotizar mi web
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 md:w-[18px] md:h-[18px] transition-transform group-hover:translate-x-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </a>
                </div>

            </div>

        </section>

    )
}

export default Hero
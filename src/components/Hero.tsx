import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import wallpaper from "../assets/background-violet-blue.webp"

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
            { y: 50, opacity: 0, clipPath: 'inset(100% -10% -10% -10%)' },
            { y: 0, opacity: 1, clipPath: 'inset(-10% -10% -10% -10%)', duration: 1, clearProps: 'clipPath' },
            0.2
        )
            .fromTo(textRef2.current,
                { y: 50, opacity: 0, clipPath: 'inset(100% -10% -10% -10%)' },
                { y: 0, opacity: 1, clipPath: 'inset(-10% -10% -10% -10%)', duration: 1, clearProps: 'clipPath' },
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
            "generar consultas.",
            "conseguir clientes.",
            "atender las 24 hs.",
            "aumentar tus ventas.",
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
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"


            }}
            className="relative w-full p-6 sm:p-8 pt-20 text-primary overflow-hidden flex flex-col items-center justify-center min-h-[100dvh]"
        >
            {/* CAPA OSCURA */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/60 z-0"></div>

            {/* CONTENIDO */}
            <div className="relative z-10">
                {/* todo tu contenido */}
            </div>

            {/* content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8 md:gap-12 mt-32 md:mt-40 font-serif">

                <div className="flex flex-col gap-4 text-5xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">

                    <div ref={textRef1} className="text-primary font-medium inline-flex flex-col items-center text-center mx-auto relative w-full pb-3 md:pb-5">

                        {/* Line 1: mobile/tablet="Tu negocio en internet," desktop="Tu negocio en internet, listo" */}
                        <span className="w-full">
                            <span>Tu negocio en internet listo</span>
                            <span className="hidden lg:inline"></span>
                        </span>

                        {/* Line 2: mobile/tablet="listo para:" desktop="para + slider" */}
                        <span className="flex flex-col lg:flex-row items-center justify-center w-full">
                            <span className="lg:hidden">para</span>
                            <span className="hidden lg:inline lg:mr-3">para</span>

                            {/* Animated Typewriter block (CSS Grid ensures perfect stability without duplicate layout jumps) */}
                            <span className="grid place-items-center lg:place-items-start relative mt-1 lg:mt-0">
                                {/* Spacer: reserves maximum width so "para" stays locked in place */}
                                <span className="invisible italic whitespace-nowrap col-start-1 row-start-1"> aumentar tus ventas.<span className="inline-block w-[3px] lg:w-[5px] ml-1 sm:ml-2"></span></span>

                                {/* Visible animated overlay */}
                                <span className="flex items-center justify-center lg:justify-start col-start-1 row-start-1 w-full h-full">
                                    <span ref={animatedTextRef} className="text-[#00D2D3] italic whitespace-nowrap"></span>
                                    <span className="inline-block w-[3px] lg:w-[5px] h-[35px] sm:h-[45px] md:h-[60px] lg:h-[75px] bg-[#00D2D3] ml-1 sm:ml-2 animate-[pulse_1s_step-end_infinite]"></span>
                                </span>
                            </span>
                        </span>

                    </div>


                </div>

                <p ref={textRef3} className="text-white/80 font-sans text-base sm:text-lg md:text-lg lg:text-xl max-w-2xl mx-auto font-medium mt-4">
                    Creamos páginas web para negocios, profesionales y emprendedores que quieren conseguir más clientes desde internet.
                </p>

                <div ref={btnRef} className="mt-8 font-sans flex flex-col sm:flex-row items-center gap-4">
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EE32A0] backdrop-blur-sm px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base font-semibold text-white transition-all duration-300 hover:scale-105 group"
                    >
                        <span className="absolute inset-0 bg-[#00D2D3] translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-0"></span>
                        <span className="relative z-10 flex items-center gap-2 text-white transition-colors duration-300 group-hover:text-black">
                            Empezar ahora
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 md:w-[18px] md:h-[18px] transition-transform group-hover:translate-x-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </a>

                    <a
                        href="#sobre-linel"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/20 hover:border-transparent hover:scale-105"
                        style={{ color: '#ffffff' }}
                    >
                        Cómo trabajamos
                    </a>
                </div>

            </div>

        </section>

    )
}

export default Hero
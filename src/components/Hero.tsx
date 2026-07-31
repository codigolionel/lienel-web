import { useRef, useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import heroAurora from "../assets/hero-aurora.png"

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef1 = useRef<HTMLParagraphElement>(null)
    const textRef3 = useRef<HTMLParagraphElement>(null)
    const btnRef = useRef<HTMLDivElement>(null)
    const animatedTextRef = useRef<HTMLSpanElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    /* ─── Parallax mouse tracker ─── */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2
            const y = (e.clientY / window.innerHeight - 0.5) * 2
            setMousePos({ x, y })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                x: mousePos.x * 20,
                y: mousePos.y * 15,
                duration: 2,
                ease: "power1.out",
            })
        }
    }, [mousePos])

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        // Glow entrance
        tl.fromTo(
            glowRef.current,
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
            0
        )

        tl.fromTo(
            textRef1.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, clearProps: "all" },
            0.15
        )
            .fromTo(
                textRef3.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 },
                0.55
            )
            .fromTo(
                btnRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                0.75
            )
            .fromTo(
                statsRef.current,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                0.95
            )

        // Glow continuous pulse
        gsap.to(glowRef.current, {
            scale: 1.1,
            opacity: 0.8,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })

        const typeTl = gsap.timeline({ repeat: -1, delay: 1.2 })
        const messages = [
            "generar consultas.",
            "conseguir clientes.",
            "atender las 24 hs.",
            "aumentar tus ventas.",
        ]

        if (animatedTextRef.current) {
            messages.forEach((msg, index) => {
                const isLast = index === messages.length - 1

                // Type
                typeTl.to(animatedTextRef.current, {
                    duration: 2.0,
                    ease: "none",
                    onUpdate: function () {
                        const progress = this.progress()
                        const charCount = Math.floor(progress * msg.length)
                        if (animatedTextRef.current) {
                            animatedTextRef.current.innerText = msg.substring(0, charCount)
                        }
                    }
                })
                    // Hold
                    .to(animatedTextRef.current, { duration: isLast ? 4 : 3.2 })

                // Erase
                typeTl.to(animatedTextRef.current, {
                    duration: 0.7,
                    ease: "none",
                    onUpdate: function () {
                        const progress = 1 - this.progress()
                        const charCount = Math.floor(progress * msg.length)
                        if (animatedTextRef.current) {
                            animatedTextRef.current.innerText = msg.substring(0, charCount)
                        }
                    }
                })
            })
        }
    }, { scope: containerRef })

    return (
        <section
            id="inicio"
            ref={containerRef}
            className="relative w-full px-6 sm:px-8 pt-24 pb-20 text-primary overflow-hidden flex flex-col items-center justify-center min-h-[100dvh]"
        >
            {/* ─── Background image ─── */}
            <img
                src={heroAurora}
                alt=""
                aria-hidden="true"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Dark overlay — lighter so the aurora shows through */}
            <div className="absolute inset-0 bg-black/35 md:bg-black/40 z-0" />

            {/* ─── Radial glow behind title ─── */}
            <div
                ref={glowRef}
                className="absolute z-[1] pointer-events-none opacity-0"
                style={{
                    width: "600px",
                    height: "600px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -55%)",
                    background: "radial-gradient(ellipse, rgba(238,50,160,0.1) 0%, rgba(75,0,130,0.06) 45%, transparent 70%)",
                    filter: "blur(70px)",
                }}
            />



            {/* ─── Main content ─── */}
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-0 mt-12 md:mt-16">

                {/* Headline */}
                <div
                    ref={textRef1}
                    className="font-serif w-full"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-medium leading-[1.04] tracking-[-0.02em] text-white">
                        Tu Página Web
                        <br />
                        lista para:{" "}
                        <span className="relative inline-grid">
                            {/* Spacer keeps layout stable */}
                            <span className="invisible italic whitespace-nowrap col-start-1 row-start-1 text-[#00D2D3]">
                                aumentar tus ventas.
                                <span className="inline-block w-[3px] lg:w-[4px] ml-1" />
                            </span>
                            {/* Animated text overlay */}
                            <span className="col-start-1 row-start-1 flex items-center justify-center">
                                <span
                                    ref={animatedTextRef}
                                    className="italic whitespace-nowrap text-[#00D2D3]"
                                />
                                <span className="inline-block w-[3px] lg:w-[4px] h-[38px] sm:h-[48px] md:h-[58px] lg:h-[72px] bg-[#00D2D3] ml-1 animate-[pulse_1s_step-end_infinite] opacity-90" />
                            </span>
                        </span>
                    </h1>
                </div>

                {/* Subheading */}
                <p
                    ref={textRef3}
                    className="text-white/65 font-sans text-base sm:text-lg max-w-xl mx-auto font-normal mt-7 leading-relaxed"
                >
                    Creamos tu web desde cero. Vos solo contanos tu negocio y del resto, nos ocupamos nosotros.
                </p>

                {/* CTAs */}
                <div ref={btnRef} className="mt-9 font-sans flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <a
                        href="https://wa.me/5491165657291"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[220px] relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EE32A0] py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] group shadow-[0_0_24px_rgba(238,50,160,0.35)] hover:shadow-[0_0_40px_rgba(238,50,160,0.55)]"
                    >
                        <span className="absolute inset-0 bg-[#EE32A0]/80 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-0" />
                        <span className="relative z-10 flex items-center gap-2">
                            Quiero mi web
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </a>

                    <a
                        href="#proceso"
                        onClick={(e) => {
                            e.preventDefault()
                            document.querySelector("#proceso")?.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="w-[220px] flex items-center justify-center gap-2 rounded-full border border-white/12 py-3.5 md:py-4 text-sm md:text-base font-medium text-white/70 transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:text-white/90"
                    >
                        Cómo trabajamos
                    </a>
                </div>

                {/* Stats strip */}
                <div
                    ref={statsRef}
                    className="mt-10 md:mt-16 flex items-center justify-center gap-2 sm:gap-3"
                >
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm whitespace-nowrap">
                        <span className="text-[#00D2D3] text-[9px] sm:text-xs font-bold font-mono tracking-wide">24/7</span>
                        <span className="text-white/50 text-[9px] sm:text-xs tracking-wide">Soporte continuo</span>
                    </div>
                    <div className="w-px h-3 sm:h-4 bg-white/10 flex-shrink-0" />
                    <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm whitespace-nowrap">
                        <span className="text-[#00D2D3] text-[9px] sm:text-xs font-bold font-mono tracking-wide">1 a 1</span>
                        <span className="text-white/50 text-[9px] sm:text-xs tracking-wide">Atención personalizada</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
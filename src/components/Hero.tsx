import { useRef, useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import wallpaper from "../assets/background-violet-blue.webp"

/* ─── Floating Orb component ─── */
const FloatingOrb = ({ size, x, y, color, delay, duration }: {
    size: number; x: string; y: string; color: string; delay: number; duration: number;
}) => {
    const orbRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!orbRef.current) return
        gsap.set(orbRef.current, { x: 0, y: 0, scale: 0.8, opacity: 0 })
        gsap.to(orbRef.current, { opacity: 1, scale: 1, duration: 2, delay, ease: "power2.out" })
        gsap.to(orbRef.current, {
            y: "random(-40, 40)",
            x: "random(-30, 30)",
            duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay,
        })
    }, [delay, duration])

    return (
        <div
            ref={orbRef}
            className="absolute rounded-full pointer-events-none opacity-0"
            style={{
                width: size,
                height: size,
                left: x,
                top: y,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(${size * 0.4}px)`,
            }}
        />
    )
}

const Hero = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const textRef1 = useRef<HTMLParagraphElement>(null)
    const textRef2 = useRef<HTMLParagraphElement>(null)
    const textRef3 = useRef<HTMLParagraphElement>(null)
    const btnRef = useRef<HTMLDivElement>(null)
    const animatedTextRef = useRef<HTMLSpanElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
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
                x: mousePos.x * 30,
                y: mousePos.y * 20,
                duration: 1.2,
                ease: "power2.out",
            })
        }
    }, [mousePos])

    useGSAP(() => {

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Badge entrance
        tl.fromTo(badgeRef.current,
            { y: -20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8 },
            0.1
        )

        // Glow pulse
        tl.fromTo(glowRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
            0
        )

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
            )
            .fromTo(statsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                1.1
            );

        // Glow continuous pulse
        gsap.to(glowRef.current, {
            scale: 1.15,
            opacity: 0.7,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })

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

            {/* ─── Floating Orbs ─── */}
            <FloatingOrb size={200} x="8%" y="15%" color="rgba(238,50,160,0.15)" delay={0} duration={7} />
            <FloatingOrb size={150} x="75%" y="20%" color="rgba(0,210,211,0.12)" delay={0.5} duration={9} />
            <FloatingOrb size={120} x="85%" y="65%" color="rgba(75,0,130,0.18)" delay={1} duration={8} />
            <FloatingOrb size={100} x="15%" y="70%" color="rgba(0,210,211,0.1)" delay={1.5} duration={10} />
            <FloatingOrb size={80} x="50%" y="80%" color="rgba(238,50,160,0.08)" delay={2} duration={11} />
            <FloatingOrb size={160} x="40%" y="10%" color="rgba(75,0,130,0.1)" delay={0.8} duration={8.5} />

            {/* ─── Radial glow behind title ─── */}
            <div
                ref={glowRef}
                className="absolute z-[1] pointer-events-none opacity-0"
                style={{
                    width: '700px',
                    height: '700px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -55%)',
                    background: 'radial-gradient(ellipse, rgba(238,50,160,0.12) 0%, rgba(75,0,130,0.08) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* ─── Subtle grid overlay ─── */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* CONTENIDO */}
            <div className="relative z-10">
                {/* todo tu contenido */}
            </div>

            {/* content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-6 md:gap-10 mt-20 md:mt-28 font-serif">

                {/* ─── Credibility Badge ─── */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.18em] text-white/60 opacity-0"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2D3] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2D3]"></span>
                    </span>
                    Diseño Web
                </div>

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

                <p ref={textRef3} className="text-white/70 font-sans text-base sm:text-lg md:text-lg lg:text-lg max-w-2xl mx-auto font-medium mt-4">
                    Creamos páginas web para negocios, profesionales y emprendedores que quieren conseguir más clientes desde internet.
                </p>

                <div ref={btnRef} className="mt-8 font-sans flex flex-col sm:flex-row items-center gap-4">
                    <a
                        href="https://wa.me/5491165657291"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EE32A0] backdrop-blur-sm px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base font-semibold text-white transition-all duration-300 hover:scale-105 group shadow-[0_0_30px_rgba(238,50,160,0.3)] hover:shadow-[0_0_50px_rgba(238,50,160,0.5)]"
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
                        href="#proceso"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#proceso')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-105"
                        style={{ color: '#ffffff' }}
                    >
                        Cómo trabajamos

                    </a>
                </div>

                {/* ─── Social Proof / Stats Strip ─── */}
                <div
                    ref={statsRef}
                    className="mt-10 md:mt-14 flex items-center justify-center gap-4 sm:gap-6 md:gap-10 font-sans text-white/40 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] opacity-0"
                >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[#00D2D3] text-xs sm:text-sm md:text-base font-bold not-italic">24/7</span>
                        <span>Soporte continuo</span>
                    </div>
                    <div className="w-px h-4 bg-white/10 mx-1 sm:mx-0"></div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[#EE32A0] text-xs sm:text-sm md:text-base font-bold not-italic">1 a 1</span>
                        <span>Atención personalizada</span>
                    </div>
                </div>

            </div>

            {/* ─── Bottom gradient fade to surface ─── */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-[2] pointer-events-none"></div>

        </section>

    )
}

export default Hero
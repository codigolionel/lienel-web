import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Hero = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const textRef1 = useRef<HTMLHeadingElement>(null)
    const textRef2 = useRef<HTMLHeadingElement>(null)

    const bg1Ref = useRef<HTMLDivElement>(null)
    const bg2Ref = useRef<HTMLDivElement>(null)
    const bg3Ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        gsap.set([textRef1.current, textRef2.current, ".hero-fade"], {
            y: 40,
            opacity: 0,
            rotationX: -10,
            transformPerspective: 1000
        })

        gsap.set(bg1Ref.current, { opacity: 1, scale: 1.05 })
        gsap.set([bg2Ref.current, bg3Ref.current], { opacity: 0, scale: 1.05 })

        tl
            .to(textRef1.current, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.2
            }, 0.4)

            .to(textRef2.current, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.2
            }, 0.6)

            .to(".hero-fade", {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1,
                stagger: 0.15
            }, 0.9)

        const slider = gsap.timeline({ repeat: -1 })

        slider
            .to(bg1Ref.current, {
                scale: 1.15,
                duration: 10,
                ease: "none"
            })

            .to(bg2Ref.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            }, "-=3")

            .to(bg1Ref.current, {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut"
            }, "<")

            .to(bg2Ref.current, {
                scale: 1.15,
                duration: 10,
                ease: "none"
            }, "<")

            .to(bg3Ref.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            }, "-=3")

            .to(bg2Ref.current, {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut"
            }, "<")

            .to(bg3Ref.current, {
                scale: 1.15,
                duration: 10,
                ease: "none"
            }, "<")

            .to(bg1Ref.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            }, "-=3")

            .to(bg3Ref.current, {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut"
            }, "<")

            .set(bg1Ref.current, { scale: 1.05 })
            .set(bg2Ref.current, { scale: 1.05 })
            .set(bg3Ref.current, { scale: 1.05 })

    }, { scope: containerRef })

    return (

        <section
            id="inicio"
            ref={containerRef}
            className="relative h-[100dvh] w-full overflow-hidden flex items-center md:items-end"
        >

            {/* backgrounds */}

            <div
                ref={bg1Ref}
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe")'
                }}
            />

            <div
                ref={bg2Ref}
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee")'
                }}
            />

            <div
                ref={bg3Ref}
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1492724441997-5dc865305da7")'
                }}
            />

            {/* gradient */}

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-[#0a0a0c]/80 to-transparent"></div>

            {/* content */}

            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center md:items-start md:text-left justify-center md:justify-end h-full gap-12 md:gap-4 md:pb-32">

                <h1 className="flex flex-col gap-6 md:gap-3">

                    <span
                        ref={textRef1}
                        className="block font-sans font-bold text-3xl sm:text-5xl md:text-6xl text-primary tracking-tight"
                    >
                        La Web que Imaginas…
                    </span>

                    <span
                        ref={textRef2}
                        className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-primary leading-[0.9]"
                    >
                        Lista para vos.
                    </span>

                </h1>

                <p className="hero-fade text-white/80 font-sans text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-medium md:mt-2">
                    Sin complicaciones. Diseño de sitios claros, rápidos y adaptados a tu necesidad.
                </p>

                <div className="hero-fade">

                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white px-7 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-105 group"
                    >

                        <span className="absolute inset-0 bg-[#25D366] translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-0"></span>

                        <span className="relative z-10 flex items-center gap-2 text-white">

                            Cotizar mi web

                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform group-hover:translate-x-1"
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
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import webDesignDark from "../assets/parejaGemini3.png";

gsap.registerPlugin(ScrollTrigger);

const Archive = () => {
    const containerRef = useRef(null);

    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);

    const imageCard1Ref = useRef(null);

    const cursorRef = useRef(null);
    const buttonRef = useRef(null);
    const panelRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

        mm.add("(min-width: 768px)", () => {
            cards.forEach((card, index) => {
                if (!card) return;

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    pin: true,
                    pinSpacing: false,
                    endTrigger: containerRef.current,
                    end: 'bottom bottom',
                });

                if (index < cards.length - 1 && cards[index + 1]) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.85,
                        filter: 'blur(4px)',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: 'top bottom',
                            end: 'top top',
                            scrub: true,
                        }
                    });
                }
            });
        });

        if (imageCard1Ref.current && card1Ref.current) {
            gsap.from(imageCard1Ref.current, {
                y: 50,
                scale: 0.95,
                duration: 1.2,
                ease: "power3.out",
                clearProps: 'transform',
                scrollTrigger: {
                    trigger: card1Ref.current,
                    start: "top 75%",
                    once: true,
                }
            });
        }

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.8,
            paused: true,
        });

        tl
            .set(".terminal-line", { opacity: 0, y: 10 })
            .set(buttonRef.current, { opacity: 0 })
            .set(cursorRef.current, { x: 0, y: 0, scale: 1 })
            .set(panelRef.current, { opacity: 0, scale: 0.9 })

            .to(".terminal-line", {
                opacity: 1,
                y: 0,
                stagger: 0.4,
                duration: 0.5
            })

            .to(buttonRef.current, {
                opacity: 1,
                duration: 0.4
            })

            .to(cursorRef.current, {
                x: 170,
                y: 80,
                duration: 1.2,
                ease: "power2.out"
            })

            .to(cursorRef.current, {
                scale: 0.8,
                duration: 0.15,
                yoyo: true,
                repeat: 1
            })

            .to(panelRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5
            })

            .to({}, { duration: 2.5 })

            .to(panelRef.current, {
                opacity: 0,
                duration: 0.4
            });

        if (card2Ref.current) {
            ScrollTrigger.create({
                trigger: card2Ref.current,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => tl.play(),
                onLeave: () => tl.pause(),
                onEnterBack: () => tl.play(),
                onLeaveBack: () => tl.pause(),
            });
        }

        return () => {
            mm.revert();
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="servicios" className="relative w-full bg-base">

            {/* CARD 1 */}
            <div
                ref={card1Ref}
                className="h-auto md:h-[100dvh] w-full flex items-start md:items-center justify-center p-4 md:p-8 bg-[#0B0B10] text-[#FFFFFF] border-b border-white/10 origin-top"
            >
                <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between">

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-serif italic font-normal text-[#FFFCF2] leading-[1.1] mb-6 text-pretty">
                            Diseño Web,<br className="hidden md:block"/> <span className="text-[#00D2D3]">sin límites.</span>
                        </h2>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-light leading-relaxed" style={{opacity: 1}}>
                            Desarrollamos páginas escalables, seguras y fáciles de administrar garantizando la expansión y rendimiento a largo plazo.
                        </p>
                    </div>

                    <div
                        ref={imageCard1Ref}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(0,210,211,0.15)] border border-[#00D2D3]/20 transition-transform hover:scale-[1.02] duration-500 bg-[#111118]"
                    >
                        <img
                            src={webDesignDark}
                            alt="Concepto de Diseño Web"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none"></div>
                    </div>

                </div>
            </div>

            {/* CARD 2 */}
            <div
                ref={card2Ref}
                className="h-auto md:h-[100dvh] w-full flex items-start md:items-center justify-center p-4 md:p-8 bg-[#15151E] text-white border-b border-white/5 origin-top shadow-2xl"
            >
                <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6 md:gap-12 items-center">

                    <div className="w-full md:flex-1 order-2 md:order-1 flex justify-center">

                        <div className="w-full max-w-md aspect-[4/3] bg-black rounded-lg overflow-hidden relative border border-white/10 p-4 font-mono text-green-400 text-sm">
                            <div className="terminal-line">Initializing system...</div>
                            <div className="terminal-line">Loading framework...</div>
                            <div className="terminal-line">Optimizing performance...</div>
                            <div className="terminal-line">Deploying interface...</div>

                            <button
                                ref={buttonRef}
                                className="absolute bottom-6 right-6 bg-gradient-to-r from-[#00D2D3] to-[#EE32A0] text-white font-bold tracking-widest px-6 py-2 rounded-full opacity-0 hover:scale-105 transition"
                            >
                                CLICK
                            </button>

                            <div
                                ref={cursorRef}
                                className="absolute top-10 left-10 w-4 h-4 bg-[#00D2D3] rounded-full shadow-[0_0_15px_#00D2D3]"
                            ></div>

                            <div
                                ref={panelRef}
                                className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center text-white text-lg opacity-0 scale-90 pointer-events-none"
                            >
                                Entrando al Mundo Online ✓
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:flex-1 order-1 md:order-2 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight mb-6 text-white text-pretty leading-[1.1]">
                            Velocidad y <br/><span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#00D2D3] to-[#EE32A0] font-normal">Rendimiento.</span>
                        </h2>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed">
                            Optimizamos la carga de tu web para que tus visitantes naveguen rápido, fácil y sin interrupciones ni demoras.
                        </p>
                    </div>

                </div>
            </div>

            {/* CARD 3 */}
            <div
                ref={card3Ref}
                className="h-auto md:h-[100dvh] w-full flex flex-col justify-start md:justify-center items-center p-4 md:p-8 bg-[#0B0B10] origin-top shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
                <div className="max-w-6xl w-full flex flex-col items-center text-center gap-6 md:gap-12">

                    <div className="w-full h-20 md:h-32 relative overflow-hidden flex items-center justify-center">
                        <svg viewBox="0 0 500 100" className="w-[150%] h-full stroke-[#00D2D3] fill-none stroke-[3] drop-shadow-[0_0_8px_rgba(0,210,211,0.5)]">
                            <path
                                className="animate-[dash_2s_linear_infinite]"
                                strokeDasharray="20 40 20 500"
                                d="M 0 50 L 100 50 L 120 20 L 140 80 L 160 50 L 500 50"
                            />
                        </svg>

                        <style>{`
                            @keyframes dash {
                                0% { stroke-dashoffset: 580; }
                                100% { stroke-dashoffset: 0; }
                            }
                        `}</style>
                    </div>

                    <div className="pb-30 md:pb-20">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-serif italic font-normal tracking-tight mb-6 md:mb-12 text-[#FFFCF2] leading-[1.1] text-pretty">
                            Démosle vida a tus <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2D3] to-[#EE32A0] font-bold pr-2">Ideas.</span>
                        </h2>

                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-light max-w-3xl mx-auto text-white/80 text-pretty px-4 leading-relaxed">
                            Diseñamos ecosistemas digitales que se adaptan, evolucionan y generan resultados reales.
                        </p>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Archive;
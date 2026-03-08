import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Archive = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    const cursorRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

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

            if (index < cards.length - 1) {

                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.5,
                    filter: 'blur(20px)',
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


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card2Ref.current,
                start: "top center"
            }
        });

        tl.from(".terminal-line", {
            opacity: 0,
            y: 10,
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
            });

    }, { scope: containerRef });


    return (

        <section ref={containerRef} id="servicios" className="relative w-full bg-base">

            {/* CARD 1 */}

            <div ref={card1Ref} className="h-[100dvh] w-full flex items-center justify-center p-8 bg-[#fcf9f2] text-charcoal border-b border-black/10 origin-top">

                <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12 items-center justify-between">

                    <div className="flex-1 text-center md:text-left">

                        <h2 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight mb-6">
                            Diseño Web, <span className="font-serif italic text-accent">sin limites</span>
                        </h2>

                        <p className="text-lg opacity-80">
                            Desarrollamos páginas escalables, seguras y fáciles de administrar garantizando la expansión y rendimiento a largo plazo.
                        </p>

                    </div>


                    <div className="w-64 h-64 relative flex items-center justify-center">

                        <div className="absolute inset-0 border-4 border-dashed border-charcoal/20 rounded-full animate-[spin_10s_linear_infinite]"></div>

                        <div className="absolute inset-4 border-4 border-accent rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>

                        <div className="w-20 h-20 bg-charcoal rounded-full text-white flex items-center justify-center font-mono text-sm shadow-2xl">
                            Linel
                        </div>

                    </div>

                </div>

            </div>



            {/* CARD 2 */}

            <div ref={card2Ref} className="h-[100dvh] w-full flex items-center justify-center p-8 bg-charcoal text-primary border-b border-white/5 origin-top shadow-2xl">

                <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12 items-center">

                    {/* TERMINAL */}

                    <div className="w-full md:flex-1 order-2 md:order-1 flex justify-center">

                        <div className="w-full max-w-md aspect-[4/3] bg-black rounded-lg overflow-hidden relative border border-white/10 p-4 font-mono text-green-400 text-sm">

                            <div className="terminal-line">Initializing system...</div>
                            <div className="terminal-line">Loading framework...</div>
                            <div className="terminal-line">Optimizing performance...</div>
                            <div className="terminal-line">Deploying interface...</div>

                            <button
                                ref={buttonRef}
                                className="absolute bottom-6 right-6 bg-orange-500 text-white px-4 py-2 rounded opacity-0 hover:bg-orange-600 transition"
                            >
                                CLICK
                            </button>

                            {/* Cursor verde */}

                            <div
                                ref={cursorRef}
                                className="absolute top-10 left-10 w-4 h-4 bg-green-500 rounded-full"
                            ></div>


                            {/* Overlay final */}

                            <div
                                ref={panelRef}
                                className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center text-white text-lg opacity-0 scale-90 pointer-events-none"
                            >
                                Entrando al Mundo Online ✓
                            </div>

                        </div>

                    </div>


                    {/* TEXTO */}

                    <div className="w-full md:flex-1 order-1 md:order-2 text-center md:text-left">

                        <h2 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight mb-6">
                            Velocidad y <span className="font-serif italic text-accent">Rendimiento</span>
                        </h2>

                        <p className="text-lg opacity-80">
                            Optimizamos la carga de tu web para que tus visitantes naveguen rápido, fácil y sin interrupciones ni demoras.
                        </p>

                    </div>

                </div>

            </div>



            {/* CARD 3 */}

            <div ref={card3Ref} className="h-[100dvh] w-full flex items-center justify-center p-8 bg-[#333530] text-[#fcf9f2] origin-top shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

                <div className="max-w-4xl w-full flex flex-col items-center text-center gap-12">

                    <div className="w-full h-32 relative overflow-hidden flex items-center justify-center">

                        <svg viewBox="0 0 500 100" className="w-[150%] h-full stroke-accent fill-none stroke-[3]">

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

                    <div>

                        <h2 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight mb-6">
                            El pulso de tu <span className="font-serif italic text-primary">Vocación</span>
                        </h2>

                        <p className="text-lg opacity-80 max-w-2xl mx-auto">
                            Dotamos de vida a tus ideas. Creamos ecosistemas digitales que laten, respiran y se adaptan al entorno del mercado en tiempo real.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Archive;
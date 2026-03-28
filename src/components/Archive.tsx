import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import webDesignDark from "../assets/parejaGemini3.png";
import parejaImage from "../assets/parejaGemini3.png";

gsap.registerPlugin(ScrollTrigger);

const Archive = () => {
    const containerRef = useRef(null);

    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);

    const imageCard1Ref = useRef(null);



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



        return () => {
            mm.revert();
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="servicios" className="relative w-full bg-surface">

            {/* CARD 1 */}
            <div
                ref={card1Ref}
                className="h-auto md:h-[100dvh] w-full flex items-start md:items-center justify-center p-4 md:p-8 bg-[#0B0B10] text-[#FFFFFF] border-b border-white/10 origin-top"
            >
                <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between">

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-5xl sm:text-5xl md:text-6xl lg:text-[80px] font-serif italic font-normal text-[#FFFCF2] leading-[1.1] mb-6 text-pretty">
                            Diseño Web,<br className="hidden md:block" /> <span className="text-[#00D2D3]">sin límites.</span>
                        </h2>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-light leading-relaxed" style={{ opacity: 1 }}>
                            Desarrollamos páginas escalables, seguras y fáciles de administrar garantizando la expansión y rendimiento a largo plazo.
                        </p>
                    </div>

                    <div
                        ref={imageCard1Ref}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative rounded-[2rem] overflow-hidden transition-transform hover:scale-[1.02] duration-500 bg-[#111118] mx-auto md:mx-0 mt-8 md:mt-0"
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
                className="h-auto md:h-[100dvh] w-full flex items-start md:items-center justify-center p-4 md:p-8 bg-[#050507] text-white border-b border-white/5 origin-top shadow-2xl"
            >
                <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6 md:gap-12 items-center">

                    <div className="w-full md:flex-1 order-2 md:order-1 flex justify-center">

                        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative rounded-[2rem] overflow-hidden transition-transform hover:scale-[1.02] duration-500 bg-[#111118]">
                            <img
                                src={parejaImage}
                                alt="Velocidad y Rendimiento"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="w-full md:flex-1 order-1 md:order-2 text-center md:text-left">
                        <h2 className="text-5xl sm:text-5xl md:text-6xl lg:text-[80px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px]">
                            Velocidad y <br /><span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#00D2D3] to-[#EE32A0] font-normal">Rendimiento.</span>
                        </h2>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-7 text-white md:text-lg md:leading-8">
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
                            Démosle vida a tus <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2D3] to-[#EE32A0] font-bold pr-2">Ideas.</span>
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
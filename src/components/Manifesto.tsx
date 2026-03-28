import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLParagraphElement>(null);
    const textRef2 = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // Parallax background
        gsap.to(bgRef.current, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Animación de aparición de texto (mucho más robusta usando gsap.from array)
        gsap.from([textRef1.current, textRef2.current], {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            clipPath: 'inset(100% 0 0 0)',
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            clearProps: 'transform,clipPath',
        });

    }, { scope: containerRef });

    return (
        <section
            id="nosotros"
            ref={containerRef}
            className="relative w-full py-48 px-8 bg-[#0B0B10] overflow-hidden flex items-center justify-center min-h-[90vh]"
        >
            {/* Parallax background image */}
            <div
                ref={bgRef}
                className="absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover z-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) contrast(120%)'
                }}
            ></div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-8 text-center px-4">
                <h2 ref={textRef1} className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-serif italic font-normal text-[#FFFCF2] leading-[1.1] text-pretty mx-auto">
                    Démosle vida a tus <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2D3] to-[#EE32A0] pr-2">Ideas.</span>
                </h2>
                <p ref={textRef2} className="text-white/85 font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mt-4 text-pretty leading-relaxed">
                    Diseñamos ecosistemas digitales que se adaptan, evolucionan y generan resultados reales.
                </p>
            </div>
        </section>
    );
};

export default Manifesto;

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

        // Split text reveal effect (simulated split by animating whole phrase with clip-path/opacity)
        // A true split text requires a plugin or custom splitting function. Here we use an elegant fade/slide up.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
                end: 'top 20%',
                toggleActions: 'play md reverse md', // Optional: play reverse
            }
        });

        tl.fromTo(textRef1.current,
            { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
            { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' }
        )
            .fromTo(textRef2.current,
                { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' },
                "-=0.6"
            );

    }, { scope: containerRef });

    return (
        <section
            id="nosotros"
            ref={containerRef}
            className="relative w-full py-48 px-8 bg-charcoal text-primary overflow-hidden flex items-center justify-center min-h-[90vh]"
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

            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-12 font-serif text-3xl sm:text-5xl md:text-7xl leading-[1.1] tracking-tight text-center">
                <p ref={textRef1} className="text-white/50">
                    Tu negocio de manera online
                </p>
                <p ref={textRef2} className="text-primary font-medium text-4xl sm:text-5xl md:text-6xl mt-4">
                    La presencia online ya no es opcional, <br />
                    <span className="italic">es parte del crecimiento!</span>
                </p>
            </div>
        </section>
    );
};

export default Manifesto;

import { useState, useEffect, useRef } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── DATOS DE PLANES ─── */
const plans = [
    // ── PÁGINA 1 ──
    {
        group: 0,
        name: 'Landing 1',
        tagline: 'Ideal para comenzar y captar consultas rápidas',
        price: 'USD 70',
        priceNote: 'Pago único',
        delivery: 'Entrega estimada: 5-7 días',
        featured: false,
        badge: null,
        cta: 'Consultar',
        features: [
            '6 módulos',
            'Hasta 5 imágenes',
            'Botón de WhatsApp en navegación',
            'Iconos a Instagram y Facebook',
        ],
    },
    {
        group: 0,
        name: 'Landing 2',
        tagline: 'Más contenido y mejor conversión',
        price: 'USD 105',
        priceNote: 'Pago único',
        delivery: 'Entrega estimada: 7-10 días',
        featured: true,
        badge: 'Popular',
        cta: 'Consultar',
        features: [
            '8 módulos',
            'Hasta 12 imágenes',
            'FAQ (4 preguntas)',
            'Botón de WhatsApp en navegación',
            'Iconos a Instagram y Facebook',
        ],
    },
    {
        group: 0,
        name: 'One Page 1',
        tagline: 'Web completa para mostrar tu negocio',
        price: 'USD 175',
        priceNote: 'Pago único',
        delivery: 'Entrega estimada: 10-14 días',
        featured: false,
        badge: null,
        cta: 'Consultar',
        features: [
            '4 secciones (Inicio, Nosotros, Servicios, Contacto)',
            'Animaciones al hacer scroll',
            'Hasta 15 imágenes',
            'FAQ (5 preguntas)',
            'Mapa de ubicación',
            'WhatsApp en navegación + botón flotante',
            'Footer con datos y redes',
        ],
    },
    // ── PÁGINA 2 ──
    {
        group: 1,
        name: 'One Page 2',
        tagline: 'Más contenido y estructura profesional',
        price: 'USD 227',
        priceNote: 'Pago único',
        delivery: 'Entrega estimada: 14-20 días',
        featured: false,
        badge: null,
        cta: 'Consultar',
        features: [
            '5 secciones (incluye Proyectos)',
            'Animaciones al hacer scroll',
            'Hasta 20 imágenes',
            'FAQ (8 preguntas)',
            'Mapa de ubicación',
            'WhatsApp en navegación + botón flotante',
            'Footer completo + navegación',
        ],
    },
    {
        group: 1,
        name: 'A Medida',
        tagline: 'Para proyectos personalizados o más avanzados',
        price: null,
        priceNote: null,
        delivery: null,
        featured: true,
        badge: null,
        cta: 'Solicitar cotización',
        features: [
            'Diseño 100% personalizado',
            'Adaptado a tu negocio',
            'Basado en referencias o ideas previas',
        ],
    },
    {
        group: 1,
        name: 'Mantenimiento',
        tagline: 'Disfruta tu tiempo libre',
        price: 'USD 17',
        priceNote: 'Mensual',
        delivery: null,
        featured: false,
        badge: 'Recurrente',
        cta: 'Saber más',
        features: [
            'Diagnóstico mensual',
            'Actualizaciones de plugins',
            'Reparaciones',
            'Plugins de seguridad',
            'Actualización de contenido',
            'Backup',
        ],
    },
];

/* ─── TARJETA ─── */
const PlanCard = ({ plan }: { plan: typeof plans[0] }) => {
    const isFeatured = plan.featured;
    const displayBadge = plan.badge || (isFeatured ? 'Recomendado' : null);

    return (
        <div
            className={`
                relative rounded-3xl p-10 lg:p-8 flex flex-col flex-1 w-full min-h-[580px] lg:min-h-[440px]
                transition-colors duration-500
                ${isFeatured
                    ? 'bg-[#1A1A2A] border-2 border-[#00D2D3]/60 shadow-[0_0_40px_rgba(0,210,211,0.15)] z-10'
                    : 'bg-[#111118] border border-white/5 opacity-90'}
            `}
        >
            {/* Badge */}
            {displayBadge && (
                <div className={`absolute top-0 right-8 -translate-y-1/2 text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full ${
                    isFeatured
                        ? 'bg-[#00D2D3] text-black shadow-[0_0_15px_rgba(0,210,211,0.4)]'
                        : 'bg-black border border-[#00D2D3] text-[#00D2D3]'
                }`}>
                    {displayBadge}
                </div>
            )}

            {/* Nombre y tagline */}
            <div className="mb-8 lg:mb-6">
                <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-2xl mb-2 text-white tracking-tight">
                    {plan.name}
                </h3>
                <p className="text-sm lg:text-xs text-white/50">
                    {plan.tagline}
                </p>
            </div>

            {/* Precio */}
            <div className="mb-8 lg:mb-6 pb-8 lg:pb-6 border-b border-white/10">
                {plan.price ? (
                    <>
                        <span className="text-4xl sm:text-5xl lg:text-4xl font-bold font-mono text-white">
                            {plan.price}
                        </span>
                        {plan.priceNote && (
                            <span className="text-sm lg:text-xs italic ml-3 text-white/70">
                                {plan.priceNote}
                            </span>
                        )}
                        {plan.delivery && (
                            <p className="text-xs lg:text-[10px] mt-3 lg:mt-2 text-white/60">
                                {plan.delivery}
                            </p>
                        )}
                    </>
                ) : (
                    <span className="text-xl sm:text-2xl lg:text-xl font-bold font-mono italic text-white/90">
                        Cotización personalizada
                    </span>
                )}
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-4 lg:gap-3 mb-auto text-sm lg:text-xs text-white/80">
                {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 lg:gap-2">
                        <Check className="w-4 h-4 lg:w-3.5 lg:h-3.5 mt-0.5 flex-shrink-0 text-[#00D2D3]" />
                        {f}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <button
                className={`
                    mt-10 lg:mt-6 w-full py-4 lg:py-3 rounded-xl font-bold transition-all
                    ${isFeatured
                        ? 'border border-[#00D2D3] text-[#00D2D3] bg-transparent hover:bg-[#00D2D3]/10 hover:shadow-[0_0_20px_rgba(0,210,211,0.2)] shadow-[0_0_15px_rgba(0,210,211,0.1)]'
                        : 'border border-[#EE32A0]/30 text-[#EE32A0] hover:bg-[#EE32A0]/10 hover:border-[#EE32A0]/70'}
                `}
            >
                {plan.cta}
            </button>
        </div>
    );
};

/* ─── COMPONENTE PRINCIPAL ─── */
const Pricing = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cardNode = container.children[0] as HTMLDivElement;
        const cardWidth = cardNode.clientWidth + 24; // Includes gap
        const index = Math.round(container.scrollLeft / cardWidth);
        setActiveIndex(index);
    };

    const scrollNext = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cardNode = container.children[0] as HTMLDivElement;

        // Includes margin/gap if any, here we use clientWidth
        const cardWidth = cardNode.clientWidth + 24; // 24 is gap-6
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cardNode = container.children[0] as HTMLDivElement;
        const cardWidth = cardNode.clientWidth + 24;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft <= 10) {
            container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const scrollNextRef = useRef(scrollNext);
    scrollNextRef.current = scrollNext;

    // Autoplay Loop
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => scrollNextRef.current(), 4000);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section id="pricing" className="relative w-full pt-16 pb-32 sm:pt-20 sm:pb-48 px-4 sm:px-8 bg-[#0B0B10] text-[#FFFFFF]">
            <div className="max-w-6xl mx-auto relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
            >
                {/* DIVISOR DELICADO */}
                <div className="w-24 sm:w-32 h-px bg-white/10 mx-auto mb-16 sm:mb-20"></div>

                {/* TÍTULO */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px] mb-6">
                        Planes Web
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto font-medium" style={{ opacity: 1 }}>
                        Elegí el plan ideal para lanzar o escalar tu presencia digital.
                    </p>
                </div>

                {/* CARRUSEL CONTENEDOR (Nativo) */}
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 items-stretch py-8"
                >
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            // 1 carta móbile (100% ancho), 2 cartas tablet, 3 cartas desktop
                            className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-center flex"
                        >
                            <PlanCard plan={plan} />
                        </div>
                    ))}
                </div>

                {/* CONTROLES MÓVIL (Flechas y Puntos debajo) */}
                <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6">
                    <button
                        onClick={scrollPrev}
                        className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex justify-center gap-2">
                        {plans.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    if (!carouselRef.current) return;
                                    const cardNode = carouselRef.current.children[0] as HTMLDivElement;
                                    const cardWidth = cardNode.clientWidth + 24;
                                    carouselRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${activeIndex === i ? 'bg-[#00D2D3] w-6' : 'bg-white/20'
                                    }`}
                                aria-label={`Ir a tarjeta ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={scrollNext}
                        className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition shadow-lg"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>

            <style>{`
                /* Ocultar barra de scroll nativa para mejor UX */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Gradient transition to Contact */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0B0B10] pointer-events-none" />
        </section>
    );
};

export default Pricing;
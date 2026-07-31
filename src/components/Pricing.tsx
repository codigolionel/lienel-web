import { Check } from 'lucide-react';

/* ─── DATOS DE PLANES PRINCIPALES ─── */
const mainPlans = [
    {
        name: 'Tu primer paso online',
        tagline: 'Ideal para profesionales y negocios que arrancan',
        price: '$ 215.000',
        priceNote: null,
        delivery: 'Entrega: 5–10 días',
        featured: false,
        badge: null,
        btnColor: 'magenta' as const,
        cta: 'Consultar',
        features: [
            'Hosting y Dominio incluido',
            'Hasta 8 módulos',
            'Hasta 12 imágenes',
            'FAQ (4 preguntas)',
            'Botón de WhatsApp en navegación',
            'Íconos a Instagram y Facebook',
        ],
    },
    {
        name: 'Explicá bien lo que hacés',
        tagline: 'Más secciones, más confianza, más consultas',
        price: '$ 260.000',
        priceNote: null,
        delivery: 'Entrega: 3–5 días',
        featured: true,
        badge: 'Más vendido',
        btnColor: 'cyan' as const,
        cta: 'Consultar',
        features: [
            'Hosting y Dominio incluido',
            '4 secciones (Inicio, Nosotros, Servicios, Contacto)',
            'Animaciones al hacer scroll',
            'Hasta 15 imágenes',
            'FAQ (5 preguntas)',
            'Mapa de ubicación',
            'WhatsApp en navegación + botón flotante',
            'Footer con Mapa y redes',
        ],
    },
    {
        name: 'Presencia sólida',
        tagline: 'Todo lo que un cliente necesita ver para contactarte',
        price: '$ 430.000',
        priceNote: null,
        delivery: 'Entrega: 7–10 días',
        featured: false,
        badge: null,
        btnColor: 'magenta' as const,
        cta: 'Consultar',
        features: [
            'Hosting y Dominio incluido',
            'Hasta 5 páginas',
            'Animaciones al hacer scroll',
            'Hasta 20 imágenes',
            'FAQ (8 preguntas)',
            'Mapa de ubicación',
            'WhatsApp en navegación + botón flotante',
            'Footer completo + navegación',
        ],
    },
];

/* ─── DATOS DE SERVICIOS ADICIONALES ─── */
const additionalServices = [
    {
        name: 'A Medida',
        tagline: 'Para proyectos personalizados o más avanzados',
        price: 'Cotización personalizada',
        priceStyle: 'custom',
        priceNote: null,
        delivery: null,
        featured: false,
        badge: null,
        btnColor: 'cyan' as const,
        cta: 'Solicitar cotización',
        features: [
            'Diseño 100% personalizado',
            'Adaptado a tu negocio',
            'Basado en referencias o ideas previas',
        ],
    },
    {
        name: 'Mantenimiento',
        tagline: 'Disfrutá tu tiempo libre',
        price: 'Depende del Servicio',
        priceNote: '',
        delivery: null,
        featured: false,
        badge: 'Recurrente',
        btnColor: 'magenta' as const,
        cta: 'Saber más',
        features: [
            'Diagnóstico mensual',
            'Actualizaciones',
            'Reparaciones',
            'Seguridad',
            'Backup',
        ],
    },
];

type PlanType = typeof mainPlans[0] | typeof additionalServices[0];

/* ─── TARJETA PRINCIPAL ─── */
const PlanCard = ({ plan }: { plan: PlanType }) => {
    const isFeatured = plan.featured;
    const displayBadge = plan.badge;
    const btnColor = plan.btnColor;

    return (
        <div
            className={`
                relative rounded-2xl flex flex-col flex-1 w-full h-full min-h-[480px]
                transition-all duration-300
                ${isFeatured
                    ? 'bg-[#0E0E18] border border-[#00D2D3]/40 shadow-[0_0_0_1px_rgba(0,210,211,0.1),0_24px_48px_rgba(0,0,0,0.4)] scale-[1.02]'
                    : 'bg-[#0B0B12] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]'}
            `}
        >
            {/* Featured highlight line */}
            {isFeatured && (
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#00D2D3]/60 to-transparent" />
            )}

            {/* Badge */}
            {displayBadge && (
                <div className={`absolute -top-3 right-6 text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full ${displayBadge === 'Recurrente'
                        ? 'bg-[#0B0B12] border border-white/15 text-white/60'
                        : 'bg-[#00D2D3] text-black'
                    }`}>
                    {displayBadge}
                </div>
            )}

            <div className="p-8 flex flex-col h-full gap-6">
                {/* Name and tagline */}
                <div>
                    <h3 className="font-sans font-semibold text-xl mb-1.5 text-white tracking-tight">
                        {plan.name}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                        {plan.tagline}
                    </p>
                </div>

                {/* Price */}
                <div className="pb-6 border-b border-white/[0.07]">
                    {plan.price ? (
                        <>
                            <span className={`font-mono ${'priceStyle' in plan && plan.priceStyle === 'custom'
                                ? 'font-normal text-2xl text-white/50 tracking-tight'
                                : 'text-4xl font-bold text-white tracking-tight'}`}>
                                {plan.price}
                            </span>
                            {plan.delivery && (
                                <p className="text-xs mt-2 text-white/35 font-mono">
                                    {plan.delivery}
                                </p>
                            )}
                        </>
                    ) : null}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-auto text-sm text-white/60">
                    {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D2D3]" />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="https://wa.me/5491165657291"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        mt-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 block text-center
                        ${btnColor === 'cyan'
                            ? 'bg-[#00D2D3] text-black hover:bg-[#00D2D3]/90 hover:shadow-[0_0_24px_rgba(0,210,211,0.3)]'
                            : 'bg-white/[0.06] border border-white/[0.1] text-white/80 hover:bg-white/[0.1] hover:border-white/20'}
                    `}
                >
                    {plan.cta}
                </a>
            </div>
        </div>
    );
};

/* ─── COMPONENTE PRINCIPAL ─── */
const Pricing = () => {
    return (
        <section id="pricing" className="relative w-full pt-24 pb-20 sm:pt-32 sm:pb-28 px-4 sm:px-8 bg-[#0B0B10] text-[#FFFFFF]">

            {/* Subtle top divider */}
            <div className="max-w-6xl mx-auto mb-16 md:mb-20">
                <div className="w-px h-12 bg-white/10 mx-auto" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Title */}
                <div className="text-center mb-14 md:mb-16">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D2D3] mb-5">Planes</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-normal text-[#FFFCF2] leading-tight mb-5">
                        Planes Web
                    </h2>
                    <p className="text-base sm:text-lg text-white/50 max-w-lg mx-auto font-normal leading-relaxed">
                        Tres puntos de partida. Todos pensados para que empieces a conseguir clientes.
                    </p>
                </div>

                {/* Social proof */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                    {[
                        { stat: '100%', label: 'satisfacción garantizada' },
                        { stat: '24/7', label: 'soporte incluido' },
                    ].map(({ stat, label }) => (
                        <div key={label} className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03]">
                            <span className="text-[#00D2D3] text-sm font-bold font-mono">{stat}</span>
                            <span className="text-white/40 text-xs">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Main plans grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch mb-20">
                    {mainPlans.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </div>

                {/* Additional services */}
                <div className="text-center mb-10">
                    <h3 className="text-2xl sm:text-3xl font-serif italic font-normal text-[#FFFCF2] leading-tight mb-2">
                        Servicios <span className="text-[#00D2D3]">Adicionales</span>
                    </h3>
                    <p className="text-sm text-white/35">Consultá para más información.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch max-w-4xl mx-auto mb-16">
                    {additionalServices.map((service) => (
                        <PlanCard key={service.name} plan={service} />
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="max-w-2xl mx-auto text-center border-t border-white/[0.06] pt-8">
                    <p className="text-xs text-white/30 leading-relaxed">
                        Todos los planes incluyen hosting y dominio por el primer año.{' '}
                        <span className="text-[#00D2D3]/70">Se entrega Factura Tipo C.</span>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Pricing;
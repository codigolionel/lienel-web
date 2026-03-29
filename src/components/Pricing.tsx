import { Check } from 'lucide-react';

/* ─── DATOS DE PLANES PRINCIPALES ─── */
const mainPlans = [
    {
        name: 'Presencia',
        tagline: 'Tu primer paso online, lista en 7 días',
        price: 'USD 109',
        priceNote: 'Pago único',
        delivery: 'Entrega: 5–10 días',
        featured: false,
        badge: null,
        btnColor: 'magenta' as const,
        cta: 'Consultar',
        features: [
            'Hasta 8 módulos',
            'Hasta 12 imágenes',
            'FAQ (4 preguntas)',
            'Botón de WhatsApp en navegación',
            'Íconos a Instagram y Facebook',
        ],
    },
    {
        name: 'Negocio',
        tagline: 'Más secciones, más confianza, más consultas',
        price: 'USD 175',
        priceNote: 'Pago único',
        delivery: 'Entrega: 10–14 días',
        featured: true,
        badge: 'Más popular',
        btnColor: 'cyan' as const,
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
    {
        name: 'Profesional',
        tagline: 'Todo lo que un cliente necesita ver para contactarte',
        price: 'USD 227',
        priceNote: 'Pago único',
        delivery: 'Entrega: 14–20 días',
        featured: false,
        badge: null,
        btnColor: 'magenta' as const,
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
];

/* ─── DATOS DE SERVICIOS ADICIONALES ─── */
const additionalServices = [
    {
        name: 'A Medida',
        tagline: 'Para proyectos personalizados o más avanzados',
        price: 'Cotización personalizada',
        priceStyle: 'custom', // For special rendering
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
        tagline: 'Disfruta tu tiempo libre',
        price: 'USD 19',
        priceNote: '/ mes',
        delivery: null,
        featured: false,
        badge: 'Recurrente',
        btnColor: 'magenta' as const,
        cta: 'Saber más',
        features: [
            'Diagnóstico mensual',
            'Actualizaciones de plugins',
            'Reparaciones',
            'Plugins de seguridad',
            'Backup',
        ],
    },
];

type PlanType = typeof mainPlans[0] | typeof additionalServices[0];

/* ─── TARJETA PRINCIPAL PARA PLANES Y SERVICIOS ─── */
const PlanCard = ({ plan }: { plan: PlanType }) => {
    const isFeatured = plan.featured;
    const displayBadge = plan.badge;
    const btnColor = plan.btnColor;

    return (
        <div
            className={`
                relative rounded-3xl p-10 lg:p-8 flex flex-col flex-1 w-full h-full min-h-[440px]
                transition-colors duration-500
                ${isFeatured
                    ? 'bg-[#1A1A2A] border-2 border-[#00D2D3]/60 shadow-[0_0_40px_rgba(0,210,211,0.15)] z-10'
                    : 'bg-[#111118] border border-white/5 opacity-90'}
            `}
        >
            {/* Badge */}
            {displayBadge && (
                <div className={`absolute top-0 right-8 -translate-y-1/2 text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full ${displayBadge === 'Recurrente'
                    ? 'bg-[#111118] border border-[#00D2D3] text-[#00D2D3]'
                    : btnColor === 'magenta'
                        ? 'bg-black border border-[#EE32A0] text-[#EE32A0]'
                        : 'bg-[#00D2D3] text-black shadow-[0_0_15px_rgba(0,210,211,0.4)]'
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
                        <span className={`font-mono ${'priceStyle' in plan && plan.priceStyle === 'custom'
                            ? 'font-normal text-2xl sm:text-3xl lg:text-3xl text-white/70 tracking-tight'
                            : 'text-4xl sm:text-5xl lg:text-4xl font-bold text-white'}`}>
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
                ) : null}
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-4 lg:gap-3 mb-auto text-sm lg:text-xs text-white/80">
                {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 lg:gap-2">
                        <Check className="w-4 h-4 lg:w-3.5 lg:h-3.5 mt-0.5 flex-shrink-0 text-[#00D2D3]" />
                        {f}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <button
                className={`
                    mt-10 lg:mt-6 w-full py-4 lg:py-3 rounded-xl font-bold transition-all
                    ${btnColor === 'cyan'
                        ? 'border border-[#00D2D3] text-[#00D2D3] bg-transparent hover:bg-[#00D2D3]/10 hover:shadow-[0_0_20px_rgba(0,210,211,0.2)] shadow-[0_0_15px_rgba(0,210,211,0.1)]'
                        : 'border border-[#EE32A0]/30 text-[#EE32A0] hover:bg-[#EE32A0]/10 hover:border-[#EE32A0]/70'}
                `}
            >
                {plan.cta}
            </button>
        </div>
    );
};

/* ─── COMPONENTE PRINCIPAL ESTÁTICO ─── */
const Pricing = () => {
    return (
        <section id="pricing" className="relative w-full pt-16 pb-32 sm:pt-20 sm:pb-32 px-4 sm:px-8 bg-[#0B0B10] text-[#FFFFFF]">
            <div className="max-w-6xl mx-auto relative z-10">

                {/* DIVISOR DELICADO */}
                <div className="w-24 sm:w-32 h-px bg-white/10 mx-auto mb-16 sm:mb-20"></div>

                {/* TÍTULO PRINCIPAL */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-serif italic font-normal text-[#FFFCF2] leading-tight lg:leading-[75px] mb-6">
                        Planes Web
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto font-medium opacity-90">
                        Elegí el plan ideal para lanzar o escalar tu presencia digital.
                    </p>
                </div>

                {/* GRILLA: PLANES PRINCIPALES (3 Columnas) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-24">
                    {mainPlans.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </div>

                {/* TÍTULO SECUNDARIO: SERVICIOS ADICIONALES */}
                <div className="text-center mb-12 md:mb-16">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-normal text-[#FFFCF2] leading-tight mb-4">
                        Servicios <span className="text-[#00D2D3] opacity-90">Adicionales</span>
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white/50 max-w-xl mx-auto">
                        "Complementos pensados para prolongar el rendimiento de tu web."
                    </p>
                </div>

                {/* GRILLA: SERVICIOS ADICIONALES (2 Columnas) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-4xl mx-auto mb-20">
                    {additionalServices.map((service) => (
                        <PlanCard key={service.name} plan={service} />
                    ))}
                </div>

                {/* DISCLAIMER AL PIE */}
                <div className="max-w-3xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                        Los planes no incluyen hosting ni dominio. Te asesoramos para elegir el mejor servicio según tu presupuesto y necesidades.
                    </p>
                </div>

            </div>

            {/* Gradient transition to Contact */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0B0B10] pointer-events-none" />
        </section>
    );
};

export default Pricing;
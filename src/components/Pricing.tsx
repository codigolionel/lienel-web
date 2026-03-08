import { Check } from 'lucide-react';

const Pricing = () => {
    return (

        /* SECCIÓN PRINCIPAL */
        <section id="pricing" className="w-full py-32 sm:py-48 px-8 bg-base text-primary">

            <div className="max-w-6xl mx-auto">

                {/* TITULO */}
                <div className="text-center mb-24">

                    <h2 className="text-5xl sm:text-7xl font-sans font-bold tracking-tight mb-6">
                        Planes <span className="font-serif italic text-accent">Web</span>
                    </h2>

                    <p className="text-lg opacity-80 max-w-2xl mx-auto font-medium">
                        Elegí el plan ideal para lanzar o escalar tu presencia digital.
                    </p>

                </div>


                {/* GRID DE TARJETAS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                    {/* ====================== */}
                    {/* PLAN 1 */}
                    {/* ====================== */}

                    <div className="bg-[#1f1e1c] rounded-3xl p-8 border border-white/5 flex flex-col min-h-[540px] transition-transform duration-500 hover:-translate-y-2">

                        <div className="mb-8">
                            <h3 className="font-sans font-bold text-2xl mb-2 text-white/90">
                                Ideal para Landing Page
                            </h3>

                            <p className="text-white/50 text-sm">
                                Ideal para proyectos simples o presencia inicial.
                            </p>
                        </div>

                        <div className="mb-8">
                            <span className="text-4xl font-bold font-mono">
                                $430.000
                            </span>

                            <span className="text-white/50 text-sm italic">
                                {" "}Final
                            </span>

                            <p className="text-white/40 text-xs mt-2">
                                Entrega estimada: 7-10 días
                            </p>
                        </div>

                        <ul className="flex flex-col gap-4 mb-auto text-sm text-white/70">

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-accent" /> Diseño Web
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-accent" /> Wordpress
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-accent" /> Plugins de seguridad
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-accent" /> Subida del sitio al host
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-accent" /> One Page
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-accent" /> Asesoramiento integral
                            </li>

                        </ul>

                        <button className="mt-8 w-full py-4 rounded-xl border border-white/10 text-white/90 font-medium hover:bg-white/5 transition-colors">
                            Consultar
                        </button>

                    </div>


                    {/* ====================== */}
                    {/* PLAN 2 */}
                    {/* ====================== */}

                    <div className="bg-moss rounded-3xl p-8 border border-white/10 flex flex-col min-h-[540px] shadow-2xl relative transition-transform duration-500 hover:-translate-y-2">

                        <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                            Popular
                        </div>

                        <div className="mb-8">

                            <h3 className="font-sans font-bold text-2xl mb-2 text-primary">
                                Intermedio
                            </h3>

                            <p className="text-primary/70 text-sm">
                                Ideal para portfolio y servicios.
                            </p>

                        </div>

                        <div className="mb-8">

                            <span className="text-5xl font-bold font-mono text-primary">
                                $620.000
                            </span>

                            <span className="text-primary/70 text-sm italic">
                                {" "}Final
                            </span>

                            <p className="text-primary/60 text-xs mt-2">
                                Entrega estimada: 10-15 días
                            </p>

                        </div>

                        <ul className="flex flex-col gap-4 mb-auto text-sm text-primary/90">

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Gestión del dominio
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Diseño Web
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Wordpress
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Plugins de seguridad
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Subida del sitio al host
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Panel autoadministrable
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Hasta 5 secciones
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary" /> Asesoramiento integral
                            </li>

                        </ul>

                        <button className="mt-8 w-full py-4 rounded-xl bg-clay text-charcoal font-bold hover:brightness-110 transition-all shadow-[0_4px_14px_0_rgba(203,153,126,0.39)]">
                            Consultar
                        </button>

                    </div>



                    {/* ====================== */}
                    {/* PLAN 3 */}
                    {/* ====================== */}

                    <div className="bg-[#1f1e1c] rounded-3xl p-8 border border-white/5 flex flex-col min-h-[540px] transition-transform duration-500 hover:-translate-y-2">

                        <div className="mb-8">

                            <h3 className="font-sans font-bold text-2xl mb-2 text-white/90">
                                Plus
                            </h3>

                            <p className="text-white/50 text-sm">
                                Ideal para carrito de compras.
                            </p>

                        </div>

                        <div className="mb-8">

                            <span className="text-4xl font-bold font-mono text-white/90">
                                $860.000
                            </span>

                            <span className="text-white/50 text-sm italic">
                                {" "}Final
                            </span>

                            <p className="text-white/40 text-xs mt-2">
                                Entrega estimada: 15-20 días
                            </p>

                        </div>

                        <ul className="flex flex-col gap-4 mb-auto text-sm text-white/70">

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Gestión del dominio
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Diseño Web
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Wordpress
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Plugins de seguridad
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Subida del sitio al host
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Panel autoadministrable
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Carrito de compras
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Más de 5 secciones
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Idioma extra
                            </li>

                            <li className="flex items-center gap-3">
                                <Check className="w-4 h-4 text-white/30" /> Asesoramiento integral
                            </li>

                        </ul>

                        <button className="mt-8 w-full py-4 rounded-xl border border-white/10 text-white/90 font-medium hover:bg-white/5 transition-colors">
                            Consultar
                        </button>

                    </div>

                </div>


                {/* =============================== */}
                {/* NUEVA SECCION MANTENIMIENTO */}
                {/* =============================== */}

                <div className="mt-32 bg-[#1f1e1c] rounded-3xl p-12 border border-white/10">

                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* TARJETA */}
                        <div>

                            <h3 className="text-3xl font-bold mb-2">
                                Mantenimiento
                            </h3>

                            <p className="text-white/60 mb-6">
                                Disfruta tu tiempo libre.
                            </p>

                            <div className="mb-8">

                                <span className="text-5xl font-mono font-bold">
                                    $25.000
                                </span>

                                <span className="text-white/60 ml-2">
                                    Mensual
                                </span>

                            </div>

                            <ul className="flex flex-col gap-3 text-white/80 mb-8">

                                <li className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent" /> Diagnóstico
                                </li>

                                <li className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent" /> Actualizaciones
                                </li>

                                <li className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent" /> Reparaciones
                                </li>

                                <li className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent" /> Plugins de seguridad
                                </li>

                                <li className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent" /> Actualización de contenido
                                </li>

                                <li className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-accent" /> Backup
                                </li>

                            </ul>

                            <button className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition">
                                Saber más
                            </button>

                            <p className="text-xs text-white/50 mt-3">
                                Consulta presupuesto.
                            </p>

                        </div>


                        {/* TEXTO CTA */}
                        <div className="text-center md:text-left">

                            <p className="text-xl font-medium mb-6">
                                Consulta nuestros planes de mantenimiento y reparación de tu sitio Web
                            </p>

                            <button className="px-8 py-4 rounded-xl bg-clay text-charcoal font-bold hover:brightness-110 transition">
                                Consultar
                            </button>

                        </div>

                    </div>

                </div>


            </div>
        </section>

    );
};

export default Pricing;
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqBg from '../assets/FAQ.webp';

const faqs = [
    {
        question: "¿Cuáles son los pasos para empezar?",
        answer: "El proceso es simple: primero coordinamos una breve charla o nos contás tu idea por WhatsApp. Luego te asesoramos con el diseño (tipografias, colores, copywriter, etc)."
    },
    {
        question: "¿Se incluyen cambios en la web?",
        answer: "Sí. Durante la etapa de diseño de tu sitio web incluimos instancias de revisión. Una vez entregada la web, podés solicitar modificaciones dentro del plazo acordado."
    },
    {
        question: "¿Cuál es el método de pago?",
        answer: "Aceptamos transferencias bancarias y Mercado Pago. Generalmente trabajamos con un anticipo del 50% al comenzar el proyecto y el 50% restante una vez que la página está lista y publicada."
    },
    {
        question: "¿Qué pasa con mi pagina si no quiero renovar el servicio de hosting?",
        answer: "Si no querés renovar el servicio de hosting, no te preocupes, porque nosotros al contratar nuestro servicio te vamos a dar tu pagina en un archivo .zip para que puedas tenerla en tu poder."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <section id="faq" className="relative w-full pt-16 pb-24 px-4 sm:px-8 bg-[#0B0B10] text-primary overflow-hidden">
                {/* Global background effects, glow, etc */}

                <div className="max-w-5xl mx-auto relative z-10">

                    {/* 1. FAQ Accordion */}
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white mb-4">
                                Preguntas frecuentes
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {faqs.map((faq, idx) => {
                                const isOpen = openIndex === idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => toggleFAQ(idx)}
                                        className={`
                                        group relative w-full text-left p-6 sm:p-8 rounded-2xl border transition-all duration-300
                                        ${isOpen
                                                ? 'bg-white/5 border-[#00D2D3]/40 shadow-[0_4px_30px_rgba(0,210,211,0.08)]'
                                                : 'bg-[#111118] border-white/5 hover:border-white/10 hover:bg-white/5'}
                                    `}
                                    >
                                        <div className="flex justify-between items-center gap-4">
                                            <h3 className={`font-sans font-medium text-base sm:text-lg transition-colors ${isOpen ? 'text-[#00D2D3]' : 'text-white'}`}>
                                                {faq.question}
                                            </h3>
                                            <div className={`p-2 rounded-full border transition-all duration-300 ${isOpen ? 'rotate-180 border-[#00D2D3]/40 bg-[#00D2D3]/10 text-[#00D2D3]' : 'border-white/10 text-white/50 group-hover:bg-white/5 group-hover:text-white'}`}>
                                                <ChevronDown className="w-5 h-5 flex-shrink-0" />
                                            </div>
                                        </div>
                                        <div
                                            className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>
            {/* 3. CTA */}
            <section className="relative w-full overflow-hidden text-center py-24 sm:py-32 px-6">

                {/* Parallax Background */}
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-cover bg-left md:bg-center"
                    style={{ backgroundImage: `url(${faqBg})` }}
                />

                {/* Oscurecimiento para mejorar legibilidad */}
                <div className="absolute inset-0 z-0 bg-black/60" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0B10] to-[#111118]/80" />

                <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold font-sans leading-[1.1] tracking-tight text-white mb-6 sm:mb-8">
                        Tu negocio puede dar <br className="hidden sm:block" />el siguiente paso hoy
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/50 mb-12 leading-relaxed max-w-2xl font-medium">
                        Te ayudamos a tener tu primera web clara, profesional y lista para generar consultas. Sin complicaciones. Sin vueltas.
                    </p>

                    <a
                        href="https://wa.me/5491165657291"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#EE32A0] backdrop-blur-sm px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base font-semibold text-white transition-all duration-300 hover:scale-105 group shadow-[0_0_30px_rgba(238,50,160,0.3)] hover:shadow-[0_0_50px_rgba(238,50,160,0.5)]"
                    >
                        <span className="absolute inset-0 bg-[#00D2D3] translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 z-0"></span>
                        <span className="relative z-10 flex items-center gap-2 text-white transition-colors duration-300 group-hover:text-black">
                            Quiero mi web
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </a>
                </div>
            </section>
        </>
    );
};

export default FAQ;

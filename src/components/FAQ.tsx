import { useState } from 'react';
import { Plus } from 'lucide-react';
import faqBg from '../assets/FAQ.webp';

const faqs = [
    {
        question: "¿Cuáles son los pasos para empezar?",
        answer: "El proceso es simple: primero coordinamos una breve charla o nos contás tu idea por WhatsApp. Luego te asesoramos con el diseño (tipografías, colores, copywriter, etc)."
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
        answer: "Si no querés renovar el servicio de hosting, no te preocupes. Al contratar nuestro servicio te entregamos tu página en un archivo .zip para que puedas tenerla en tu poder siempre."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            {/* FAQ Section */}
            <section id="faq" className="relative w-full py-24 sm:py-32 px-4 sm:px-8 bg-[#0B0B10] text-primary">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-14">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D2D3] mb-4">FAQ</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white">
                            Preguntas frecuentes
                        </h2>
                    </div>

                    {/* Accordion */}
                    <div className="flex flex-col divide-y divide-white/[0.06]">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div key={idx}>
                                    <button
                                        onClick={() => toggleFAQ(idx)}
                                        className="w-full text-left py-6 flex justify-between items-start gap-6 group"
                                        aria-expanded={isOpen}
                                    >
                                        <span className={`font-sans font-medium text-base leading-snug transition-colors duration-200 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
                                            {faq.question}
                                        </span>
                                        <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${isOpen ? 'border-[#00D2D3]/50 bg-[#00D2D3]/10 text-[#00D2D3] rotate-45' : 'border-white/15 text-white/40 group-hover:border-white/25'}`}>
                                            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                                        </span>
                                    </button>
                                    <div className={`grid transition-all duration-400 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <p className="text-white/50 text-sm sm:text-base leading-relaxed pb-6 pr-10">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full overflow-hidden text-center py-28 sm:py-36 px-6">

                {/* Background */}
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-cover bg-left md:bg-center"
                    style={{ backgroundImage: `url(${faqBg})` }}
                />
                <div className="absolute inset-0 z-0 bg-black/65" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/20 to-transparent" />

                <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl mx-auto gap-8">
                    <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-serif italic font-normal leading-tight text-white">
                        Tu negocio puede dar<br className="hidden sm:block" /> el siguiente paso hoy
                    </h2>
                    <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl">
                        Te ayudamos a tener tu primera web clara, profesional y lista para generar consultas. Sin complicaciones. Sin vueltas.
                    </p>

                    <a
                        href="https://wa.me/5491165657291"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EE32A0] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(238,50,160,0.45)] group"
                    >
                        Quiero mi web
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>
        </>
    );
};

export default FAQ;

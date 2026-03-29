import { useState, useEffect } from 'react';
import whatsappLogo from '../assets/Sticky-whatsapp-logo.svg';

const WhatsAppFloat = () => {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const target = document.querySelector('.feature-panel');
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <a
            href="https://wa.me/5491165657291"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`
                fixed bottom-6 right-6 z-50
                flex items-center gap-3
                transition-all duration-700 ease-out
                ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
            `}
        >
            {/* Tooltip */}
            <span
                className={`
                    bg-white text-gray-800 text-sm font-semibold
                    px-4 py-2 rounded-full shadow-lg
                    transition-all duration-300 whitespace-nowrap
                    ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                `}
            >
                ¡Hablemos! 💬
            </span>

            {/* Button */}
            <div className="relative group">
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-[wa-ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-[wa-ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />

                {/* Icon container */}
                <div
                    className={`
                        relative w-[60px] h-[60px] rounded-full
                        bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.5)]
                        flex items-center justify-center
                        transition-all duration-300
                        hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)]
                        active:scale-95
                    `}
                >
                    <img
                        src={whatsappLogo}
                        alt="WhatsApp"
                        className="w-[34px] h-[34px] object-contain drop-shadow-sm"
                    />
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes wa-ping {
                    0% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    75%, 100% {
                        transform: scale(1.8);
                        opacity: 0;
                    }
                }
            `}</style>
        </a>
    );
};

export default WhatsAppFloat;

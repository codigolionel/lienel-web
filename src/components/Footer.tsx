import { MapPin, Phone, Clock, Mail, MessageCircle, Facebook, Instagram } from "lucide-react";
import logoIcon from '../assets/solo-logo.svg';

const Footer = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer
            className="w-full bg-charcoal text-primary px-8 pt-24 pb-8 overflow-hidden relative border-t border-white/10"
        >
            {/* Glow superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1 bg-moss shadow-[0_0_100px_30px_#6b705c] opacity-30"></div>

            <div className="max-w-7xl mx-auto flex flex-col gap-20">

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-4">

                    {/* Marca */}
                    <div className="flex flex-col gap-6 lg:col-span-4 lg:pr-10">

                        <div className="flex items-center gap-3">
                            <img src={logoIcon} alt="Linel Logo" className="w-10 h-10 object-contain" />
                            <h3 className="text-xl font-bold tracking-wide text-white">Linel</h3>
                        </div>

                        <p className="text-white/80 text-sm leading-relaxed">
                            Una página web trabaja por vos las 24hs, hace que tu negocio dé un salto de nivel.
                        </p>

                        {/* Redes */}
                        <div className="flex gap-5">

                            <a
                                href="https://www.facebook.com/linelDigital/?rdid=RL6EIKA1EUVzo1si" target="_blank" rel="noopener noreferrer"
                                className="text-[#00D2D3] hover:text-white transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>

                            <a
                                href="https://www.instagram.com/linel_digital?igsh=YWIxaXFobHFqdjFq" target="_blank" rel="noopener noreferrer"
                                className="text-[#00D2D3] hover:text-white transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>

                        </div>

                        {/* Mini mapa Ituzaingó */}
                        <div className="flex flex-col items-start gap-2 mt-4">
                            <span className="text-[#00d3f3] font-mono text-xs uppercase tracking-widest hidden lg:block">Ubicación</span>
                            <div className="w-full max-w-sm h-[140px] overflow-hidden border border-white/10 rounded-md">
                                <iframe
                                    title="Ubicación Ituzaingó"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26224.689716582964!2d-58.68!3d-34.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb18d30d1077f%3A0x84c1c07c1e537783!2sItuzaing%C3%B3%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                    </div>


                    {/* Navegación */}
                    <div className="flex flex-col gap-4 text-md lg:col-span-2">

                        <h4 className="text-[#00d3f3] font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
                            Navegación
                        </h4>

                        <a href="#inicio" onClick={(e) => handleScroll(e, '#inicio')} className="text-white/80 hover:text-primary transition">
                            Inicio
                        </a>

                        <a href="#servicios" onClick={(e) => handleScroll(e, '#servicios')} className="text-white/80 hover:text-primary transition">
                            Servicios
                        </a>

                        <a href="#proceso" onClick={(e) => handleScroll(e, '#proceso')} className="text-white/80 hover:text-primary transition">
                            Proceso
                        </a>

                        <a href="#nosotros" onClick={(e) => handleScroll(e, '#nosotros')} className="text-white/80 hover:text-primary transition">
                            Nosotros
                        </a>

                        <a href="#contacto" onClick={(e) => handleScroll(e, '#contacto')} className="text-white/80 hover:text-primary transition">
                            Contacto
                        </a>

                    </div>


                    {/* Servicios */}
                    <div className="flex flex-col gap-4 text-md lg:col-span-2">

                        <h4 className="text-[#00d3f3] font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
                            Servicios
                        </h4>

                        <span className="text-white/80">Diseño Web</span>
                        <span className="text-white/80">SEO</span>
                        <span className="text-white/80">Hosting</span>
                        <span className="text-white/80">Dominio</span>
                        <span className="text-white/80">Mantenimiento</span>

                    </div>


                    {/* Contacto */}
                    <div className="flex flex-col gap-4 text-md lg:col-span-4">

                        <h4 className="text-[#00d3f3] font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
                            Contacto
                        </h4>

                        <div className="flex gap-3 items-start group">
                            <MapPin className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition mt-1" />
                            <p className="text-white/80 leading-relaxed">
                                Ituzaingó | Castelar, Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className="flex gap-3 items-center group">
                            <Phone className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition" />
                            <p className="text-white/80">
                                +54 9 11 6565-7291
                            </p>
                        </div>

                        <div className="flex gap-3 items-center group">
                            <MessageCircle className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition" />
                            <p className="text-white/80">
                                WhatsApp: 11 6565-7291
                            </p>
                        </div>

                        <div className="flex gap-3 items-center group">
                            <Clock className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition" />
                            <p className="text-white/80">
                                Lun a Vie de 9 a 17hs
                            </p>
                        </div>

                        <div className="flex gap-3 items-center group">
                            <Mail className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition" />
                            <p className="text-white/80">
                                proyectos.linel@gmail.com
                            </p>
                        </div>

                    </div>

                </div>




                {/* Bottom */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 pt-6 mt-6 border-t border-white/10 text-sm text-white/40 text-center">
                    <p>
                        © {new Date().getFullYear()} Linel. Todos los derechos reservados.
                    </p>
                    <span className="hidden sm:inline-block opacity-30">|</span>
                    <div className="flex items-center gap-2 text-white/40">
                        <img src={logoIcon} alt="Linel" className="w-6 h-6 opacity-70" />
                        <span className="text-xs sm:text-sm font-medium">
                            Linel.com.ar
                        </span>
                    </div>
                    <span className="hidden sm:inline-block opacity-30">|</span>
                    <a
                        href="/privacidad.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        Política de privacidad
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
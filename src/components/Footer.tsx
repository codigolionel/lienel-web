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
                            Diseños modernos y adaptables que muestran lo mejor de tu marca
                            y funcionan en todos los dispositivos.
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
                    </div>


                    {/* Navegación */}
                    <div className="flex flex-col gap-4 text-sm lg:col-span-2">

                        <h4 className="text-white/50 hover:text-accent font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
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
                    <div className="flex flex-col gap-4 text-sm lg:col-span-2">

                        <h4 className="text-white/50 hover:text-accent font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
                            Servicios
                        </h4>

                        <span className="text-white/80">Diseño Web</span>
                        <span className="text-white/80">SEO</span>
                        <span className="text-white/80">Hosting</span>
                        <span className="text-white/80">Dominio</span>
                        <span className="text-white/80">Mantenimiento</span>

                    </div>


                    {/* Contacto */}
                    <div className="flex flex-col gap-5 text-sm lg:col-span-4">

                        <h4 className="text-white/50 hover:text-accent font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
                            Contacto
                        </h4>

                        <div className="flex gap-3 items-start group">
                            <MapPin className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition mt-1" />
                            <p className="text-white/80 leading-relaxed">
                                Ituzaingó | Castelar<br />
                                Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Phone className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition mt-1" />
                            <p className="text-white/80">
                                +54 9 11 6565-7291

                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <MessageCircle className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition mt-1" />
                            <p className="text-white/80">
                                WhatsApp: 11 6565-7291
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Clock className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition mt-1" />
                            <p className="text-white/80">
                                Lun a Vie de 9 a 17hs
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Mail className="w-4 h-4 text-[#00D2D3] group-hover:text-[#00D2D3]/80 transition mt-1" />
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
                </div>

            </div>
        </footer>
    );
};

export default Footer;
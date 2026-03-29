import { MapPin, Phone, Clock, Mail, MessageCircle, Facebook, Instagram } from "lucide-react";

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
            className="w-full bg-charcoal text-primary rounded-t-[3rem] px-8 pt-24 pb-12 mt-12 overflow-hidden relative border-t border-white/5"
        >
            {/* Glow superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1 bg-moss shadow-[0_0_100px_30px_#6b705c] opacity-30"></div>

            <div className="max-w-7xl mx-auto flex flex-col gap-20">

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

                    {/* Marca */}
                    <div className="flex flex-col gap-6">

                        <h3 className="text-2xl font-bold">Linel</h3>

                        <p className="text-white/80 text-sm leading-relaxed">
                            Diseños modernos y adaptables que muestran lo mejor de tu marca
                            y funcionan en todos los dispositivos.
                        </p>

                        {/* Redes */}
                        <div className="flex gap-3">

                            <a
                                href="https://www.facebook.com/linelDigital/?rdid=RL6EIKA1EUVzo1si" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>

                            <a
                                href="https://www.instagram.com/linel_digital?igsh=YWIxaXFobHFqdjFq" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>

                        </div>
                    </div>


                    {/* Navegación */}
                    <div className="flex flex-col gap-4 text-sm">

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
                    <div className="flex flex-col gap-4 text-sm">

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
                    <div className="flex flex-col gap-5 text-sm">

                        <h4 className="text-white/50 hover:text-accent font-mono text-xs uppercase tracking-widest mb-3 transition cursor-default">
                            Contacto
                        </h4>

                        <div className="flex gap-3 items-start group">
                            <MapPin className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/80 leading-relaxed">
                                Ituzaingó | Castelar<br />
                                Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Phone className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/80">
                                +54 9 11 6565-7291

                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <MessageCircle className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/80">
                                WhatsApp: 11 6565-7291
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Clock className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/80">
                                Lun a Vie de 9 a 17hs
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Mail className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/80">
                                proyectos.linel@gmail.com
                            </p>
                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs font-mono uppercase tracking-widest text-white/60">

                    <p>
                        © {new Date().getFullYear()} Linel. Todos los derechos reservados.
                    </p>

                    <div className="flex items-center gap-4">

                        <span className="text-white/70">
                            Linel.com.ar
                        </span>

                        <div className="flex gap-3">

                            <a
                                href="https://www.facebook.com/linelDigital/?rdid=RL6EIKA1EUVzo1si" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>

                            <a
                                href="https://www.instagram.com/linel_digital?igsh=YWIxaXFobHFqdjFq" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>

                        </div>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
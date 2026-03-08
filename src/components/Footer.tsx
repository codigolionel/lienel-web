import { MapPin, Phone, Clock, Mail, MessageCircle, Facebook, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer
            id="contacto"
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

                        <p className="text-white/60 text-sm leading-relaxed">
                            Diseños modernos y adaptables que muestran lo mejor de tu marca
                            y funcionan en todos los dispositivos.
                        </p>

                        {/* Redes */}
                        <div className="flex gap-3">

                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>

                        </div>
                    </div>


                    {/* Navegación */}
                    <div className="flex flex-col gap-4 text-sm">

                        <h4 className="text-white/30 font-mono text-xs uppercase tracking-widest mb-3">
                            Navegación
                        </h4>

                        <a href="#inicio" className="text-white/60 hover:text-primary transition">
                            Inicio
                        </a>

                        <a href="#servicios" className="text-white/60 hover:text-primary transition">
                            Servicios
                        </a>

                        <a href="#trabajos" className="text-white/60 hover:text-primary transition">
                            Trabajos
                        </a>

                        <a href="#contacto" className="text-white/60 hover:text-primary transition">
                            Contacto
                        </a>

                    </div>


                    {/* Servicios */}
                    <div className="flex flex-col gap-4 text-sm">

                        <h4 className="text-white/30 font-mono text-xs uppercase tracking-widest mb-3">
                            Servicios
                        </h4>

                        <span className="text-white/60">Diseño Web</span>
                        <span className="text-white/60">SEO</span>
                        <span className="text-white/60">Hosting</span>
                        <span className="text-white/60">Dominio</span>
                        <span className="text-white/60">Mantenimiento</span>

                    </div>


                    {/* Contacto */}
                    <div className="flex flex-col gap-5 text-sm">

                        <h4 className="text-white/30 font-mono text-xs uppercase tracking-widest mb-3">
                            Contacto
                        </h4>

                        <div className="flex gap-3 items-start group">
                            <MapPin className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/60 leading-relaxed">
                                Mirave 1700/1800 Ituzaingó<br />
                                Buenos Aires, Argentina
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Phone className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/60">
                                +54 9 11 6565-7291

                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <MessageCircle className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/60">
                                WhatsApp: 11 6565-7291
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Clock className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/60">
                                Lun a Vie de 9 a 17hs
                            </p>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Mail className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition mt-1" />
                            <p className="text-white/60">
                                proyectos.linel@gmail.com
                            </p>
                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs font-mono uppercase tracking-widest text-white/40">

                    <p>
                        © {new Date().getFullYear()} Linel. Todos los derechos reservados.
                    </p>

                    <div className="flex items-center gap-4">

                        <span className="text-white/50">
                            Linel.com.ar
                        </span>

                        <div className="flex gap-3">

                            <a
                                href="#"
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-sky-400 hover:text-sky-300 hover:border-sky-400 transition"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>

                            <a
                                href="#"
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
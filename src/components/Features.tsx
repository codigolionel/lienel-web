import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MousePointer2, Activity, Layers, CodeXml } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {

    const containerRef = useRef<HTMLElement>(null)
    const telemetryRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<SVGSVGElement>(null)
    const siteRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const [deckOrder, setDeckOrder] = useState([0, 1, 2])

    useEffect(() => {

        const interval = setInterval(() => {

            setDeckOrder(prev => {
                const newOrder = [...prev]
                const last = newOrder.pop()!
                newOrder.unshift(last)
                return newOrder
            })

        }, 3000)

        return () => clearInterval(interval)

    }, [])

    useGSAP(() => {

        gsap.from('.feature-panel', {
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
                once: true,
            }
        })

        const tl = gsap.timeline({ repeat: -1 })

        const messages = [
            "Que tu sitio cargue rápido y funcione sin errores...",
            "Que tu web se vea bien en todos los dispositivos...",
            "Optimizando velocidad de carga...",
            "Que tu página esté siempre actualizada..."
        ]

        const targetElement = telemetryRef.current

        if (targetElement) {

            messages.forEach((msg) => {

                tl.to(targetElement, {
                    duration: 1.5,
                    ease: "none",
                    onUpdate: function () {
                        const progress = this.progress()
                        const charCount = Math.floor(progress * msg.length)
                        targetElement.innerText = msg.substring(0, charCount)
                    }
                })
                    .to(targetElement, { duration: 2 })
                    .to(targetElement, {
                        duration: 0.5,
                        onUpdate: function () {
                            const progress = 1 - this.progress()
                            const charCount = Math.floor(progress * msg.length)
                            targetElement.innerText = msg.substring(0, charCount)
                        }
                    })

            })

        }

        if (cursorRef.current && siteRef.current) {

            const cursor = cursorRef.current
            const site = siteRef.current

            const cursorTL = gsap.timeline({ repeat: -1, repeatDelay: 1 })

            cursorTL.set(cursor, {
                x: -120,
                y: -60
            })

            cursorTL.to(cursor, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "power2.inOut"
            })

            cursorTL.to(cursor, {
                scale: 0.85,
                duration: 0.08
            })

            cursorTL.to(site, {
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.7)"
            })

            cursorTL.to(cursor, {
                scale: 1,
                duration: 0.08
            })

            cursorTL.to(site, {
                scale: 0,
                delay: 2,
                duration: 0.4
            })

        }

    }, { scope: containerRef })

    const cards = [
        { id: 0, title: 'Landing Pages', desc: 'enfocadas en captar clientes y generar conversiones.', color: 'bg-[#1A1A24]', border: 'border-white/5' },
        { id: 1, title: 'Sitios Corporativos', desc: 'presencia online para empresas y profesionales.', color: 'bg-[#1A1A24]', border: 'border-white/10' },
        { id: 2, title: 'Portfolios Profesionales', desc: 'presentación visual de proyectos, trabajos o servicios.', color: 'bg-[#1A1A24]', border: 'border-[#00D2D3]/30' }
    ]

    return (

        <section id="sistemas" ref={containerRef} className="w-full bg-[#0B0B10] text-[#FFFFFF] py-32 sm:py-48 px-8 relative z-20 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                <div className="mb-24 relative">

                    <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-7xl max-w-4xl leading-tight">
                        La Web precisa que <span className="text-transparent bg-clip-text bg-[#EE32A0] not-italic font-sans font-bold tracking-tight">Imaginas...</span><br />Lista para vos.
                    </h2>

                    <p className="mt-8 text-sm sm:text-base md:text-lg lg:text-xl !text-white font-sans font-semibold tracking-wide max-w-2xl text-pretty" style={{color: 'white', opacity: 1}}>
                        sin complicaciones. diseño de sitios claros, rápidos y adaptados a tu necesidad.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                    {/* PANEL 1 */}

                    <div className="feature-panel relative bg-white/5 rounded-[2rem] p-8 md:p-10 border border-white/10 hover:border-[#EE32A0]/50 transition-colors duration-500 shadow-sm h-[400px] flex flex-col items-center justify-end overflow-hidden group">

                        <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
                            <Layers className="w-6 h-6 text-[#00D2D3]" />
                            <span className="font-bold text-sm tracking-widest uppercase text-white">Servicios</span>
                        </div>

                        <div className="relative w-full h-full flex flex-col items-center justify-center">

                            {cards.map((card) => {

                                const positionIndex = deckOrder.indexOf(card.id)
                                const isFront = positionIndex === 2

                                return (

                                    <div
                                        key={card.id}
                                        className={`absolute w-full max-w-[310px] p-8 rounded-full border ${card.color} ${card.border} transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xl flex flex-col items-center justify-center gap-4 text-center`}
                                        style={{
                                            transform: `translateY(${(2 - positionIndex) * -15}px) scale(${1 - (2 - positionIndex) * 0.05})`,
                                            zIndex: positionIndex,
                                            opacity: positionIndex === 0 ? 0.6 : positionIndex === 1 ? 0.8 : 1,
                                            filter: isFront ? 'none' : 'blur(2px)'
                                        }}
                                    >

                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <div className={`w-2 h-2 rounded-full ${isFront ? 'bg-[#00D2D3] shadow-[0_0_10px_#00D2D3]' : 'bg-white/30'}`}></div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold font-sans text-lg text-white">{card.title}</h4>
                                            <p className="text-xs text-white/70 mt-1">{card.desc}</p>
                                        </div>

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                    {/* PANEL 2 */}

                    <div className="feature-panel relative bg-[#12121A] text-white rounded-[2rem] p-8 md:p-10 border border-white/10 hover:border-[#EE32A0]/50 transition-colors duration-500 shadow-xl h-[400px] flex flex-col overflow-hidden group">

                        <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">

                            <div className="flex items-center gap-3 text-white">
                                <Activity className="w-6 h-6 text-[#00D2D3]" />
                                <span className="font-bold text-sm tracking-widest uppercase font-sans">Principios Web</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-[#00D2D3]">in Line</span>
                                <div className="w-2 h-2 rounded-full bg-[#00D2D3] shadow-[0_0_8px_#00D2D3] animate-pulse"></div>
                            </div>

                        </div>

                        <div className="mt-auto relative w-full font-mono text-sm tracking-tight text-white/70 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">

                            <div className="flex gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>

                            <div className="flex">
                                <span className="text-[#EE32A0] font-bold mr-2">{'>'}</span>
                                <span ref={telemetryRef} className="min-h-[40px] text-white">Iniciando...</span>
                                <span className="inline-block w-2 h-4 bg-[#00D2D3] shadow-[0_0_5px_#00D2D3] ml-1 animate-[pulse_1s_step-end_infinite]"></span>
                            </div>

                        </div>

                    </div>

                    {/* PANEL 3 */}

                    <div className="feature-panel relative bg-white/5 rounded-[2rem] p-8 md:p-10 border border-white/10 hover:border-[#EE32A0]/50 transition-colors duration-500 shadow-sm h-[400px] flex flex-col overflow-hidden group">

                        <div className="flex items-center gap-3 z-20 mb-8">
                            <CodeXml className="w-6 h-6 text-[#00D2D3]" />
                            <span className="font-bold text-sm tracking-widest uppercase text-white">
                                Animaciones Web
                            </span>
                        </div>

                        <div className="relative w-full flex-1 flex items-center justify-center bg-black/30 rounded-xl border border-white/5 overflow-hidden group-hover:border-[#EE32A0]/20 transition-colors duration-500">

                            <div className="absolute z-10 pointer-events-none drop-shadow-lg">
                                <MousePointer2
                                    ref={cursorRef}
                                    className="w-8 h-8 text-[#00D2D3] fill-[#00D2D3]"
                                    strokeWidth={1}
                                />
                            </div>

                            <button
                                ref={buttonRef}
                                className="absolute bg-[#00D2D3] hover:bg-[#EE32A0] transition-colors text-[#0B0B10] px-6 py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(0,210,211,0.4)] hover:shadow-[0_0_20px_rgba(238,50,160,0.5)]"
                            >
                                Click
                            </button>

                            <div
                                ref={siteRef}
                                className="absolute w-[220px] h-[140px] bg-[#1A1A24] rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden scale-0"
                            >

                                <div className="h-6 bg-white/5 flex items-center px-2 gap-1 border-b border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                </div>

                                <div className="p-3 space-y-2">
                                    <div className="h-3 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                    <div className="h-8 bg-gradient-to-r from-[#00D2D3]/20 to-[#EE32A0]/20 rounded"></div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    )

}

export default Features
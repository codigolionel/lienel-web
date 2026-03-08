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
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%'
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
        { id: 0, title: 'Landing Pages', desc: 'enfocadas en captar clientes y generar conversiones.', color: 'bg-[#fafafa]', border: 'border-charcoal/10' },
        { id: 1, title: 'Sitios Corporativos', desc: 'presencia online para empresas y profesionales.', color: 'bg-[#f4f4f4]', border: 'border-accent/20' },
        { id: 2, title: 'Portfolios Profesionales', desc: 'presentación visual de proyectos, trabajos o servicios.', color: 'bg-white', border: 'border-charcoal/20' }
    ]

    return (

        <section id="sistemas" ref={containerRef} className="w-full bg-[#fcf9f2] text-charcoal py-32 sm:py-48 px-8 relative z-20 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                <div className="mb-24 relative">

                    <h2 className="font-serif italic text-5xl sm:text-7xl max-w-4xl leading-tight">
                        La Web precisa que <span className="text-accent not-italic font-sans font-bold tracking-tight">Imaginas...</span><br />Lista para vos.
                    </h2>

                    <p className="mt-8 text-xl text-charcoal/70 max-w-2xl font-sans font-medium tracking-wide text-sm sm:text-base text-pretty">
                        sin complicaciones. diseño de sitios claros, rápidos y adaptados a tu necesidad.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                    {/* PANEL 1 */}

                    <div className="feature-panel relative bg-white rounded-[2rem] p-8 md:p-10 border border-charcoal/5 shadow-sm h-[400px] flex flex-col items-center justify-end overflow-hidden group">

                        <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
                            <Layers className="w-6 h-6 text-accent" />
                            <span className="font-bold text-sm tracking-widest uppercase">Servicios</span>
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

                                        <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center">
                                            <div className={`w-2 h-2 rounded-full ${isFront ? 'bg-accent' : 'bg-charcoal/30'}`}></div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold font-sans text-lg">{card.title}</h4>
                                            <p className="text-xs text-charcoal/60 mt-1">{card.desc}</p>
                                        </div>

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                    {/* PANEL 2 */}

                    <div className="feature-panel relative bg-[#1A1A1A] text-white rounded-[2rem] p-8 md:p-10 border border-charcoal/20 shadow-xl h-[400px] flex flex-col overflow-hidden">

                        <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">

                            <div className="flex items-center gap-3 text-white/80">
                                <Activity className="w-6 h-6" />
                                <span className="font-bold text-sm tracking-widest uppercase font-sans">Principios Web</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-accent">in Line</span>
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                            </div>

                        </div>

                        <div className="mt-auto relative w-full font-mono text-sm tracking-tight text-white/70 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">

                            <div className="flex gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>

                            <div className="flex">
                                <span className="text-accent mr-2">{'>'}</span>
                                <span ref={telemetryRef} className="min-h-[40px]">Iniciando...</span>
                                <span className="inline-block w-2 h-4 bg-white/80 ml-1 animate-[pulse_1s_step-end_infinite]"></span>
                            </div>

                        </div>

                    </div>

                    {/* PANEL 3 */}

                    <div className="feature-panel relative bg-white rounded-[2rem] p-8 md:p-10 border border-charcoal/5 shadow-sm h-[400px] flex flex-col overflow-hidden">

                        <div className="flex items-center gap-3 z-20 mb-8">
                            <CodeXml className="w-6 h-6 text-charcoal" />
                            <span className="font-bold text-sm tracking-widest uppercase text-charcoal">
                                Animaciones Web
                            </span>
                        </div>

                        <div className="relative w-full flex-1 flex items-center justify-center bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">

                            <div className="absolute z-10 pointer-events-none drop-shadow-lg">
                                <MousePointer2
                                    ref={cursorRef}
                                    className="w-8 h-8 text-green-500 fill-green-500"
                                    strokeWidth={1}
                                />
                            </div>

                            <button
                                ref={buttonRef}
                                className="absolute bg-accent text-white px-6 py-2 rounded-lg font-semibold shadow-md"
                            >
                                Click
                            </button>

                            <div
                                ref={siteRef}
                                className="absolute w-[220px] h-[140px] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden scale-0"
                            >

                                <div className="h-6 bg-gray-100 flex items-center px-2 gap-1 border-b border-gray-200">
                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                </div>

                                <div className="p-3 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-8 bg-accent/20 rounded"></div>
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
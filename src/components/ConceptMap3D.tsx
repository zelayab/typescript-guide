'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const concepts = [
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Fundamentos y conceptos básicos',
    color: 'from-blue-500/80 to-blue-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['Tipos', 'Interfaces', 'Clases']
  },
  {
    id: 'types',
    title: 'Tipos Básicos',
    description: 'String, Number, Boolean, Array, etc.',
    color: 'from-purple-500/80 to-purple-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['String', 'Number', 'Boolean']
  },
  {
    id: 'classes',
    title: 'Clases & OOP',
    description: 'Programación orientada a objetos',
    color: 'from-pink-500/80 to-pink-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['Herencia', 'Encapsulación', 'Polimorfismo']
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    description: 'Contratos y tipos personalizados',
    color: 'from-amber-500/80 to-amber-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['Extensión', 'Implementación', 'Tipos']
  },
  {
    id: 'generics',
    title: 'Genéricos',
    description: 'Tipos reutilizables y flexibles',
    color: 'from-emerald-500/80 to-emerald-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['T, U, K', 'Constraints', 'Defaults']
  },
  {
    id: 'decorators',
    title: 'Decoradores',
    description: 'Metaprogramación y anotaciones',
    color: 'from-rose-500/80 to-rose-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['Clase', 'Método', 'Propiedad']
  },
  {
    id: 'async',
    title: 'Async/Await',
    description: 'Programación asíncrona y manejo de promesas',
    color: 'from-cyan-500/80 to-cyan-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['Promesas', 'Async/Await', 'Callbacks']
  },
  {
    id: 'modules',
    title: 'Módulos',
    description: 'Organización y reutilización de código',
    color: 'from-teal-500/80 to-teal-700/80',
    textColor: 'text-white',
    titleGlow: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    subItems: ['Exportación', 'Importación', 'Namespaces']
  },
  {
    id: 'namespaces',
    title: 'Namespaces',
    description: 'Organización y reutilización de código',
    color: 'from-teal-500/80 to-teal-700/80',
    textColor: 'text-white',
    
  }
]
function ConceptCard({ concept }: { concept: typeof concepts[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Actualizar variables CSS personalizadas para el efecto glow
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      setRotation({ x: rotateX, y: rotateY })
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.05 : 1,
          z: isHovered ? 50 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        <Card 
          className={`
            relative p-6 bg-gradient-to-br ${concept.color} 
            transform-gpu transition-colors duration-300
            cursor-pointer h-full min-h-[200px] backdrop-blur-sm
            border border-white/20 shadow-xl
          `}
        >
          <div className="relative z-10">
            <h3 
              className={`text-3xl font-bold mb-3 ${concept.textColor}`}
              style={{ 
                filter: concept.titleGlow,
                letterSpacing: '0.025em'
              }}
            >
              {concept.title}
            </h3>
            <p className={`${concept.textColor} text-opacity-90 font-medium mb-4 text-lg`}>
              {concept.description}
            </p>
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ul className={`space-y-2 mt-4 border-t border-white/20 pt-4 ${concept.textColor} text-opacity-90`}>
                {concept.subItems?.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ 
                      x: isHovered ? 0 : -20,
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-lg"
                  >
                    <div className={`w-2 h-2 rounded-full bg-white/70 mr-3`} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  circle at ${(rotation.x + 50)}% ${(rotation.y + 50)}%,
                  rgba(255,255,255,0.25) 0%,
                  rgba(255,255,255,0) 60%
                )
              `,
              transform: 'translateZ(1px)'
            }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function ConceptMap3D() {
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16"
      >
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </motion.div>
    </div>
  )
} 
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative">
        {/* Círculo exterior */}
        <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full relative">
          {/* Círculo animado */}
          <div className="w-20 h-20 border-4 border-blue-500 rounded-full absolute top-0 left-0 border-t-transparent animate-gradient-spin" />
        </div>
        
        {/* Texto de carga */}
        <div className="mt-6 text-center">
          <span className="text-blue-400 font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            Cargando...
          </span>
        </div>

        {/* Círculos decorativos */}
        <div className="absolute -top-10 -left-10 w-6 h-6 bg-purple-500/20 rounded-full animate-ping [animation-duration:3s]" />
        <div className="absolute -bottom-8 -right-8 w-4 h-4 bg-blue-500/20 rounded-full animate-ping [animation-duration:2s] [animation-delay:0.2s]" />
        <div className="absolute top-0 -right-6 w-3 h-3 bg-cyan-500/20 rounded-full animate-ping [animation-duration:2.5s] [animation-delay:0.4s]" />

        {/* Destellos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 bg-blue-500/5 rounded-full animate-pulse" />
          <div className="w-40 h-40 bg-purple-500/5 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  )
} 
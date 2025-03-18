export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-8">
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="w-96 h-12 bg-gray-200 rounded-lg animate-pulse mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-full">
            <div className="sticky top-4">
              <div className="rounded-lg border border-purple-100 overflow-hidden bg-white shadow-sm">
                <div className="border-b border-purple-100 bg-purple-50/50 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-purple-800">Teoría</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full">
            <div className="sticky top-4">
              <div className="rounded-lg border border-blue-100 overflow-hidden bg-white shadow-sm">
                <div className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-blue-800">Ejemplo Práctico</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
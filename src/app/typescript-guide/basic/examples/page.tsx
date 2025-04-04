'use client'

import { useState } from 'react';
import { angularExamples } from './data/angular-examples';
import { nextjsExamples } from './data/nextjs-examples';
import { reactExamples } from './data/react-examples';
import { typescriptCommonExamples } from './data/typescript-common-examples';

const allExamples = [
  ...reactExamples,
  ...nextjsExamples,
  ...angularExamples,
  ...typescriptCommonExamples
];

const frameworks = ['react', 'nextjs', 'typescript-common', 'angular'] as const;
const categories = ['basic', 'intermediate', 'advanced'] as const;

const frameworkLabels: Record<typeof frameworks[number], string> = {
  'react': 'REACT',
  'nextjs': 'NEXTJS',
  'angular': 'ANGULAR',
  'typescript-common': 'TYPESCRIPT-COMMON'
};

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState(allExamples[0]);
  const [selectedFramework, setSelectedFramework] = useState<typeof frameworks[number]>('react');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('basic');

  const filteredExamples = allExamples.filter(
    example => example.framework === selectedFramework && example.category === selectedCategory
  );

  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#0F0F0F] border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            ← Volver
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {/* Framework Selection */}
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Framework</h2>
            <div className="grid grid-cols-2 gap-2">
              {frameworks.map(framework => (
                <button
                  key={framework}
                  onClick={() => setSelectedFramework(framework)}
                  className={`px-3 py-2 text-sm rounded-lg text-center transition-colors ${
                    selectedFramework === framework
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {frameworkLabels[framework]}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Nivel</h2>
            <div className="flex flex-col gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 text-sm rounded-lg text-left capitalize transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Examples List */}
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Ejemplos</h2>
            <div className="space-y-2">
              {filteredExamples.map(example => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    selectedExample.id === example.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {example.title}
                </button>
              ))}
              {filteredExamples.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No hay ejemplos disponibles para esta combinación
                </p>
              )}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">
                {selectedExample.title}
              </h1>
              <div className="flex gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900 text-blue-200">
                  {selectedExample.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                  {frameworkLabels[selectedExample.framework]}
                </span>
              </div>
            </div>
            
            <p className="text-gray-400">
              {selectedExample.description}
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <pre className="overflow-x-auto">
              <code className="text-gray-300 text-sm">
                {selectedExample.code}
              </code>
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Explicación
              </h3>
              <p className="text-gray-400">
                {selectedExample.explanation}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Uso en el Mundo Real
              </h3>
              <p className="text-gray-400">
                {selectedExample.realWorldUsage}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
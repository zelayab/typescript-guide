export interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  realWorldUsage: string;
  category: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
  framework: 'react' | 'nextjs' | 'angular' | 'typescript-common';
}

export type ExamplesByFramework = Record<string, Record<'basic' | 'intermediate' | 'advanced', Example[]>>; 
declare module 'vitest' {
    export * from 'vitest';
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly vitest: typeof import('vitest');
} 
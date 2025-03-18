/**
 * TYPESCRIPT COMPILER API
 * ====================
 * 
 * Uso avanzado del Compiler API de TypeScript para
 * análisis estático y transformaciones de código.
 */

import * as ts from 'typescript';

// 1. Analizador de AST
function analyzeSourceFile(sourceFile: ts.SourceFile) {
    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node)) {
            console.log('Found class:', node.name?.text);
        } else if (ts.isInterfaceDeclaration(node)) {
            console.log('Found interface:', node.name.text);
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
}

// 2. Transformador de Código
const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        function visit(node: ts.Node): ts.Node {
            if (ts.isClassDeclaration(node)) {
                return ts.factory.updateClassDeclaration(
                    node,
                    node.decorators,
                    node.modifiers,
                    node.name,
                    node.typeParameters,
                    node.heritageClauses,
                    node.members.map(member => ts.visitNode(member, visit))
                );
            }
            return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(sourceFile, visit);
    };
};

// 3. Type Checker API
function analyzeTypes(program: ts.Program) {
    const typeChecker = program.getTypeChecker();
    
    function visit(node: ts.Node) {
        if (ts.isCallExpression(node)) {
            const signature = typeChecker.getResolvedSignature(node);
            if (signature) {
                console.log('Function call return type:', 
                    typeChecker.typeToString(signature.getReturnType()));
            }
        }
        ts.forEachChild(node, visit);
    }
}

// 4. Custom Language Service
class CustomLanguageService implements ts.LanguageService {
    constructor(
        private info: ts.server.PluginCreateInfo,
        private delegate: ts.LanguageService
    ) {}

    getCompletionsAtPosition(
        fileName: string,
        position: number,
        options: ts.GetCompletionsAtPositionOptions
    ): ts.CompletionInfo | undefined {
        const original = this.delegate.getCompletionsAtPosition(
            fileName,
            position,
            options
        );
        
        // Añadir sugerencias personalizadas
        return original;
    }
}

// 5. Generador de Código
function generateTypeScriptCode(ast: ts.Node): string {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const sourceFile = ts.createSourceFile(
        'generated.ts',
        '',
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.TS
    );
    return printer.printNode(ts.EmitHint.Unspecified, ast, sourceFile);
}

// Ejercicios prácticos
// 1. Implementar un analizador de dependencias
// 2. Crear un transformador de decoradores
// 3. Desarrollar un plugin para el language service 
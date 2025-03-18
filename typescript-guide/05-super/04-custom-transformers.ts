/**
 * TRANSFORMADORES PERSONALIZADOS
 * ==========================
 * 
 * Implementación de transformadores personalizados para
 * modificar el código TypeScript durante la compilación.
 */

import * as ts from 'typescript';

// 1. Transformador de Decoradores
const decoratorTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        function visitNode(node: ts.Node): ts.Node {
            if (ts.isClassDeclaration(node) && node.decorators) {
                return ts.factory.updateClassDeclaration(
                    node,
                    node.decorators,
                    [...(node.modifiers || [])],
                    node.name,
                    node.typeParameters,
                    node.heritageClauses,
                    node.members
                );
            }
            return ts.visitEachChild(node, visitNode, context);
        }
        return ts.visitNode(sourceFile, visitNode);
    };
};

// 2. Transformador de Importaciones
const importTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        const visitor = (node: ts.Node): ts.Node => {
            if (ts.isImportDeclaration(node)) {
                const moduleSpecifier = node.moduleSpecifier as ts.StringLiteral;
                if (moduleSpecifier.text.startsWith('./')) {
                    return ts.factory.updateImportDeclaration(
                        node,
                        node.decorators,
                        node.modifiers,
                        node.importClause,
                        ts.factory.createStringLiteral(moduleSpecifier.text.replace('./', '@/')),
                        undefined
                    );
                }
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
    };
};

// 3. Transformador de Optimización
const optimizationTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        const visitor = (node: ts.Node): ts.Node => {
            if (ts.isCallExpression(node) && 
                ts.isPropertyAccessExpression(node.expression) &&
                node.expression.name.text === 'map') {
                // Optimizar operaciones map-filter
                return optimizeMapFilter(node, context);
            }
            return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor);
    };
};

// 4. Sistema de Plugins para Transformadores
interface TransformerPlugin {
    before?: ts.TransformerFactory<ts.SourceFile>;
    after?: ts.TransformerFactory<ts.SourceFile>;
}

class TransformerRegistry {
    private plugins: TransformerPlugin[] = [];

    register(plugin: TransformerPlugin): void {
        this.plugins.push(plugin);
    }

    getTransformers(): ts.CustomTransformers {
        return {
            before: this.plugins.map(p => p.before).filter(Boolean) as ts.TransformerFactory<ts.SourceFile>[],
            after: this.plugins.map(p => p.after).filter(Boolean) as ts.TransformerFactory<ts.SourceFile>[]
        };
    }
}

// Ejercicios prácticos
// 1. Implementar un transformador para inyección de dependencias
// 2. Crear un optimizador de imports
// 3. Desarrollar un transformador para logging automático 
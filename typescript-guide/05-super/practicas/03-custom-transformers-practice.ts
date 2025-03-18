/**
 * PRÁCTICAS DE TRANSFORMADORES PERSONALIZADOS
 */

import * as ts from 'typescript';

// Ejercicio 1: Transformador de logging automático
const loggingTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        function visitMethodDeclaration(node: ts.MethodDeclaration): ts.MethodDeclaration {
            const methodName = node.name.getText();
            const parameters = node.parameters.map(p => p.name.getText());

            const logStatement = ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier('console'),
                        'log'
                    ),
                    undefined,
                    [
                        ts.factory.createStringLiteral(
                            `Calling ${methodName} with parameters: `
                        ),
                        ...parameters.map(p => ts.factory.createIdentifier(p))
                    ]
                )
            );

            const newBody = ts.factory.createBlock([
                logStatement,
                ...(node.body?.statements || [])
            ], true);

            return ts.factory.updateMethodDeclaration(
                node,
                node.decorators,
                node.modifiers,
                node.asteriskToken,
                node.name,
                node.questionToken,
                node.typeParameters,
                node.parameters,
                node.type,
                newBody
            );
        }

        function visit(node: ts.Node): ts.Node {
            if (ts.isMethodDeclaration(node)) {
                return visitMethodDeclaration(node);
            }
            return ts.visitEachChild(node, visit, context);
        }

        return ts.visitNode(sourceFile, visit);
    };
};

// Ejercicio 2: Transformador de optimización de imports
const importOptimizer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        const usedIdentifiers = new Set<string>();
        const importDeclarations: ts.ImportDeclaration[] = [];

        // Primera pasada: recolectar identificadores usados
        function collectIdentifiers(node: ts.Node) {
            if (ts.isIdentifier(node)) {
                usedIdentifiers.add(node.text);
            }
            ts.forEachChild(node, collectIdentifiers);
        }

        // Segunda pasada: optimizar imports
        function optimizeImports(node: ts.Node): ts.Node {
            if (ts.isImportDeclaration(node)) {
                const importClause = node.importClause;
                if (importClause && importClause.namedBindings) {
                    if (ts.isNamedImports(importClause.namedBindings)) {
                        const usedImports = importClause.namedBindings.elements
                            .filter(element => usedIdentifiers.has(element.name.text));

                        if (usedImports.length === 0) {
                            return ts.factory.createEmptyStatement();
                        }

                        return ts.factory.updateImportDeclaration(
                            node,
                            node.decorators,
                            node.modifiers,
                            ts.factory.createImportClause(
                                false,
                                undefined,
                                ts.factory.createNamedImports(usedImports)
                            ),
                            node.moduleSpecifier
                        );
                    }
                }
            }
            return ts.visitEachChild(node, optimizeImports, context);
        }

        // Aplicar transformaciones
        ts.forEachChild(sourceFile, collectIdentifiers);
        return ts.visitNode(sourceFile, optimizeImports);
    };
};

// Ejercicio 3: Transformador para inyección de metadatos
interface MetadataConfig {
    className: string;
    metadata: Record<string, any>;
}

const metadataTransformer = (config: MetadataConfig[]): ts.TransformerFactory<ts.SourceFile> => {
    return context => {
        return sourceFile => {
            function visit(node: ts.Node): ts.Node {
                if (ts.isClassDeclaration(node) && node.name) {
                    const className = node.name.text;
                    const classConfig = config.find(c => c.className === className);

                    if (classConfig) {
                        const decoratorExpression = ts.factory.createCallExpression(
                            ts.factory.createIdentifier('Metadata'),
                            undefined,
                            [ts.factory.createObjectLiteralExpression(
                                Object.entries(classConfig.metadata).map(([key, value]) =>
                                    ts.factory.createPropertyAssignment(
                                        key,
                                        ts.factory.createStringLiteral(String(value))
                                    )
                                ),
                                true
                            )]
                        );

                        const decorator = ts.factory.createDecorator(decoratorExpression);

                        return ts.factory.updateClassDeclaration(
                            node,
                            [decorator, ...(node.decorators || [])],
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            node.members
                        );
                    }
                }
                return ts.visitEachChild(node, visit, context);
            }
            return ts.visitNode(sourceFile, visit);
        };
    };
}; 
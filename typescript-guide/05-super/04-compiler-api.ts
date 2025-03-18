/**
 * API DEL COMPILADOR 🔧
 * ==================
 * 
 * ¡Vamos a hablar directamente con el compilador de TypeScript!
 * Como tener una conversación con el mago más sabio.
 */

// Análisis de Código 📝
// Como leer un libro mágico y entender cada palabra
import * as ts from 'typescript';

function analizarCodigo(codigo: string) {
    const sourceFile = ts.createSourceFile(
        'archivo.ts',
        codigo,
        ts.ScriptTarget.Latest,
        true
    );

    function visitarNodo(nodo: ts.Node) {
        console.log(`🔍 Encontré un ${ts.SyntaxKind[nodo.kind]}`);
        ts.forEachChild(nodo, visitarNodo);
    }

    visitarNodo(sourceFile);
}

// Transformación de AST 🌳
// Como modificar un hechizo mientras se lanza
function transformarCodigo(codigo: string): string {
    const sourceFile = ts.createSourceFile(
        'archivo.ts',
        codigo,
        ts.ScriptTarget.Latest,
        true
    );

    const transformador = <T extends ts.Node>(context: ts.TransformationContext) => 
        (rootNode: T) => {
            function visitar(nodo: ts.Node): ts.Node {
                if (ts.isIdentifier(nodo)) {
                    return ts.createIdentifier(`magic_${nodo.text}`);
                }
                return ts.visitEachChild(nodo, visitar, context);
            }
            return ts.visitNode(rootNode, visitar);
        };

    const resultado = ts.transform(sourceFile, [transformador]);
    const printer = ts.createPrinter();
    return printer.printFile(resultado.transformed[0] as ts.SourceFile);
}

// Ejercicios legendarios 🎮
// 1. Crea un analizador que encuentre funciones impuras
// 2. Implementa un transformador que agregue logging automático
// 3. Crea un validador de código personalizado 
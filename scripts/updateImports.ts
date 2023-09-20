import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isAbsolutePath(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'pages', 'widgets'];
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const imports = sourceFile.getImportDeclarations();
  imports.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    if (isAbsolutePath(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();

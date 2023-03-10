---
title: 'Configuração do Plop.js no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Nesta aula, vamos aprender como criar componentes dinâmicos e seus testes unitários com Chakra UI e Plop.js.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

Aqui está o roteiro da aula:

1.  Instalação de dependências:

* Instalar o Plop.js globalmente usando npm ou yarn: `npm install -g plop` ou `yarn global add plop`

2.  Configuração do Plop.js:

* Criar um diretório de ações dentro do seu projeto: mkdir plopfile.js
    
* Adicionar o seguinte código ao plopfile.js: 
```typescript
module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "type",
        message: "put the ui file in atoms, molecules, organisms or templates?",
      },
      {
        type: "input",
        name: "name",
        message: "what the name of component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/shared/ui/{{camelCase type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "templates/Component/Component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/shared/ui/{{camelCase type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/shared/ui/{{camelCase type}}/{{pascalCase name}}/index.ts",
        templateFile: "templates/Component/index.ts.hbs",
      },
      {
        type: "modify",
        path: "../src/shared/ui/{{camelCase type}}/index.ts",
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: '$1\nexport * from "./{{pascalCase name}}";',
      },
    ],
  });
}; 
```

    
* Criar um diretório de modelos dentro do seu projeto: mkdir templates:

Templates são arquivos com modelos pré-definidos para serem usados como base na geração de código. Para criá-los, você pode criar o diretório "plop-templates/Component" na raiz do projeto e incluir os arquivos "index.hbs", "stories.hbs" e "test.hbs" com o código dos componentes.
    
* Criar os arquivos de modelo para o componente:

```hbs
import { {{pascalCase name}} as {{pascalCase name}}Chakra, {{pascalCase name}}Props } from "@chakra-ui/react";
export const {{pascalCase name}} = ({ children, ...rest }: {{pascalCase name}}Props) => {
  return (
    <{{pascalCase name}}Chakra {...rest} data-testid="{{pascalCase name}}TestId">
      {children}
    </{{pascalCase name}}Chakra>
  );
};
```
Criação de componentes dinâmicos: O Plop permite criar componentes dinâmicos com base em um modelo. Você pode definir um modelo e, a partir dele, gerar novos componentes, com nome, arquivos e código já pré-definidos.


```hbs
import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { {{pascalCase name}} } from "./{{pascalCase name}}";

describe("<{{pascalCase name}}/>", () => {
  it("should render the {{pascalCase name}} component", () => {
    renderWithTheme(<{{pascalCase name}} />);
    expect(screen.getByTestId("{{pascalCase name}}TestId")).toBeInTheDocument();
  });
});
```
Testes unitários: A importância dos testes unitários é fundamental para garantir que seus componentes estão funcionando corretamente. Com o Plop, você pode gerar automaticamente os testes unitários para seus componentes.
    
 
3.  Executando o Plop.js:
 
Para gerar um novo componente, você pode rodar o seguinte comando no terminal:

`yarn generate component`

## Exemplo
```typescript
import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Flex } from "./Flex";

describe("<Flex/>", () => {
  it("should render the Flex component", () => {
    renderWithTheme(<Flex />);
    expect(screen.getByTestId("FlexTestId")).toBeInTheDocument();
  });
}); 
``` 
Este é um exemplo de teste unitário para o componente Flex em Chakra UI. O teste usa a biblioteca de teste "@testing-library/react" para garantir que o componente esteja corretamente renderizado na tela. A função "renderWithTheme" é usada para garantir que o tema da aplicação seja aplicado ao componente durante o teste.

A função "it" define uma única verificação que é realizada pelo teste. Nesse caso, a verificação é se o componente Flex está presente na tela e se ele foi identificado pelo atributo "data-testid". O método "expect" é usado para verificar se o componente existe na tela e, se não, o teste falhará.

Os testes unitários são importantes porque ajudam a garantir que o seu código esteja funcionando corretamente e de forma confiável. Eles também ajudam a prevenir regressões futuras, ou seja, garantem que futuras alterações no código não afetem negativamente o componente Flex. Além disso, eles ajudam a garantir a qualidade do código e aumentam a confiança dos desenvolvedores na aplicação. Portanto, é importante dedicar tempo para escrever testes unitários para seus componentes.

```typescript
import { ChakraProvider } from "app/providers/chakraProvider";
import { render } from "@testing-library/react";

export const renderWithTheme = (ui: JSX.Element) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);
``` 
Este é um exemplo de uma função de ajuda "renderWithTheme" que é usada em testes unitários. Ela envolve o componente que está sendo testado em um provedor Chakra, permitindo que o teste consiga acessar a estilização do Chakra UI.

A função "render" é importada do "@testing-library/react", que é uma biblioteca de teste popular para aplicativos React.

A função "renderWithTheme" é passada um elemento JSX, e ela retorna o resultado da chamada "render", que renderiza o elemento JSX dentro do provedor Chakra.

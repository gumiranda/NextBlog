---
title: 'Criação do projeto e primeiro teste unitário no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-22T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Olá pessoal, bem-vindos à nossa primeira aula sobre Next.js. Neste módulo, vamos aprender a criar um projeto Next.js, instalar o ESLint e o Prettier, e criar o primeiro teste unitário usando a React Testing Library.

Primeiramente, vamos criar um novo projeto Next.js usando o comando `npx create-next-app`. Isso irá inicializar um projeto com as configurações padrão do Next.js, e todas as dependências já serão instaladas.

Em seguida, vamos instalar o ESLint e o Prettier para garantir a consistência do código e evitar erros. Para isso, usaremos o comando `npm install --save-dev eslint prettier` ou `yarn add --dev eslint prettier`. Além disso, vamos criar as configurações do ESLint e do Prettier, para que ele possa verificar o código enquanto estamos escrevendo.

Após a instalação, vamos criar o nosso primeiro teste unitário usando a React Testing Library. A React Testing Library é uma biblioteca de testes para componentes React que se concentra em simular o comportamento do usuário, ao invés de apenas verificar se o componente é renderizado corretamente. Para instalá-la, usaremos o comando `npm install --save-dev @testing-library/react` ou `yarn add --dev @testing-library/react`.

Para criar o teste unitário, vamos criar um arquivo de teste `.test.js` na pasta `pages` do projeto, e escrever o código usando a React Testing Library. Neste teste, vamos verificar se o componente principal da página está sendo renderizado corretamente.

```typescript
import { render } from "@testing-library/react";
import Home from "./index";

describe("first test", () => {
  it("should render div", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
```
Este é um exemplo de um teste unitário utilizando a React Testing Library.

A primeira linha importa a função `render` da biblioteca de testes. Em seguida, importa-se o componente `Home` que está sendo testado.

A função `describe` é usada para agrupar um conjunto de testes relacionados, neste caso, agrupando todos os testes sob o nome "first test".

A função `it` é usada para descrever um único teste, neste caso, descrevendo o teste como "should render div".

Dentro da função `it`, o componente `Home` é renderizado usando a função `render`, e o resultado é armazenado na variável `container`. Em seguida, usa-se a função `querySelector` para selecionar o primeiro elemento `div` no componente renderizado, e o resultado é passado para a função `expect`, que verifica se o elemento `div` está presente no documento. Se sim, o teste passa, caso contrário, o teste falha.

Este é um exemplo básico de como escrever testes unitários usando a React Testing Library. No futuro, você pode adicionar mais testes para verificar outras partes do componente e garantir que ele esteja funcionando corretamente.

Bem, é isso pessoal. Nesta aula, aprendemos como criar um projeto Next.js, instalar o ESLint e o Prettier, e criar o primeiro teste unitário usando a React Testing Library. Na próxima aula, vamos aprender sobre rotas no Next.js. Até a próxima!

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)
---
title: 'Função utilitária SSR de autenticação no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindo à aula sobre a função utilitária de autenticação no lado do servidor (SSR) para aplicações Next.js. Autenticação é um aspecto fundamental de muitas aplicações modernas que lidam com informações sensíveis do usuário. É importante garantir que os usuários estejam autenticados e autorizados a acessar determinados recursos ou páginas da aplicação.

Nesta aula, você aprenderá a criar uma função utilitária que pode ser usada para proteger rotas que exigem autenticação. Veremos como criar uma função de middleware que verifica se o usuário está autenticado e, se não estiver, redireciona para a página de login. Essa função pode ser aplicada em qualquer página ou rota que exige autenticação, tornando o processo de autenticação mais seguro e confiável.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

Você também aprenderá como usar cookies para armazenar informações de autenticação do usuário e como acessar essas informações no lado do servidor. A função utilitária de autenticação que criaremos usa a biblioteca Nookies para analisar cookies armazenados no navegador do usuário e verificar se o token de autenticação está presente.

Ao final da aula, você terá uma sólida compreensão de como implementar autenticação no lado do servidor em sua aplicação Next.js, permitindo que você construa aplicações mais seguras e confiáveis.
## withSSRAuth
```typescript
import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from "next";
import { parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies["belezixadmin.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
```
A função withSSRAuth é responsável por receber uma função GetServerSideProps que é a função padrão do Next.js para executar lógica server-side em uma página. Essa função de autenticação utiliza o parseCookies da biblioteca nookies para obter o token do usuário autenticado.

Caso o token não esteja presente nos cookies, a função de autenticação redireciona o usuário para a página principal da aplicação. Caso contrário, a função withSSRAuth retorna a execução da função passada como parâmetro fn(ctx).

Essa função utilitária é útil para garantir a segurança em páginas server-side rendering que requerem autenticação, garantindo que o usuário esteja autenticado antes de acessar as informações. A função withSSRAuth pode ser utilizada em qualquer página que requer autenticação e que utilize server-side rendering.
## withSSRGuest
```tsx
import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies["belezixadmin.token"]) {
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
```
Esse código define uma função utilitária chamada `withSSRGuest` que pode ser utilizada em conjunto com a função `getServerSideProps` do Next.js para garantir que somente usuários não autenticados tenham acesso a determinadas páginas do site.

A função recebe um argumento `fn`, que é a função `getServerSideProps` original. Ela retorna uma função assíncrona que recebe o objeto `GetServerSidePropsContext` como argumento e retorna uma `Promise` com um objeto `GetServerSidePropsResult` que possui informações que serão passadas para a página.

Dentro da função assíncrona, é feita a leitura dos cookies utilizando a função `parseCookies` da biblioteca `nookies`. Se o cookie "belezixadmin.token" estiver presente (indicando que o usuário já está autenticado), a função retorna um objeto de redirecionamento para a página de home. Caso contrário, a função `fn` original é executada e retorna suas informações normalmente.

Essa função utilitária é útil para proteger rotas que exigem autenticação para serem acessadas. É comum em aplicações web, onde há áreas restritas que só podem ser acessadas por usuários autenticados. O uso dessa função garante que somente usuários não autenticados possam acessar a página, redirecionando usuários autenticados para a home por ser uma página de caráter exclusivo a usuários não logados.
## Uso em uma página
```tsx
import { CategoryListTablePage } from "screens/category/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const data: any = [{ id: 1 }];
  return {
    props: {
      data,
    },
  };
});

export default CategoryListTablePage;
```
O código acima é um exemplo de uso da função utilitária `withSSRAuth`, que realiza a verificação de autenticação do usuário em uma página Next.js. Nesse exemplo, a página sendo protegida é `CategoryListTablePage`.

Através do método `getServerSideProps`, que é utilizado pelo Next.js para pré-renderizar a página no lado do servidor, a função `withSSRAuth` é chamada passando como parâmetro uma função assíncrona que irá retornar os dados a serem exibidos na página.

O `withSSRAuth` retorna uma função assíncrona que recebe o `context`, que representa o contexto da requisição, e realiza a verificação se o usuário está autenticado através do `parseCookies` do pacote `nookies`.

Se o usuário não estiver autenticado, é retornado um objeto `redirect` contendo a `destination`, que indica para onde o usuário será redirecionado, e `permanent`, que indica se o redirecionamento é permanente ou não.

Se o usuário estiver autenticado, a função passada como parâmetro é chamada e seus resultados são passados para a página como props através do objeto retornado.

Por fim, a página exporta tanto a função `getServerSideProps` quanto o componente `CategoryListTablePage`, permitindo que o Next.js pré-renderize a página no servidor e aplique a lógica de autenticação antes de exibi-la.

## Conclusão
Nesta aula, aprendemos sobre a função utilitária de autenticação do lado do servidor em Next.js. Essa função é útil para garantir que determinadas páginas da web sejam acessíveis apenas para usuários autenticados e, se o usuário não estiver autenticado, redirecioná-los para uma página de login ou para outra página de destino.

Além disso, vimos que a função utilitária pode ser facilmente reutilizada em diferentes páginas, permitindo que tenhamos um controle mais granular sobre a autenticação em nossa aplicação.

Compreender como implementar autenticação em nossa aplicação é uma habilidade crítica para garantir a segurança de nossos usuários e dados. Esperamos que esta aula tenha sido útil para entender a função utilitária de autenticação do lado do servidor em Next.js e como aplicá-la em nossas próprias páginas da web.
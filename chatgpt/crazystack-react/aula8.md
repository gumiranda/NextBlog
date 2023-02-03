---
title: 'Feature completa de login no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você irá aprender a construir uma feature completa de login, incluindo validação de formulários com Yup e gerenciamento de estado com React Hook Form. O objetivo é construir uma interface de login reutilizável e fácil de usar com validações de formulários eficientes e gerenciamento de estado simplificado.

Antes de começarmos, é importante ter uma compreensão básica de hooks e Yup. Se você ainda não tem essa compreensão, recomendo fazer uma pesquisa básica sobre esses conceitos antes de prosseguir.

Começaremos importando as dependências necessárias e criando um schema de validação com Yup. O schema define as regras de validação que serão aplicadas aos dados do formulário antes de enviá-los para o servidor. Em seguida, utilizaremos o React Hook Form para gerenciar o estado do formulário e registrar os campos de entrada.

Em seguida, adicionaremos as validações Yup aos campos do formulário usando o método "register" e "handleSubmit" fornecidos pelo React Hook Form. Ao clicar no botão "Enviar", o formulário será submetido e as validações Yup serão aplicadas aos dados do formulário. Se houver algum erro, será exibido uma mensagem de erro para o usuário.

Finalmente, adicionaremos um recurso de "loading" ao botão de envio para fornecer feedback visual ao usuário durante a submissão do formulário.

Com isso, você terá uma feature completa de login usando React Hook Form e Yup, além de ter aproveitado o formulário genérico construído na aula anterior. Essa solução é escalável e fácil de manter, além de ser altamente reutilizável em outros projetos.
```tsx
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}
export type SubmitLoginHandler = SubmitHandler<LoginFormData>;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export const useLoginLib = () => {
  const formProps = useForm({ resolver: yupResolver(loginSchema) });
  return { ...formProps };
}; 
``` 
O código acima define uma biblioteca de login utilizando `react-hook-form` e `yup` para validação de formulários.

A interface `LoginFormData` define o formato dos dados do formulário de login, que consiste em um email e uma senha.

A constante `loginSchema` é uma especificação do `yup` que define as regras de validação dos dados do formulário de login. Ela requer que o email seja válido e obrigatório e que a senha seja obrigatória.

A função `useLoginLib` é a biblioteca em si. Ela usa o `useForm` do `react-hook-form` e o `yupResolver` para informar ao `react-hook-form` que a validação dos dados do formulário será feita com o `loginSchema` do `yup`.

Assim, a biblioteca retorna as propriedades do formulário gerado pelo `useForm`, que poderá ser utilizado em um componente de formulário de login.

```tsx
import { useAuth } from "shared/libs";
import { useLoginLib, SubmitLoginHandler } from "./login.lib";

export const useLogin = () => {
  const { login } = useAuth();
  const { handleSubmit, register, formState } = useLoginLib();
  const handleLogin: SubmitLoginHandler = async (data) => {
    await login(data);
  };
  return { formState, register, handleSubmit, handleLogin };
}; 
``` 
Este código é uma função de hook, `useLogin`, que retorna informações úteis para a renderização e manipulação de um formulário de login. Ele usa o hook `useAuth` da biblioteca compartilhada `shared/libs` e o hook `useLoginLib` que importa o hook `useForm` e a definição de uma interface e um esquema de validação Yup para os dados do formulário de login.

A função `useLogin` faz uso dos hooks importados para definir a função `handleLogin`, que será chamada quando o formulário for enviado. Esta função chama a função `login` da biblioteca compartilhada `useAuth` e passa os dados do formulário para ela. Além disso, a função `useLogin` retorna os valores retornados pelos hooks `useLoginLib` e `useAuth`, incluindo `formState`, `register`, `handleSubmit` e `handleLogin`.

`formState` é o estado atual do formulário, incluindo informações como se o formulário está sendo enviado, se há erros de validação, entre outros. `register` é a função que permite registrar inputs no formulário para que sejam validados. `handleSubmit` é a função que controla o envio do formulário e `handleLogin` é a função que será chamada quando o formulário for enviado.
```tsx
import { Form } from "shared/ui";
import { useLogin } from "./login.hook";
export const LoginForm = () => {
  const { formState, handleSubmit, register, handleLogin } = useLogin();
  const formProps = {
    formState,
    register,
    handleCustomSubmit: handleLogin,
    handleSubmit,
    formControls: [
      { type: "email", label: "Email", name: "email" },
      { type: "password", label: "Senha", name: "password" },
    ],
    buttonLabel: "Entrar",
  };
  return <Form {...formProps} />;
}; 
``` 
O código acima é uma implementação de um formulário de login usando a biblioteca React Hook Form e o componente genérico Form.

Ele começa importando o componente `Form` da biblioteca `shared/ui` e o hook `useLogin` de `./login.hook`. Em seguida, a função `LoginForm` é definida.

Dentro da função `LoginForm`, o hook `useLogin` é invocado para retornar as informações necessárias para configurar o formulário:

* `formState`: objeto que contém informações sobre o estado atual do formulário, como se ele está sendo enviado, se há erros, entre outros.
* `handleSubmit`: função que é invocada quando o formulário é submetido.
* `register`: função que permite registrar os inputs no formulário para serem gerenciados pelo React Hook Form.
* `handleLogin`: função que é chamada quando o formulário é submetido e contém a lógica de autenticação do usuário.

Em seguida, as propriedades do formulário são definidas em `formProps`. Essas propriedades incluem:

* `formState`: objeto que contém informações sobre o estado atual do formulário.
* `register`: função que permite registrar os inputs no formulário.
* `handleCustomSubmit`: função que é invocada quando o formulário é submetido. Nesse caso, é a função `handleLogin`.
* `handleSubmit`: função que é invocada quando o formulário é submetido.
* `formControls`: array de objetos que representam os controles (inputs) do formulário. Cada objeto possui informações sobre o tipo de controle, o rótulo, o nome e outras informações.
* `buttonLabel`: texto que será exibido no botão de envio do formulário.

Por fim, o componente `Form` é retornado e suas propriedades são passadas para ele através do spread operator (`{...formProps}`).
## Tá mas... como eu transformo tudo isso num componente ainda mais genérico?
Para transformar em um componente genérico, você pode fazer algumas alterações nas suas libs, hooks e componentes. Aqui estão algumas sugestões:

1.  Em `login.lib`, você pode separar as validações Yup para uma lib separada e importá-la no `login.lib`. Desta forma, é possível reutilizar a mesma validação em outros formulários.
    
2.  Em `login.hook`, você pode criar um hook genérico que possa ser usado em outros formulários. Por exemplo, você pode criar um hook `useFormWithAuth` que receba a função de autenticação como uma propriedade e usar a mesma estrutura que você usou em `useLogin`.
    
3.  No componente `LoginForm`, você pode criar um componente genérico que possa ser reutilizado em outros formulários. Por exemplo, você pode criar um componente `FormWithAuth` que receba o formulário em si, as validações, o formato da resposta e a função de autenticação. Este componente pode então passar essas propriedades para o componente `Form` que você criou anteriormente.
    

Essas são apenas algumas sugestões e existem várias maneiras de tornar o código genérico, mas a ideia é passar as propriedades relevantes para o componente genérico, como o formulário em si, as validações, o formato da resposta e a função de autenticação, para que ele possa ser reutilizado em outros formulários.
O código ficaria da seguinte forma:
```tsx
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "shared/ui";

interface FormData {
  [key: string]: string;
}

interface FormConfig<T> {
  fields: { type: string; label: string; name: keyof T }[];
  buttonLabel: string;
  validationSchema: yup.ObjectSchema<yup.Shape<{}, T>>;
  onSubmit: SubmitHandler<T>;
}

export const useGenericForm = <T extends FormData>(config: FormConfig<T>) => {
  const formProps = useForm({ resolver: yupResolver(config.validationSchema) });
  const formState = formProps.formState;
  const register = formProps.register;
  const handleSubmit = formProps.handleSubmit;
  return { formState, register, handleSubmit, config };
};

export const GenericForm = <T extends FormData>(props: {
  config: FormConfig<T>;
}) => {
  const { formState, register, handleSubmit, config } = useGenericForm(
    props.config
  );
  const formProps = {
    formState,
    register,
    handleSubmit,
    formControls: config.fields,
    buttonLabel: config.buttonLabel,
  };
  return <Form {...formProps} />;
};

```
E para utilizar esse componente, basta passar a configuração do formulário como propriedade, por exemplo:
```tsx
import { useAuth } from "shared/libs";
import { GenericForm } from "./generic.form";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

const handleLogin = async (data: LoginFormData) => {
  await useAuth().login(data);
};

const LoginForm = () => {
  const config = {
    fields: [
      { type: "email", label: "Email", name: "email" },
      { type: "password", label: "Senha", name: "password" },
    ],
    buttonLabel: "Entrar",
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  };
  return <GenericForm config={config} />;
};

```

E a seguir temos o exemplo de uso do LoginForm anterior:
```tsx
import Router from "next/router";
import type { NextPage } from "next";
import { Head, Flex, Text } from "shared/ui";
import { useAuth } from "shared/libs";
import { useEffect } from "react";
import { LoginForm } from "features/auth/login";
export const Login: NextPage = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/home");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Head
        title="Belezix Admin | Login"
        description="Página de login do painel Admin do Belezix"
      />
      <Flex minW="100%" justifyContent="center">
        {!isAuthenticated && (
          <Flex mt="15%">
            <LoginForm />
          </Flex>
        )}
      </Flex>
    </>
  );
}; 
``` 
Este código define a página de login para o painel administrativo de um aplicativo. O código usa bibliotecas da interface do usuário (`shared/ui`) e a biblioteca de autenticação (`shared/libs`).

A página de login é criada como um componente `NextPage`, que é uma forma de definir páginas dinâmicas usando a biblioteca Next.js. O componente `NextPage` é importado do `next` e é definido como `Login`.

O componente `useAuth` é usado para obter informações sobre o estado de autenticação do usuário. `isAuthenticated` é uma das informações retornadas pelo `useAuth`.

O gancho `useEffect` é usado para verificar se o usuário está autenticado a cada renderização. Se o usuário estiver autenticado, o `Router.push` é usado para redirecioná-lo para a página inicial do aplicativo (`/home`).

A página de login é composta de um cabeçalho (`Head`), um contêiner (`Flex`) e um formulário de login (`LoginForm`). O cabeçalho `Head` é usado para definir o título e a descrição da página. O contêiner é usado para centralizar o formulário na tela.

O formulário de login é exibido apenas se o usuário não estiver autenticado. Se o usuário estiver autenticado, a página não será exibida.

O formulário é importado do arquivo `features/auth/login` e é renderizado dentro do contêiner. A renderização do formulário é controlada pelos parâmetros passados ao componente `Form` usando a sintaxe de espalhamento (`...formProps`).
 
## Como a metodologia Feature Sliced Design se encaixa nisso?

A metodologia Feature Sliced Design se baseia em desenvolver as funcionalidades do seu aplicativo de forma separada e autônoma, para depois juntá-las e formar o produto final. No exemplo de login form, a pasta `features/auth/login` contém todos os componentes, hooks e validações necessários para o formulário de login. Dessa forma, se for necessário fazer alguma alteração no formulário, será possível fazê-lo apenas nessa pasta, sem precisar mexer em outras partes do aplicativo. Além disso, se a equipe precisar desenvolver uma nova feature, será mais fácil fazê-lo de forma autônoma sem interferir nas outras funcionalidades já existentes.

O arquivo `LoginForm` é o componente visual responsável por exibir o formulário, enquanto o hook `useLogin` é responsável por lidar com o submit do formulário e com a validação dos dados. Já o hook `useLoginLib` é responsável por inicializar e configurar o hook `useForm` do React Hook Form, passando a validação através do Yup.

Dessa forma, ao separar o formulário de login em uma pasta específica, é possível desenvolver, testar e manter a feature de forma mais organizada, mantendo a responsabilidade de cada arquivo claramente separada.
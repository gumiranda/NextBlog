---
title: 'Tela de login no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos criar uma tela de login utilizando o método de design atomic e a biblioteca Chakra UI. Começaremos revisando o que é o design atomic e sua importância para a construção de interfaces de usuário consistentes e de fácil manutenção. Em seguida, vamos criar os componentes atômicos necessários para a nossa tela de login, como o input, o botão e o formulário.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

Para criar esses componentes, utilizaremos as propriedades e componentes oferecidos pela Chakra UI, que é uma biblioteca de componentes UI React construída com base no design system da figma. A Chakra UI oferece uma ampla gama de componentes prontos para uso, além de fornecer opções de personalização para que você possa adaptar a aparência dos componentes às suas necessidades.

Depois de criarmos os componentes atômicos, vamos utilizá-los para montar a nossa tela de login. Nesta etapa, vamos prestar atenção à consistência da aparência e interação dos componentes, além de garantir que eles sejam fáceis de usar e entender para o usuário. Além disso, vamos adicionar a funcionalidade de autenticação à nossa tela de login, utilizando a hook useState do React para gerenciar o estado do formulário.

Por fim, vamos testar nossa tela de login para garantir que tudo esteja funcionando corretamente. Para isso, utilizaremos a biblioteca de teste Jest, que nos permitirá escrever testes unitários para verificar se os componentes estão renderizando corretamente, se estão reagindo a interações do usuário da maneira esperada e se a funcionalidade de autenticação está funcionando corretamente.

Em resumo, nesta aula, você aprenderá como criar uma tela de login utilizando o design atomic e a Chakra UI, e como testá-la para garantir que ela esteja funcionando corretamente. Ao seguir este processo, você estará adquirindo habilidades valiosas para construir interfaces de usuário consistentes e de fácil manutenção, além de garantir a qualidade do seu código.

```tsx
import { Input as InputChakra, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, ...rest },
  ref
) => {
  return (
    <InputChakra {...rest} data-testid="InputTestId" id={name} name={name} ref={ref} />
  );
};
export const Input = forwardRef(InputAtom); 
``` 
Este código é uma implementação de um componente de Input utilizando a biblioteca Chakra UI e o React. O componente é escrito em TypeScript.

A primeira linha importa o componente Input e as propriedades desse componente da biblioteca Chakra UI. A segunda linha importa as funções `ForwardRefRenderFunction` e `forwardRef` do React.

Em seguida, é criada uma interface `InputProps` que extende as propriedades padrão do componente Input da Chakra UI e adiciona a propriedade `name`. Essa propriedade será utilizada para identificar o input de forma única no formulário.

Em seguida, é definido o componente `InputAtom` como uma função que utiliza `ForwardRefRenderFunction` e `forwardRef`. Essa função tem como objetivo renderizar o componente Input da Chakra UI. O componente recebe duas props, `{ name, ...rest }` e `ref`, que serão utilizadas para preencher as propriedades do componente.

Dentro da função `InputAtom`, é retornado o componente `InputChakra` da Chakra UI, que é utilizado para renderizar o input. Além das propriedades passadas via `rest`, são adicionadas as propriedades `data-testid`, `id` e `name`, que correspondem ao atributo `data-testid` para testes automatizados, o identificador único do input e o nome do input, respectivamente. A propriedade `ref` é utilizada para fornecer acesso direto ao elemento DOM do input.

Por fim, é exportado o componente `Input` que é criado a partir da função `forwardRef` que recebe a função `InputAtom` como argumento. Esse componente será utilizado em outros lugares da aplicação para renderizar o input personalizado.

Em resumo, este código cria um componente de input personalizado baseado no componente `Input` da biblioteca Chakra UI e o torna mais fácil de ser utilizado em outras partes da aplicação, fornecendo acesso direto ao elemento DOM e permitindo que sejam definidas propriedades adicionais. 
```tsx
import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Input } from "./Input";

describe("<Input/>", () => {
  it("should render the Input component", () => {
    renderWithTheme(<Input name="test" />);
    expect(screen.getByTestId("InputTestId")).toBeInTheDocument();
    expect(screen.getByTestId("InputTestId")).toHaveAttribute("name", "test");
  });
});
``` 
Esse código é um teste unitário escrito em Jest + Testing Library para o componente `Input` de uma aplicação React. O teste tem o objetivo de garantir que o componente esteja sendo renderizado corretamente, possuindo os atributos esperados, e de verificar se ele está reagindo a interações do usuário da maneira esperada.

A linha `import { renderWithTheme } from "test/testUtils";` importa a função `renderWithTheme` que é responsável por renderizar o componente Input com o tema da aplicação.

A linha `import { screen } from "@testing-library/react";` importa o objeto `screen` que contém métodos para buscar elementos na página renderizada.

A linha `import { Input } from "./Input";` importa o componente Input que será testado.

O código está dentro de um bloco de descrição `describe("<Input/>", () => { ... });` que define o escopo do teste. Nesse bloco, há apenas um teste, identificado pelo método `it("should render the Input component", () => { ... });`.

Dentro desse teste, a linha `renderWithTheme(<Input name="test" />);` renderiza o componente Input com o tema da aplicação, passando a propriedade `name` com o valor "test".

A linha `expect(screen.getByTestId("InputTestId")).toBeInTheDocument();` verifica se o elemento com o atributo `data-testid` igual a "InputTestId" está presente na página.

E a linha `expect(screen.getByTestId("InputTestId")).toHaveAttribute("name", "test");` verifica se o elemento com o atributo `data-testid` igual a "InputTestId" possui o atributo `name` com o valor "test".

Em resumo, esse código é um teste unitário que garante que o componente Input esteja sendo renderizado corretamente, possuindo os atributos esperados e que esteja reagindo a interações do usuário da maneira esperada.

## Desafio: Criar mais testes unitários para esse Input
Possível exemplo:
```tsx
it("should render the Input component with a label", () => {
  renderWithTheme(
    <Input name="test" label="Test Input" aria-label="Test Input" />
  );
  expect(screen.getByText("Test Input")).toBeInTheDocument();
  expect(screen.getByTestId("InputTestId")).toHaveAttribute("aria-label", "Test Input");
});

it("should render the Input component with a specific type", () => {
  renderWithTheme(<Input name="test" type="password" />);
  expect(screen.getByTestId("InputTestId")).toHaveAttribute("type", "password");
});

it("should render the Input component with a placeholder", () => {
  renderWithTheme(<Input name="test" placeholder="Enter text here" />);
  expect(screen.getByTestId("InputTestId")).toHaveAttribute(
    "placeholder",
    "Enter text here"
  );
});

it("should render the Input component with a default value", () => {
  renderWithTheme(<Input name="test" defaultValue="Default value" />);
  expect(screen.getByTestId("InputTestId")).toHaveAttribute(
    "value",
    "Default value"
  );
});

it("should render the Input component with a specific size", () => {
  renderWithTheme(<Input name="test" size="lg" />);
  expect(screen.getByTestId("InputTestId")).toHaveClass("chakra-input__lg");
});

it("should call the onChange function when the value changes", () => {
  const onChangeMock = jest.fn();
  renderWithTheme(<Input name="test" onChange={onChangeMock} />);
  fireEvent.change(screen.getByTestId("InputTestId"), {
    target: { value: "Changed value" },
  });
  expect(onChangeMock).toHaveBeenCalled();
});

``` 

```tsx
import { Checkbox as CheckboxChakra, CheckboxProps } from "@chakra-ui/react";
export const Checkbox = ({ children, ...rest }: CheckboxProps) => {
  return (
    <CheckboxChakra {...rest} data-testid="CheckboxTestId">
      {children}
    </CheckboxChakra>
  );
};
``` 
Este código define um componente personalizado de checkbox usando a biblioteca Chakra UI. O componente é criado como uma função simples que retorna um componente CheckboxChakra da biblioteca Chakra UI.

A função aceita um objeto de propriedades (`CheckboxProps`) e passa as propriedades para o componente CheckboxChakra da Chakra UI usando o spread operator (`...rest`). Além disso, o componente contém um atributo `data-testid="CheckboxTestId"`, que pode ser usado pelos testes automatizados para identificar o componente na página.

O componente personalizado também inclui um propriedade `children`, que pode ser usada para definir o conteúdo que será exibido dentro do checkbox. Esse conteúdo pode ser texto ou outro componente.

Em resumo, esse código cria um componente de checkbox personalizado que herda as propriedades e estilo da biblioteca Chakra UI, mas adiciona uma identificação específica para testes automatizados.
```tsx
import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("<Checkbox/>", () => {
  it("should render the Checkbox component", () => {
    renderWithTheme(<Checkbox />);
    expect(screen.getByTestId("CheckboxTestId")).toBeInTheDocument();
  });
});
``` 
Este é um exemplo de um teste unitário para o componente `Checkbox` escrito usando Jest e @testing-library/react.

* A primeira linha importa a função `renderWithTheme` do arquivo `test/testUtils`. Essa função é usada para renderizar o componente `Checkbox` com o tema configurado.
    
* A segunda linha importa a função `screen` do pacote `@testing-library/react`. `screen` é usado para acessar elementos na página renderizada.
    
* A terceira linha importa o componente `Checkbox` de `./Checkbox`.
    
* Em seguida, temos o bloco `describe` com o título "`<Checkbox/>`". Isso define um grupo de testes para o componente `Checkbox`.
    
* Dentro desse bloco `describe`, temos o teste `it` com o título "should render the Checkbox component". Este teste verifica se o componente `Checkbox` foi corretamente renderizado na página.
    
* Dentro do teste, a função `renderWithTheme` é chamada com o componente `Checkbox` como argumento. Isso renderiza o componente na página.
    
* Em seguida, a função `expect` é chamada com `screen.getByTestId("CheckboxTestId")` como argumento. Isso verifica se um elemento com o `data-testid` "CheckboxTestId" está presente na página.
    
* Finalmente, a função `toBeInTheDocument` é chamada para verificar se o elemento está realmente no documento. Se o elemento estiver presente, o teste será considerado um sucesso. Caso contrário, o teste será considerado um fracasso.
## Desafio: Mais testes para Checkbox
Aqui estão alguns exemplos adicionais de testes unitários que você pode escrever para o componente Checkbox:

```tsx
it("should render the label correctly", () => {
  const label = "Checkbox Label";
  renderWithTheme(<Checkbox>{label}</Checkbox>);
  expect(screen.getByText(label)).toBeInTheDocument();
});

it("should have the correct checked state", () => {
  renderWithTheme(<Checkbox isChecked />);
  expect(screen.getByTestId("CheckboxTestId")).toBeChecked();
});

it("should call the onChange function when checked", () => {
  const onChange = jest.fn();
  renderWithTheme(<Checkbox onChange={onChange} />);
  fireEvent.click(screen.getByTestId("CheckboxTestId"));
  expect(onChange).toHaveBeenCalled();
});

it("should have the correct disabled state", () => {
  renderWithTheme(<Checkbox isDisabled />);
  expect(screen.getByTestId("CheckboxTestId")).toBeDisabled();
});

```
```tsx
import Router from "next/router";
import type { NextPage } from "next";

import { Head, Flex, Text } from "shared/ui";
export const Login: NextPage = () => {
  return (
    <>
      <Head
        title="Belezix Admin | Login"
        description="Página de login do painel Admin do Belezix"
      />
      <Flex minW="100%" justifyContent="center">
        <Flex mt="15%">
          <Text fontSize="6xl">CrazyStack ReactJs</Text>
        </Flex>
      </Flex>
    </>
  );
};
``` 
Esse código define uma página de login, que será usada como a página de entrada do painel administrativo do aplicativo. Ele é escrito em Next.js, que é uma biblioteca de gerenciamento de rotas e renderização em servidor para aplicativos React.

A página `Login` importa os componentes `Head`, `Flex`, `Text` do diretório `shared/ui`. Esses componentes fornecem uma interface para o usuário, mas não são detalhados neste código.

A função `Login` retorna um componente React que contém dois componentes `Flex`. O primeiro é usado para centralizar o conteúdo na tela, o segundo para exibir o título "CrazyStack ReactJs". O componente `Head` é usado para definir o título da página e a descrição para o mecanismo de busca.
```tsx
import axios from "axios";
import { parseCookies } from "nookies";
export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: { Authorization: `Bearer ${cookies["belezixadmin.token"]}` },
  });
  return api;
}
export const api = setupAPIClient();
```
Esse código é uma implementação de uma função `setupAPIClient` que cria um cliente de API do Axios. Ele também cria uma instância global `api` do cliente.

A função `setupAPIClient` recebe um opcional contexto `ctx` como parâmetro. O contexto `ctx` é comumente utilizado no Next.js para armazenar informações de contexto durante a execução de uma página. Ele utiliza a função `parseCookies` do pacote `nookies` para recuperar as cookies a partir do contexto e armazená-las na variável `cookies`.

A função `setupAPIClient` usa a função `axios.create` para criar uma instância do cliente Axios. A propriedade `baseURL` da instância é definida como `"http://localhost:3333"`, o que significa que todas as solicitações feitas através dessa instância do Axios terão a URL base definida como `"http://localhost:3333"`. A propriedade `headers` é definida como um objeto com uma chave `Authorization` que contém um token de autorização extraído da cookie `cookies["belezixadmin.token"]`.

A instância `api` é criada chamando a função `setupAPIClient` sem passar qualquer contexto. Isso significa que a instância `api` terá as mesmas propriedades que uma instância criada por `setupAPIClient` chamada sem passar o contexto.
## Auth Context
Caso queiramos implementar um contexto de autenticação, poderia ser algo assim:
```tsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextData {
  user: any;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@belezix:token");
    if (token) {
      setUser(token);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:3333/sessions", {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem("@belezix:token", token);
    setUser(token);
  };

  const signOut = () => {
    localStorage.removeItem("@belezix:token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

```
Neste exemplo, a função signIn envia uma requisição POST para o endpoint de autenticação passando o email e a senha. Se a autenticação for bem-sucedida, a resposta irá conter um token, que será armazenado no localStorage e definido como o usuário atual. A função signOut simplesmente remove o token do localStorage e define o usuário atual como null.
No entanto, no curso não usamos localStorage para armazenar informações de autenticação, e sim os cookies. Ficando assim:
```tsx
import { createContext, useContext, ReactNode, useState, useMemo } from "react";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "shared/api";
type User = {
  email: string;
  role: string;
  _id: string;
};
type AuthProviderProps = {
  children: ReactNode;
};
type LoginCredentials = {
  email: string;
  password: string;
};
type AuthContextData = {
  login(credentials: LoginCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
};
const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const login = async ({ email, password }: LoginCredentials) => {
    try {
      const response = await api.post("auth/login", {
        email,
        password,
        passwordConfirmation: password,
      });
      const { accessToken: token, refreshToken, user: userComing } = response?.data || {};
      setCookie(undefined, "belezixadmin.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "belezixadmin.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "belezixadmin.user", JSON.stringify(userComing), {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser(userComing);
      api.defaults.timeout = 5000;
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      Router.push("/");
    } catch (error) {
      alert("erro no servidor");
    }
  };
  const contextValue = useMemo(() => ({ login, isAuthenticated, user }), [user]);
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

export function signOut() {
  destroyCookie(undefined, "belezixadmin.token");
  destroyCookie(undefined, "belezixadmin.refreshToken");
  destroyCookie(undefined, "belezixadmin.user");
  Router.push("/");
}
```
Este é um exemplo de código de um contexto de autenticação (`AuthContext`) utilizando o Context API do React.

Aqui, é criado um contexto de autenticação, que irá armazenar informações do usuário logado e prover funções para realizar o login. É criada uma função `AuthProvider` que irá funcionar como um "provedor" de contexto, ou seja, ele será o responsável por fornecer o contexto para seus componentes filhos.

Uma vez que o contexto é criado, as informações e funções que são compartilhadas em toda a aplicação são o estado do usuário logado (`user`), se o usuário está autenticado (`isAuthenticated`) e a função de login (`login`). A função de login é responsável por realizar a requisição para o endpoint de login, passando as credenciais do usuário (email e senha), e armazenando o token de acesso no cookie da aplicação.

Em vez de armazenar informações do usuário logado no `localStorage`, este código utiliza cookies para isso. A biblioteca `nookies` é utilizada para manipular os cookies. Quando o usuário faz login, as informações do usuário são armazenadas no cookie com nomes `belezixadmin.token`, `belezixadmin.refreshToken` e `belezixadmin.user`. Quando o usuário faz logout, as informações são removidas dos cookies utilizando a função `destroyCookie`.

Além disso, a função `useAuth` é fornecida como um hook para ser utilizada por outros componentes para obter informações do contexto de autenticação.
## Porque usar cookies?
O uso de cookies ao invés do local storage para armazenar informações de autenticação tem algumas vantagens. Algumas delas incluem:

1.  Segurança: Cookies são enviados de volta para o servidor com cada requisição, o que significa que é mais difícil para um invasor interceptar a informação do usuário. Além disso, cookies podem ser configurados com atributos de segurança, como "HTTPOnly", para impedir que eles sejam acessados por scripts maliciosos.
    
2.  Facilidade de uso: Cookies são enviados automaticamente com cada requisição, o que significa que você não precisa se preocupar em enviar manualmente a informação do usuário com cada requisição.
    
3.  Armazenamento limitado: Cookies têm um tamanho limitado de 4 KB, o que os torna uma escolha adequada para armazenar informações simples, como tokens de autenticação.
    

Além disso, no contexto do Next.js, o uso de cookies é mais adequado do que o local storage, pois o local storage é um recurso do navegador que não está disponível em todas as áreas do aplicativo Next.js, enquanto o uso de cookies é possível em todas as áreas do aplicativo, incluindo a renderização do lado do servidor.
## Como isso seria feito usando Redux?
O uso do Redux para armazenar o estado do contexto de autenticação seria algo assim:
```tsx
import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { api } from "shared/api";

type User = {
  email: string;
  role: string;
  _id: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

type LoginAction = {
  type: typeof LOGIN;
  payload: User;
};

type LogoutAction = {
  type: typeof LOGOUT;
};

type Action = LoginAction | LogoutAction;

const login = (credentials: LoginCredentials) => async (dispatch: any) => {
  try {
    const response = await api.post("auth/login", {
      email: credentials.email,
      password: credentials.password,
      passwordConfirmation: credentials.password,
    });

    const { accessToken: token, refreshToken, user } = response?.data || {};

    localStorage.setItem("belezixadmin.token", token);
    localStorage.setItem("belezixadmin.refreshToken", refreshToken);
    localStorage.setItem("belezixadmin.user", JSON.stringify(user));

    dispatch({
      type: LOGIN,
      payload: user,
    });
  } catch (error) {
    alert("erro no servidor");
  }
};

const logout = () => (dispatch: any) => {
  localStorage.removeItem("belezixadmin.token");
  localStorage.removeItem("belezixadmin.refreshToken");
  localStorage.removeItem("belezixadmin.user");

  dispatch({
    type: LOGOUT,
  });
};

const initialState = {
  isAuthenticated: false,
  user: null as User | null,
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export { login, logout };
```
Com esse código, você pode utilizar o store do Redux para guardar o estado de autenticação e as informações do usuário logado.

O uso do Context API e do Redux são duas opções para gerenciamento de estado global na aplicação. A escolha entre esses dois pode depender de diversos fatores, como a complexidade da aplicação, a equipe de desenvolvimento e as preferências de cada um.

Algumas razões para o curso ter optado pelo uso do Context API em vez do Redux são:

1.  Mais simples: O Context API é mais fácil de entender e usar para iniciantes, pois é uma solução nativa do React e não requer a instalação de nenhuma biblioteca adicional.
    
2.  Menos verboso: O Context API é menos verboso do que o Redux, o que significa que é mais fácil de ler e manter.
    
3.  Boa performance: O Context API tem boa performance, especialmente em aplicações menores e com menor complexidade, pois não precisa passar informações por toda a árvore de componentes da aplicação.
    
4.  Focado no propósito: O Context API é uma solução mais direta e direcionada para o gerenciamento de estado global, enquanto o Redux é uma biblioteca mais abrangente e pode ser usada para vários propósitos.
    

Em resumo, o curso pode ter optado pelo uso do Context API por ser uma solução menos complexa, mais fácil de entender e com boa performance, especialmente para aplicações menores e com menor complexidade.
```tsx
import Router from "next/router";
import type { NextPage } from "next";
import { Head, Flex, Text } from "shared/ui";
import { useAuth } from "shared/libs";
import { useEffect } from "react";

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
            <Text fontSize="6xl">CrazyStack ReactJs</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
```
Este código apresenta a implementação de uma página de login para uma aplicação React.

1.  A primeira coisa que temos é a importação do módulo `Router` do pacote `next/router` para redirecionar o usuário caso esteja autenticado.
2.  Em seguida, temos a importação do tipo `NextPage` do pacote `next`, que é utilizado para definir que esta página será uma página Next.js.
3.  Também temos as importações de componentes visuais, como o `Head` e o `Flex` e o `Text`, que são componentes customizados para renderizar elementos na página.
4.  Em seguida, temos a importação do `useAuth` da biblioteca `shared/libs`, que é uma função customizada para obter as informações de autenticação do usuário.
5.  Também temos a importação do `useEffect` do React, que é uma função de efeito para realizar operações de side-effects em reação a mudanças no estado da aplicação.

Na função de componente `Login`, temos a constante `isAuthenticated` que obtém a informação de autenticação do usuário através da função `useAuth`. Em seguida, usamos a função `useEffect` para verificar se o usuário está autenticado. Se estiver, redirecionamos para a página `/home` com a função `Router.push`.

Finalmente, retornamos o código HTML da página com o componente `Flex` como o container principal. Se o usuário não estiver autenticado, é exibido um título de texto. Caso contrário, nada é exibido.
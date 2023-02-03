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
tenho um curso de next.js onde preciso preparar algumas aulas, voce pode me ajudar?

prepare a aula 6: tela de login

Nesta aula, vamos criar uma tela de login utilizando o método de design atomic e a biblioteca Chakra UI. Começaremos revisando o que é o design atomic e sua importância para a construção de interfaces de usuário consistentes e de fácil manutenção. Em seguida, vamos criar os componentes atômicos necessários para a nossa tela de login, como o input, o botão e o formulário.

Para criar esses componentes, utilizaremos as propriedades e componentes oferecidos pela Chakra UI, que é uma biblioteca de componentes UI React construída com base no design system da figma. A Chakra UI oferece uma ampla gama de componentes prontos para uso, além de fornecer opções de personalização para que você possa adaptar a aparência dos componentes às suas necessidades.

Depois de criarmos os componentes atômicos, vamos utilizá-los para montar a nossa tela de login. Nesta etapa, vamos prestar atenção à consistência da aparência e interação dos componentes, além de garantir que eles sejam fáceis de usar e entender para o usuário. Além disso, vamos adicionar a funcionalidade de autenticação à nossa tela de login, utilizando a hook useState do React para gerenciar o estado do formulário.

Por fim, vamos testar nossa tela de login para garantir que tudo esteja funcionando corretamente. Para isso, utilizaremos a biblioteca de teste Jest, que nos permitirá escrever testes unitários para verificar se os componentes estão renderizando corretamente, se estão reagindo a interações do usuário da maneira esperada e se a funcionalidade de autenticação está funcionando corretamente.

Em resumo, nesta aula, você aprenderá como criar uma tela de login utilizando o design atomic e a Chakra UI, e como testá-la para garantir que ela esteja funcionando corretamente. Ao seguir este processo, você estará adquirindo habilidades valiosas para construir interfaces de usuário consistentes e de fácil manutenção, além de garantir a qualidade do seu código.

explique em detalhes o código a seguir:
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
explique em detalhes o código a seguir:
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
explique em detalhes o código a seguir:
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
explique em detalhes o código a seguir:
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
explique em detalhes o código a seguir:
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
explique em detalhes o código a seguir:
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

Explique a criação de um AuthContext usando context api para salvar informações do usuario logado e chamar o endpoint de login passando email e senha

explique em detalhes o código a seguir:
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

explique em detalhes o código a seguir:
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
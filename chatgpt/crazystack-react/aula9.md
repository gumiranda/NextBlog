---
title: ' Carregando usuário logado do cookie no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá como carregar os dados de um usuário logado a partir de um cookie usando a biblioteca "nookies".

A ideia é salvar o estado de autenticação do usuário no cookie ao fazer o login, e carregá-lo na próxima vez que o usuário acessar o site. Isso é importante para que o usuário não precise fazer login novamente toda vez que recarregar a página.

A biblioteca "nookies" é uma solução fácil de usar para gerenciar cookies em aplicações Next.js. Ela fornece uma maneira simples de ler e escrever cookies em sua aplicação, além de permitir que você configure a validade de um cookie e outras opções importantes.

A aula começará explicando como instalar e configurar a biblioteca "nookies". Em seguida, você aprenderá como usar o hook "useCookies" para ler o cookie de autenticação do usuário e verificar se ele está logado.

Finalmente, você verá como salvar o estado de autenticação do usuário no cookie ao fazer login e como excluir o cookie ao fazer logout.

Com essa aula, você terá uma solução completa e confiável para gerenciar o estado de autenticação de um usuário em sua aplicação Next.js.
```tsx
import { createContext, useEffect, useContext, ReactNode, useState, useMemo } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
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
  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const {
      "belezixadmin.user": userComingFromCookie,
      "belezixadmin.refreshToken": refreshToken = null,
    } = parseCookies();
    const parsedUser = parseJSON(userComingFromCookie);
    if (parsedUser && refreshToken) {
      setUser(parsedUser);
    } else {
      signOut();
    }
  }, []);

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
  const contextValue = useMemo(
    () => ({ login, isAuthenticated, user }),
    [isAuthenticated, user]
  );
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
Este código cria um contexto de autenticação para uma aplicação React, com as funcionalidades de login e logout, usando cookies para armazenar informações do usuário logado.

O contexto é criado usando o método `createContext` do React, que permite compartilhar informações entre componentes sem precisar passar props em cada nível da árvore de componentes. Neste caso, o contexto é inicializado com um objeto vazio `{} as AuthContextData`.

A classe `AuthProvider` é usada para fornecer o contexto em toda a aplicação, e sua propriedade `children` representa os componentes filhos. Ela contém dois estados: `user` e `isAuthenticated`. O estado `user` armazena informações do usuário logado, enquanto `isAuthenticated` é uma variável booleana que indica se há um usuário logado.

O `useEffect` é executado somente uma vez, na primeira renderização da página, e seu objetivo é verificar se há um usuário e refreshToken nos cookies. Se houver, o usuário é recuperado e o estado `user` é atualizado. Caso contrário, a função `signOut` é executada.

A função `login` é responsável por fazer a requisição à API para realizar o login, recebendo como argumento as credenciais do usuário (email e senha). Se a requisição for bem-sucedida, o token de acesso, o token de atualização e as informações do usuário são armazenados nos cookies e o estado `user` é atualizado. Além disso, o header da requisição padrão é atualizado para incluir o token de acesso. Por fim, o usuário é redirecionado para a página inicial da aplicação.

A função `signOut` é responsável por destruir todos os cookies relacionados ao usuário logado e redirecionar o usuário para a página de login.

Por fim, a função `useAuth` é usada para permitir que outros componentes possam obter acesso ao contexto de autenticação.

Em resumo, este código cria um contexto de autenticação completo, com funções de login e logout, que é fornecido em toda a aplicação e permite aos componentes obter informações sobre o usuário logado e realizar ações de autenticação.
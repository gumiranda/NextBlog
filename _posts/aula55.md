---
title: 'Criando Adapter para lidar com tokens JWT no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import jwt from "jsonwebtoken";
import { TokenDecrypter, TokenGenerator } from "@/application/infra/crypto/protocols";

export class JwtAdapter implements TokenDecrypter, TokenGenerator {
  constructor(private readonly secret: string, private readonly expirationTime: string) {
    this.secret = secret;
    this.expirationTime = expirationTime;
  }
  async decrypt(value: string): Promise<string> {
    return jwt.verify(value, this.secret) as any;
  }
  async generate(_id: string): Promise<string> {
    return jwt.sign({ _id }, this.secret, { expiresIn: this.expirationTime });
  }
}
``` 

Esse código apresenta a implementação de uma classe JwtAdapter que é responsável por gerar e decifrar tokens JWT (JSON Web Tokens). Essa classe implementa duas interfaces TokenDecrypter e TokenGenerator que especificam as ações que um objeto desta classe deve ser capaz de realizar.

A importância de tokens criptografados em uma API de agendamentos online é a segurança da aplicação e dos dados dos usuários. O token JWT permite identificar de forma segura um usuário e garantir que as requisições sejam autorizadas apenas para usuários autenticados. Além disso, os tokens JWT podem ser usados para transmitir informações sensíveis, como informações de perfil de usuário, de forma segura através da aplicação.

Este adapter JWT pode ser utilizado para o mecanismo de token de acesso e token de atualização da seguinte forma:

1.  Token de acesso: Quando um usuário se autentica com sucesso na API de agendamentos online, ele receberá um token de acesso gerado pelo JwtAdapter. Este token pode ser incluído nas solicitações subsequentes do usuário à API como uma forma de autenticação. A cada solicitação, o JwtAdapter pode ser usado para decifrar o token de acesso e verificar se ele é válido e se o usuário está autorizado a acessar a recurso solicitado.
    
2.  Token de atualização: Além disso, o JwtAdapter também pode ser usado para gerar tokens de atualização, que são usados para renovar o token de acesso quando ele expirar. Quando o token de acesso expirar, o usuário pode enviar seu token de atualização para a API, que o decifrará e gerará um novo token de acesso. Dessa forma, o usuário pode continuar a acessar a API sem precisar se autenticar novamente.
    

Em resumo, o JwtAdapter pode ser usado como uma camada de segurança adicional para autenticar usuários e proteger as solicitações à API de agendamentos online.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)
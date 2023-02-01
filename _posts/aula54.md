---
title: 'Criptografia com Bcrypt no CrazyStack Node.js'
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

## Importância da Criptografia de Senhas em uma API de Agendamentos Online

Em aplicações web, especialmente aquelas que lidam com informações sensíveis, a segurança de dados é de extrema importância. Este é o caso de uma API de agendamentos online, onde informações pessoais e financeiras dos usuários são coletadas e armazenadas.

Nesse contexto, é vital proteger as senhas dos usuários para evitar que elas caiam em mãos erradas e sejam utilizadas de forma maliciosa. E é aqui que entra a criptografia de senhas.

A criptografia é uma técnica que transforma informações legíveis em dados ilegíveis, que só podem ser decifrados com a chave certa. Quando se fala em senhas, a criptografia permite que as mesmas sejam armazenadas de forma segura, evitando que elas sejam expostas em caso de invasão de dados.

Desta forma, a criptografia de senhas é uma medida fundamental para garantir a privacidade e segurança dos usuários de uma API de agendamentos online. Além disso, a utilização de bibliotecas especializadas, como a bcrypt, garante a implementação correta e eficiente da criptografia, tornando a aplicação ainda mais segura.

```typescript
import bcrypt from "bcrypt";
import { Encrypter, HashComparer } from "@/application/infra/crypto/protocols";

export class BcryptAdapter implements Encrypter, HashComparer {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
  compare(password: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(password, hashedText);
  }
}
``` 

Este código apresenta uma classe BcryptAdapter que implementa duas interfaces: Encrypter e HashComparer. Esta classe é responsável por fornecer suporte ao uso do pacote bcrypt para a criptografia de dados e verificação de hashes.

A classe possui um construtor que recebe o número de sal como parâmetro e o atribui à propriedade "salt". Os métodos "encrypt" e "compare" são implementados com base nas funções do pacote bcrypt "hash" e "compare".

O método "encrypt" recebe uma string como parâmetro e retorna uma Promise com o hash resultante da criptografia da string com o salt especificado.

O método "compare" recebe uma string de password e uma string de hashedText como parâmetros e retorna uma Promise com um booleano indicando se a password é igual ao texto criptografado.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)
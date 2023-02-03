---
title: 'Criando modais genéricos BoxSuccess e BoxError no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá a criar modais genéricos de sucesso e erro na sua aplicação Next.js. Estes modais são uma forma importante de dar feedback ao usuário sobre ações que ele realizou na sua aplicação. Ao invés de criar modais específicos para cada ação, criaremos modais genéricos que poderão ser reutilizados em diferentes pontos da aplicação.

Para isso, utilizaremos o pacote "chakra-ui" para estilizar nossos modais de maneira rápida e fácil. Além disso, também usaremos o gerenciador de estado "react-query" para lidar com a exibição dos modais na aplicação.

Nesta aula, você aprenderá como criar os componentes BoxSuccess e BoxError, que serão nossos componentes de feedback genéricos.  

Você também aprenderá como utilizar o estado do "react-query" para controlar a exibição dos componentes na aplicação, tornando este processo mais simples e intuitivo.

Ao final da aula, você terá aprendido a criar modais genéricos na sua aplicação Next.js, o que lhe permitirá dar um feedback mais personalizado ao seu usuário sobre as ações que ele realiza na sua aplicação.

explique detalhadamente e de forma didática o código a seguir:
```tsx
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import { Flex, Text } from "shared/ui/atoms";
type BoxErrorProps = {
  title?: string;
  content: string;
  children?: React.ReactNode;
};
export const BoxError = ({ title, content, children, ...rest }: BoxErrorProps) => {
  return (
    <Box textAlign={"center"} py={4} px={2} {...rest} data-testid="BoxErrorTestId">
      <Box display="inline-block">
        <Flex
          flexDir={"column"}
          justifyContent="center"
          alignItems={"center"}
          bg="red.500"
          rounded="50px"
          w="55px"
          h="55px"
          textAlign={"center"}
        >
          <CloseIcon boxSize="20px" color="white" />
        </Flex>
      </Box>
      {title && (
        <Heading as="h2" size="xl" mt={6} mb={2} color="gray.500">
          {title}
        </Heading>
      )}

      <Text color="gray.500" mt={4}>
        {content}
      </Text>
      {children}
    </Box>
  );
};
```
Este código é uma função do React que retorna um componente que apresenta uma caixa de erro com determinados estilos e conteúdo. É criado a partir da combinação de componentes do Chakra UI, como `Box`, `Heading`, `Flex` e `Text`.

A função `BoxError` recebe três propriedades como argumento: `title`, `content` e `children`. A propriedade `title` é opcional e pode ser usada para definir um título para a caixa de erro. A propriedade `content` é obrigatória e contém o conteúdo da caixa. A propriedade `children` é também opcional e pode ser usada para adicionar elementos filhos ao componente.

A propriedade `rest` é usada para pegar todas as outras propriedades que não foram especificadas na declaração da função, permitindo que outras propriedades personalizadas sejam passadas para o componente.

A primeira parte do componente retornado é uma `Box` que apresenta um ícone de fechamento em seu interior. O ícone é criado usando o componente `CloseIcon` do Chakra UI e é alinhado no centro da caixa usando a propriedade `flexDir` e `alignItems` da `Flex`.

Em seguida, é verificado se `title` foi definido. Se sim, é retornado um `Heading` com o título da caixa. O título é estilizado com o tamanho "xl", margem superior e inferior de 6 e 2 unidades, respectivamente, e cor "gray.500".

Por fim, é retornado um componente `Text` com o conteúdo da caixa, estilizado com cor "gray.500" e margem superior de 4 unidades.

Finalmente, se `children` foi definido, são adicionados elementos filhos ao componente.

Este componente pode ser reutilizado em outras partes da aplicação para exibir mensagens de erro de forma consistente e estilizada.
```tsx
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import { Flex, Text } from "shared/ui/atoms";
type BoxSuccessProps = {
  title: string;
  content: string;
  children?: React.ReactNode;
};
export const BoxSuccess = ({ title, content, children, ...rest }: BoxSuccessProps) => {
  return (
    <Box textAlign={"center"} py={4} px={2} {...rest} data-testid="BoxSuccessTestId">
      <CheckCircleIcon boxSize="50px" color="green.500" />
      <Heading as="h2" size="xl" mt={6} mb={2} color="gray.500">
        {title}
      </Heading>
      <Text color="gray.500" mt={4}>
        {content}
      </Text>
      {children}
    </Box>
  );
};
```
Este código define a construção de um componente `BoxSuccess` que é utilizado para exibir uma caixa de sucesso. O componente é construído com ajuda de outros componentes pré-definidos, como `Box`, `Heading` e `Text` do pacote `@chakra-ui/react` e o `CheckCircleIcon` do pacote `@chakra-ui/icons`.

O componente é declarado com uma tipagem, `BoxSuccessProps`, que define três propriedades opcionais: `title`, `content` e `children`. `title` e `content` são strings que são usadas para definir o título e o conteúdo da caixa de sucesso, respectivamente. `children` é uma propriedade opcional que permite que outros componentes sejam aninhados dentro deste componente.

Dentro da função, a caixa de sucesso é construída usando o componente `Box` com propriedades definidas como `textAlign` como "center", e margens `py` e `px` definidas como 4 e 2, respectivamente. Esta propriedade permite centralizar o texto dentro da caixa e dar um espaçamento entre o conteúdo e os limites da caixa. Além disso, a propriedade `data-testid` é adicionada para fins de testes automatizados.

A próxima seção do código exibe um ícone de círculo de verificação (`CheckCircleIcon`) centralizado dentro da caixa, com uma cor verde e uma largura e altura de 50 pixels. Em seguida, o título da caixa é exibido usando o componente `Heading`, com as propriedades `as` definidas como "h2", `size` definido como "xl", `mt` e `mb` definidos como 6 e 2, respectivamente, e a cor definida como "gray.500".

O conteúdo da caixa é exibido usando o componente `Text` com a cor definida como "gray.500" e `mt` definido como 4. Finalmente, se houver componentes filhos, eles serão exibidos na caixa.

Em resumo, este código define uma construção de componente `BoxSuccess` para exibir uma caixa de sucesso com um título, um conteúdo e outros componentes filhos opcionais.
```tsx
 setModalBody(
      newModalBody ?? type === "error" ? (
        <BoxError title={subtitle} content={content} />
      ) : type === "success" ? (
        <BoxSuccess title={subtitle} content={content} />
      ) : null
    );
```
O código acima está criando o corpo do modal dinamicamente, dependendo do tipo de modal (erro ou sucesso) que é passado como argumento. Se o argumento "type" for "error", então o componente `BoxError` é renderizado. Se o argumento "type" for "success", então o componente `BoxSuccess` é renderizado.

O componente `BoxError` recebe três propriedades: "title", "content" e "children". O título e o conteúdo são passados como "subtitle" e "content", respectivamente. O argumento "children" é opcional e não está sendo usado nesse código. O componente `BoxSuccess` também recebe as mesmas três propriedades.

A função `setModalBody` está sendo usada para atualizar o corpo do modal de acordo com as propriedades passadas aos componentes `BoxError` e `BoxSuccess`. O argumento "newModalBody" é usado para atualizar o corpo do modal, caso ele já tenha sido definido previamente. Se o argumento "newModalBody" não for definido, o corpo do modal será definido com base no tipo de modal que é passado como argumento "type". 
```tsx
 showModal({
        newModalBody: null,
        type: "success",
        title: "Sucesso",
        content: "Login feito com sucesso.",
      });
```
O código acima é uma chamada para a função "showModal", com o objetivo de mostrar uma mensagem de sucesso ao usuário. A função showModal recebe como parâmetro um objeto com as seguintes propriedades:

1.  `newModalBody`: Propriedade opcional que permite ao desenvolvedor passar uma representação visual personalizada do corpo do modal. Neste caso, a propriedade está sendo definida como "null".
    
2.  `type`: Propriedade que indica o tipo de mensagem que deve ser exibida. Neste caso, o valor "success" indica que a mensagem é de sucesso.
    
3.  `title`: Propriedade que contém o título da mensagem. Neste caso, o título é "Sucesso".
    
4.  `content`: Propriedade que contém o conteúdo da mensagem. Neste caso, o conteúdo é "Login feito com sucesso.".
    
A função showModal será responsável por exibir o modal para o usuário, com base nas propriedades fornecidas. Em geral, a função deve ser implementada com a intenção de apresentar um modal de maneira genérica e reutilizável ao longo da aplicação. O uso desta função, neste caso específico, é para exibir uma mensagem de sucesso após o login ter sido realizado com êxito.

A utilização de componentes genéricos, como BoxSuccess e BoxError, tem como vantagem a reutilização de código. Ao invés de escrever repetidamente o mesmo código para cada mensagem de erro ou sucesso que precisamos mostrar em nossa aplicação, podemos criar componentes reutilizáveis que possuam a estrutura básica para exibir mensagens e apenas mudar os dados relevantes (título, conteúdo, etc.). Isso não só economiza tempo e esforço, mas também garante consistência na aparência e estrutura das mensagens em toda a aplicação. Além disso, se houver alguma alteração no design ou estrutura das mensagens, apenas precisaremos mudar o código no componente genérico e todas as outras mensagens automaticamente serão atualizadas.
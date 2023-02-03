---
title: 'Criando Form genérico no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Criando form genérico usando atomic design" irá ensinar como criar um formulário genérico que pode ser utilizado em diferentes partes da aplicação, baseado no conceito de atomic design.

O objetivo é mostrar como criar componentes reutilizáveis de forma organizada e padronizada. A aula irá explicar como utilizar os conceitos de atomic design na criação de formulários, desde os átomos (componentes menores, como campos de formulários), moléculas (componentes intermediários, como grupos de campos), até os organismos (componentes complexos, como formulários completos).

A aula irá abordar também o uso de validações de formulários e como implementá-las de forma eficiente. Ao final da aula, os alunos terão aprendido a criar formulários genéricos e reutilizáveis com base no conceito de atomic design.

```tsx
import { forwardRef, ForwardRefRenderFunction } from "react";
import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";
const ButtonAtom: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, ...rest },
  ref
) => {
  return (
    <ButtonChakra ref={ref} {...rest} data-testid="ButtonTestId">
      {children}
    </ButtonChakra>
  );
};
export const Button = forwardRef(ButtonAtom);
``` 
O código acima é uma implementação de um átomo de botão utilizando o Chakra UI e o React.

A primeira linha importa as funções `forwardRef` e `ForwardRefRenderFunction` do React. `forwardRef` é uma função que permite passar uma referência para um elemento para uma função componente. Já `ForwardRefRenderFunction` é um tipo que permite ao TypeScript identificar que uma função componente é passada como `ref`.

A seguir, é importado o componente `Button` do Chakra UI, bem como as propriedades deste componente, com o nome de `ButtonChakra` e `ButtonProps`, respectivamente.

Em seguida, é criado um átomo chamado `ButtonAtom`. É uma função componente que recebe dois parâmetros, `{ children, ...rest }` e `ref`. O primeiro parâmetro é o objeto que contém as propriedades passadas para o componente, incluindo o conteúdo entre as tags `{children}`. O segundo parâmetro é a referência ao elemento DOM.

Dentro da função `ButtonAtom`, é retornado o componente `ButtonChakra` do Chakra UI, passando para ele a referência (`ref`) e as propriedades restantes (`{...rest}`). Além disso, é adicionado um atributo `data-testid` para facilitar a identificação do componente durante os testes.

Por fim, é exportado o componente `Button`, que é criado a partir da aplicação da função `forwardRef` na função `ButtonAtom`. Isso permite que o componente tenha acesso à referência passada para ele.
 
```tsx
import { Stack as StackChakra, StackProps } from "@chakra-ui/react";
export const Stack = ({ children, ...rest }: StackProps) => {
  return (
    <StackChakra {...rest} data-testid="StackTestId">
      {children}
    </StackChakra>
  );
};
``` 
O código acima apresenta a implementação de um átomo de design chamado "Stack" que é construído a partir de uma biblioteca de componentes chamada "@chakra-ui/react".

A construção do átomo Stack envolve o uso do componente `StackChakra` da biblioteca "@chakra-ui/react", que é uma camada de conteúdo ou caixa de empilhamento, onde é possível adicionar vários componentes empilhados uns sobre os outros.

O átomo Stack é criado como uma função de componente que aceita um objeto de propriedades (props) e retorna um componente React. As propriedades são passadas como argumento `rest` e são repassadas como atributos para o componente `StackChakra`.

Além disso, o átomo Stack também inclui uma propriedade de teste de dados "data-testid", que é útil para testes de automação de interface do usuário.

Em resumo, o átomo Stack é uma camada de abstração ao componente `StackChakra`, permitindo que ele seja personalizado ou estilizado de acordo com as necessidades da aplicação sem prejudicar sua funcionalidade.

```tsx
import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import { FieldError } from "react-hook-form";
import {
  FormLabel,
  FormControl as FormControlChakra,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Input } from "shared/ui";
interface InputProps extends ChakraInputProps {
  name: string;
  bgColorHover?: string;
  label?: string;
  error?: FieldError;
}
const FormControlMolecules: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    size = "lg",
    focusBorderColor = "green.500",
    variant = "filled",
    bgColor = "purple.900",
    bgColorHover = "purple.900",
    label,
    error = null,
    ...rest
  },
  ref
) => {
  return (
    <FormControlChakra {...rest} data-testid="FormControlTestId">
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        id={name}
        name={name}
        focusBorderColor={focusBorderColor}
        bgColor={bgColor}
        variant={variant}
        _hover={{ bgColor: bgColorHover }}
        ref={ref}
        size={size}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControlChakra>
  );
};
export const FormControl = memo(forwardRef(FormControlMolecules));
``` 
Este é um exemplo de uma molécula de formulário usando o Chakra UI.

A molécula consiste em três componentes: FormLabel, Input e FormErrorMessage. Esses componentes são combinados para fornecer uma funcionalidade completa de um controle de formulário.

A molécula `FormControl` é criada como uma função React (`FormControlMolecules`) que aceita as propriedades de entrada, como `name`, `label`, `error`, entre outras. Essas propriedades são usadas para personalizar e controlar o comportamento da molécula.

A molécula usa o componente `FormControlChakra` do Chakra UI como envoltório, que fornece um espaçamento e alinhamento padrão para o controle de formulário. O componente `FormLabel` é usado para exibir o rótulo do controle de formulário, enquanto o componente `Input` é usado para exibir a entrada real.

O componente `FormErrorMessage` é usado para exibir uma mensagem de erro, se houver, baseada nas informações de erro passadas como propriedade `error`.

O `memo` e o `forwardRef` são usados para otimizar o desempenho da molécula, evitando sua re-renderização desnecessária.

A molécula é testável, pois contém o atributo `data-testid`.

```tsx
import { Stack } from "shared/ui/atoms";
import { FormControl } from "shared/ui/molecules";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
export interface FormControlProps {
  name: string;
  label: string;
  type: string;
}
interface FormControlGroupProps {
  formState: FormState<FieldValues>;
  register: UseFormRegister<FieldValues>;
  spacing?: string;
  formControls: FormControlProps[];
}
export const FormControlGroup = ({
  spacing,
  formControls = [],
  formState,
  register,
}: FormControlGroupProps) => {
  return (
    <Stack spacing={spacing} data-testid="FormControlGroupTestId">
      {formControls?.map?.(
        ({ label = "", name = "defaultName", type = "text" }, index: number) => (
          <FormControl
            key={index}
            label={label}
            type={type}
            error={formState?.errors?.[name] as any}
            {...register(name)}
            name={name}
          />
        )
      )}
    </Stack>
  );
};
``` 
Este código apresenta a implementação de um componente de organismo chamado `FormControlGroup`.

A propriedade `formState` é passada para o organismo, que é um objeto contendo informações sobre o estado do formulário, como valores atuais e erros de validação. A propriedade `register` é uma função do pacote `react-hook-form` que permite registrar campos de formulário.

O organismo é responsável por renderizar um grupo de controles de formulário. Para isso, ele usa o componente `Stack` da pasta "atoms" para organizar seus componentes filhos em uma pilha vertical. Além disso, o organismo usa o componente `FormControl` da pasta "molecules" para renderizar cada um dos controles de formulário.

O array de controles de formulário é passado através da propriedade `formControls`, que contém objetos com as propriedades `name`, `label` e `type` para cada controle. Para cada objeto no array, o organismo renderiza um componente `FormControl` passando as propriedades necessárias.

A propriedade `spacing` é opcional e permite definir a distância entre os componentes filhos. Se não for definida, o espaçamento será o padrão do componente `Stack`.
```tsx
import React, { ReactNode } from "react";
import { Flex, FormControlProps, FormControlGroup, Button } from "shared/ui";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

interface FormProps {
  handleSubmit: Function;
  handleCustomSubmit: Function;
  formControls: FormControlProps[];
  children?: ReactNode;
  buttonProps?: any;
  formProps?: any;
  buttonLabel?: string;
  formState: FormState<FieldValues>;
  register: UseFormRegister<FieldValues>;
}
export const Form = ({
  formState,
  register,
  children,
  handleCustomSubmit,
  handleSubmit,
  formControls,
  formProps,
  buttonProps,
  buttonLabel,
  ...rest
}: FormProps) => {
  return (
    <Flex
      onSubmit={handleSubmit(handleCustomSubmit)}
      as="form"
      w="100%"
      bg="purple.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      {...formProps}
    >
      <FormControlGroup
        spacing="4"
        formControls={formControls}
        register={register}
        formState={formState}
        {...rest}
      />
      <Button
        type="submit"
        mt="6"
        backgroundColor="green.600"
        colorScheme="green"
        size="lg"
        isLoading={formState?.isSubmitting}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
      {children}
    </Flex>
  );
};
``` 
Este é um componente de formulário `Form` importado de uma biblioteca compartilhada de UI. O componente é escrito em TypeScript e usa o React Hooks API, especificamente o `react-hook-form`.

O componente tem vários props que são usados para personalizar o formulário:

* `handleSubmit`: Uma função que é chamada quando o formulário é submetido.
* `handleCustomSubmit`: Uma função personalizada que pode ser chamada quando o formulário é submetido.
* `formControls`: Um array de `FormControlProps`, que representam os controles de formulário a serem renderizados no formulário.
* `children`: Um nó do React que pode ser usado para adicionar conteúdo adicional ao formulário.
* `buttonProps`: Propriedades adicionais que serão passadas para o botão de envio do formulário.
* `formProps`: Propriedades adicionais que serão passadas para o elemento de formulário.
* `buttonLabel`: Uma string que representa o texto a ser exibido no botão de envio do formulário.
* `formState`: O estado do formulário, que é obtido usando o `react-hook-form`.
* `register`: O registro do formulário, que é obtido usando o `react-hook-form`.

O componente é renderizado como uma `Flex` do componente compartilhado UI, que é usado como o elemento principal do formulário. É passado o `handleSubmit` para o evento `onSubmit` da `Flex`, que é usado para chamar a função `handleCustomSubmit` quando o formulário é submetido.

O componente `FormControlGroup` é renderizado dentro da `Flex` e é passado o `formState` e o `register` para que possa ser usado para renderizar os controles de formulário. O componente `Button` é renderizado abaixo do componente `FormControlGroup` e é usado para enviar o formulário.

O componente é flexível e personalizável, pois permite que os props sejam passados para personalizar o comportamento e a aparência do formulário.

O uso do padrão de design atomic permite a criação de componentes reutilizáveis e escaláveis. Os "átomos" ou pequenos componentes visuais, como o `FormControl`, podem ser combinados para formar "moléculas" maiores, como o `FormControlGroup`, e finalmente "organismos" completos, como o `Form`.

Isso torna o processo de desenvolvimento de formulários muito mais eficiente, pois permite a reutilização de componentes já desenvolvidos e testados, e facilita a manutenção do código. Além disso, ajuda a manter a consistência visual e funcional ao longo do aplicativo, já que todos os componentes seguem os mesmos padrões e estilos.

Em resumo, o uso de atomic design para criar esse formulário genérico traz benefícios em termos de eficiência, escalabilidade, manutenção e consistência do design.

## Mas porque o curso usará React Hook Form?
Existem vários motivos pelos quais o curso optou por usar o React Hook Form em vez de outro gerenciador de form, como o Formik. Aqui estão alguns dos principais motivos:

1.  Menor complexidade: O React Hook Form é projetado para ser simples e fácil de usar. É uma biblioteca leve e não tem muita sobrecarga, o que pode ser vantajoso quando se trata de gerenciar formulários complexos.
    
2.  Desempenho: O React Hook Form é altamente otimizado para melhorar o desempenho do seu aplicativo, especialmente quando se trata de validação de formulários.
    
3.  Integração com o Yup: O React Hook Form é projetado para trabalhar perfeitamente com o Yup, um dos bibliotecas de validação mais populares. Isso significa que você pode criar facilmente regras de validação complexas para seus formulários.
    
4.  Documentação e comunidade: A documentação do React Hook Form é clara e completa, o que facilita o aprendizado e a implementação. Além disso, a comunidade é ativa e sempre pronta para ajudar, o que é importante quando se trata de resolver problemas ou obter ajuda.
    

No geral, o React Hook Form é uma boa escolha para gerenciar formulários em aplicativos React, especialmente quando se trata de projetos mais simples ou médios. Além disso, a integração com o Yup é uma vantagem adicional, pois permite uma validação fácil e poderosa dos seus formulários.
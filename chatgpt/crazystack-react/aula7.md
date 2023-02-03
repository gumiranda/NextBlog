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

introduza a aula "Criando form genérico usando atomic design"



explique em detalhes o átomo a seguir:
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

explique em detalhes o átomo a seguir:
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
explique em detalhes o código da molécula a seguir:
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
explique em detalhes o código da organismo a seguir:
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
explique em detalhes o código do template a seguir:
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

explique os benefícios em utilizar atomic design para fazer um formulário genérico

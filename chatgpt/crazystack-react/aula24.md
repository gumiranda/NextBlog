---
title: 'Configuração de PWA no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
qual titulo eu daria para a aula que ensina como um dos códigos o código a seguir : 


O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

introduza detalhadamente e de forma didática a aula " "

introduza detalhadamente e de forma didática a aula "" que possui o código
## CreateCategoryForm 
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { CategoryProps } from "entidades/category";
import { useCreateCategory } from "./createCategory.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";

export const CreateCategoryForm = () => {
  const { formState, register, handleSubmit, handleCreateCategory, active, setActive } =
    useCreateCategory();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateCategory)}
      title={"Createar categoria"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/categorys/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da categoria"
          error={formState.errors.name}
          {...register("name")}
        />
        <Checkbox
          label="Ativo"
          colorScheme="green"
          isChecked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
```
## CreateCategory Lib
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateCategoryFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateCategoryHandler = SubmitHandler<CreateCategoryFormData>;

export const createCategoryFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useCreateCategoryLib = () => {
  const formProps = useForm<CreateCategoryFormData>({
    resolver: yupResolver(createCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};
```
## CreateCategory Hook
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { useUi } from "shared/libs";
import {
  CreateCategoryFormData,
  SubmitCreateCategoryHandler,
  useCreateCategoryLib,
} from "./createCategory.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateCategory = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createCategory = useMutation(async (category: CreateCategoryFormData) => {
    try {
      const { data } = await api.post("/category/add", {
        ...category,
      });
      if (!data) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
        return;
      }
      showModal({
        content:
          "Categoria criada com sucesso, você será redirecionado para a lista de categorias",
        title: "Sucesso",
        type: "success",
      });
      router.push("/categorys/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useCreateCategoryLib();
  const handleCreateCategory: SubmitCreateCategoryHandler = async (
    values: CreateCategoryFormData
  ) => {
    await createCategory.mutateAsync({ ...values, active });
  };
  return { formState, register, handleSubmit, handleCreateCategory, active, setActive };
};
```
## CategoryCreatePage
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Box, Head } from "shared/ui";
import { CategoryProps } from "entidades/category";
import { CreateCategoryForm } from "features/category/create";

export const CategoryCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de criação de categorias do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateCategoryForm />
      </Box>
    </>
  );
};
```

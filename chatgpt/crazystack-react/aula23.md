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
## CreateItemActions (molécula)
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Link, HStack } from "@chakra-ui/react";
import { Flex, Button } from "shared/ui";
interface CreateItemActionsProps {
  isLoadingSaveButton: boolean;
  cancelRoute: string;
}

export const CreateItemActions = ({
  isLoadingSaveButton,
  cancelRoute,
}: CreateItemActionsProps) => {
  return (
    <Flex mt="8" justify="flex-end">
      <HStack spacing="4">
        <Link href={cancelRoute}>
          <Button colorScheme={"whiteAlpha"}>Cancelar</Button>
        </Link>
        <Button type="submit" isLoading={isLoadingSaveButton} colorScheme="green">
          Salvar
        </Button>
      </HStack>
    </Flex>
  );
};
```
## GridForm (molécula)
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
interface GridFormProps {
  children: ReactNode;
}

export const GridForm = ({ children }: GridFormProps) => {
  return (
    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
      {children}
    </SimpleGrid>
  );
};
```
## BoxCreateItem (organismo)
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Divider, Heading, VStack } from "@chakra-ui/react";
import { CreateItemActions, Box } from "shared/ui";
interface BoxCreateItemProps {
  onSubmit: any;
  title: string;
  isLoadingSaveButton: boolean;
  cancelRoute: string;
  children: any;
}
export const BoxCreateItem = ({
  onSubmit,
  isLoadingSaveButton = false,
  cancelRoute = "/",
  children,
  title = "Criar novo registro",
}: BoxCreateItemProps) => {
  return (
    <Box as="form" flex="1" borderRadius={8} bg="purple.800" p="8" onSubmit={onSubmit}>
      <Heading size="lg" fontWeight={"normal"}>
        {title}
      </Heading>
      <Divider my="6" borderColor="purple.700" />
      <VStack spacing={["6", "8"]}>{children}</VStack>
      <CreateItemActions
        isLoadingSaveButton={isLoadingSaveButton}
        cancelRoute={cancelRoute}
      />
    </Box>
  );
};
```
## EditCategoryForm (feature)
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { CategoryProps } from "entidades/category";
import { useEditCategory } from "./editCategory.hook";
import { BoxCreateItem, FormControl, GenericDetailsItem, GridForm } from "shared/ui";

export interface EditCategoryFormProps {
  category: CategoryProps;
}
export const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const { formState, register, handleSubmit, handleEditCategory } = useEditCategory({
    category,
  });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleEditCategory)}
      title={"Editar categoria"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/categorys/1"}
    >
      <GenericDetailsItem
        item={category}
        fields={[
          { id: "_id", label: "Id" },
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
      <GridForm>
        <FormControl
          label="Nome da categoria"
          error={formState.errors.name}
          {...register("name")}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
```
## EditCategory Lib
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditCategoryFormProps } from "./EditCategoryForm";
export type EditCategoryFormData = {
  name: string;
};

export type SubmitEditCategoryHandler = SubmitHandler<EditCategoryFormData>;

export const editCategoryFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditCategoryLib = (props: EditCategoryFormProps) => {
  const { category: currentCategory } = props;
  const formProps = useForm<EditCategoryFormData>({
    resolver: yupResolver(editCategoryFormSchema),
    defaultValues: {
      name: currentCategory?.name ?? "",
    },
  });
  return { ...formProps };
};
```
## EditCategory Hook
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { useUi } from "shared/libs";
import { EditCategoryFormProps } from "./EditCategoryForm";
import {
  EditCategoryFormData,
  SubmitEditCategoryHandler,
  useEditCategoryLib,
} from "./editCategory.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditCategory = (props: EditCategoryFormProps) => {
  const { showModal } = useUi();
  const { category: currentCategory } = props;
  const router = useRouter();
  const editCategory = useMutation(async (category: EditCategoryFormData) => {
    try {
      const { data } = await api.patch(`/category/update?_id=${currentCategory._id}`, {
        ...category,
        updatedAt: new Date(),
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
          "Categoria editada com sucesso, você será redirecionado para a lista de categorias",
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
  const { register, handleSubmit, formState } = useEditCategoryLib(props);
  const handleEditCategory: SubmitEditCategoryHandler = async (
    values: EditCategoryFormData
  ) => {
    await editCategory.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditCategory };
};
```
## CategoryEditPage
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Box, Head } from "shared/ui";
import { EditCategoryForm } from "features/category/edit";
import { CategoryProps } from "entidades/category";
type CategoryEditProps = {
  data: CategoryProps;
  id: string;
};
export const CategoryEditPage = ({ data, id }: CategoryEditProps) => {
  const props = { category: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de edição de categorias do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditCategoryForm {...props} />
      </Box>
    </>
  );
};
```
## edit/[id]
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { CategoryEditPage } from "screens/category/edit/CategoryEditPage";
import { getCategoryById } from "entidades/category/category.api";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const id = context?.query?.id;
  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }
  const data = await getCategoryById(id, context);
  return {
    props: {
      data,
      id,
    },
  };
});
export default CategoryEditPage;
```

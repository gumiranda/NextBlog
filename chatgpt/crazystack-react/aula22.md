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
## GenericDetailsItem (Molécula)
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
interface GenericDetailsItemProps {
  item: any;
  fields: any[];
}

export const GenericDetailsItem: React.FC<GenericDetailsItemProps> = ({
  item,
  fields,
}) => {
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns={["repeat(1,1fr)", "repeat(2,1f)", "repeat(3,1fr)"]}
      gap={2}
    >
      {!!item &&
        fields?.map?.((field, index) => (
          <React.Fragment key={`${Math.random() * 10}-${index}`}>
            {!!item?.[field?.id] && (
              <GridItem w="100%" p={["0", "0", "0", "4"]}>
                <Text>{field?.label}:&nbsp;</Text>
                <Text>{item?.[field?.id]}</Text>
              </GridItem>
            )}
          </React.Fragment>
        ))}
    </Grid>
  );
};
```
## CategoryDetails
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Flex, GenericDetailsItem, Text, Button } from "shared/ui";
import { Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import { CategoryProps } from "../category.model";
type CategoryDetailsProps = {
  category: CategoryProps;
};

export const CategoryDetails = ({ category }: CategoryDetailsProps) => {
  return (
    <>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight={"normal"}>
          Categoria {category?.name}
        </Heading>
        <NextLink passHref href={`/categorys/edit/${category?._id}`}>
          <Button
            size="sm"
            fontSize={"sm"}
            colorScheme="green"
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Editar
          </Button>
        </NextLink>
      </Flex>
      <GenericDetailsItem
        item={category}
        fields={[
          { id: "name", label: "Nome" },
          { id: "createdById", label: "Id do criador" },
          { id: "createdAt", label: "Data de criação" },
        ]}
      />
    </>
  );
};
```
## CategoryDetailsPage
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Box, Head } from "shared/ui";
import { CategoryDetails } from "entidades/category/details";
import { CategoryProps } from "entidades/category";
type CategoryDetailsProps = {
  data: CategoryProps;
  id: string;
};
export const CategoryDetailsPage = ({ data, id }: CategoryDetailsProps) => {
  const props = { category: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de detalhes de categorias do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CategoryDetails {...props} />
      </Box>
    </>
  );
};
```

## Category API
explique detalhadamente e de forma didática o código a seguir:
```tsx
export const getCategoryById = async (
  id: string,
  ctx: any
): Promise<CategoryProps | null> => {
  try {
    const { data } = await setupAPIClient(ctx).get("/category/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return categoryModel(data).format();
  } catch (error) {
    return null;
  }
};
```
## details/[id]
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { CategoryDetailsPage } from "screens/category/details/CategoryDetailsPage";
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
export default CategoryDetailsPage;
```

---
title: 'Criando componente de modal genérico com Chakra UI no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nessa aula, você aprenderá a criar um componente de modal genérico utilizando a biblioteca Chakra UI. O objetivo é ter um componente reutilizável que possa ser usado em vários lugares da aplicação, sem precisar escrever o código do modal toda vez que precisarmos dele.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

O componente de modal consistirá em uma janela flutuante que será exibida em cima do conteúdo da aplicação, ocupando toda a tela e escurecendo o fundo. O usuário poderá interagir com o conteúdo do modal e fechá-lo clicando em um botão ou clicando fora da janela.

Para criar esse componente, você precisará importar os componentes `Modal`, `ModalOverlay`, `ModalContent`, `ModalHeader`, `ModalFooter` e `ModalBody` da biblioteca Chakra UI. Além disso, você precisará utilizar os hooks `useState` e `useRef` do React para controlar a exibição do modal e a referência do elemento do modal, respectivamente.

Com esses componentes e hooks, você poderá criar a estrutura básica do modal, que consistirá em um componente `Modal` com uma `ModalOverlay` que cobrirá o fundo da tela, uma `ModalContent` com o conteúdo principal do modal, uma `ModalHeader` com o título do modal, uma `ModalBody` com o corpo do modal e uma `ModalFooter` com os botões de ação.

Você também precisará adicionar algumas interações ao componente, como a capacidade de abrir e fechar o modal, bem como a opção de fechar o modal ao clicar fora da janela. Para isso, você pode usar a função `useEffect` e o hook `useRef` para manter a referência do elemento do modal e controlar sua exibição.

Com todos esses componentes e interações, você terá criado um componente de modal genérico reutilizável que pode ser usado em várias partes da aplicação. Espero que você aproveite essa aula e aprenda a criar componentes de modal com Chakra UI!
```tsx
import {
  Modal as ModalChakra,
  ModalProps as ModalPropsChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
interface ModalProps extends ModalPropsChakra {
  children: React.ReactNode;
  modalFooter: React.ReactNode;
  modalHeaderText: string;
}
export const Modal = ({
  children,
  isOpen,
  onClose,
  modalHeaderText,
  modalFooter,
  ...rest
}: ModalProps) => {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700" textAlign={"center"}>
          {modalHeaderText}
        </ModalHeader>
        <ModalCloseButton color="purple.700" />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
};
``` 
Esse código apresenta uma implementação de um componente de modal genérico usando a biblioteca Chakra UI.

A primeira coisa que acontece é a importação de componentes da biblioteca Chakra UI, como Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody e ModalFooter. Estes componentes são componentes prontos da biblioteca Chakra UI para criar um modal.

Em seguida, é definido o tipo de interface `ModalProps` que extende a interface `ModalPropsChakra` da biblioteca Chakra UI. Essa interface define os propriedades que nosso componente modal personalizado irá aceitar, além das propriedades já existentes em `ModalPropsChakra`. As propriedades adicionais são `children`, que será o conteúdo que será exibido no corpo do modal, `modalFooter`, que será o conteúdo que será exibido no rodapé do modal, e `modalHeaderText`, que será o texto que será exibido no cabeçalho do modal.

Por fim, é definido o componente `Modal` que aceita todas as propriedades definidas na interface `ModalProps`. O componente usa o componente `ModalChakra` da biblioteca Chakra UI com as propriedades `isOpen`, que indica se o modal deve ser exibido ou não, `onClose`, que é uma função que é executada quando o usuário clica no botão fechar, e `isCentered`, que indica se o modal deve ser centralizado na tela. Além disso, todas as outras propriedades são passadas para o componente `ModalChakra` com a sintaxe `...rest`.

Dentro do componente `Modal`, são definidos os componentes `ModalOverlay`, `ModalContent`, `ModalHeader`, `ModalCloseButton`, `ModalBody` e `ModalFooter` da biblioteca Chakra UI, para formar o modal. O texto que será exibido no cabeçalho do modal é passado como propriedade `modalHeaderText`, o conteúdo do corpo do modal é passado como propriedade `children` e o conteúdo do rodapé do modal é passado como propriedade `modalFooter`.

Assim, esse código fornece uma implementação de um componente de modal genérico que pode ser usado em aplicações para exibir informações ou solicitar ações do usuário. O uso desse componente é mais fácil e flexível do que usar diretamente os componentes da biblioteca Chakra UI, pois ele já inclui todas as configurações padrão que você precisa e permite
```tsx
import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Modal } from "./Modal";
import { useDisclosure } from "@chakra-ui/react";
function ModalTest() {
  const disclosure = useDisclosure();
  const { onClose } = disclosure;
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      modalHeaderText={"Header Text"}
      modalFooter={<></>}
    >
      Teste
    </Modal>
  );
}
describe("<Modal/>", () => {
  it("should render the Modal component", () => {
    renderWithTheme(<ModalTest />);
    expect(screen.getByText("Header Text")).toBeInTheDocument();
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });
});
``` 
Este código é um exemplo de como testar o componente de modal `Modal` que foi criado. O objetivo é garantir que o componente esteja funcionando corretamente e exibindo o conteúdo correto.

1.  Importações:

* A primeira linha importa a função `renderWithTheme` da pasta `test/testUtils`. Esta função é usada para renderizar componentes React com um tema específico, o que é útil para testes de componentes de interface do usuário.
* A segunda linha importa a função `screen` do pacote `@testing-library/react`. `screen` é uma função que permite acessar elementos na tela (DOM) para verificações de teste.
* A terceira linha importa o componente `Modal` que foi criado.
* A quarta linha importa a função `useDisclosure` do pacote `@chakra-ui/react`. `useDisclosure` é um hook que fornece uma forma simples de controlar o estado de um componente modal.

2.  `ModalTest`:

* Esta é uma função componente que retorna o componente `Modal` renderizado.
* A primeira linha usa o hook `useDisclosure` para obter o objeto `disclosure`, que inclui informações sobre o estado do modal e ações que podem ser realizadas no modal (como fechá-lo).
* A segunda linha desestrutura o objeto `disclosure` para obter a função `onClose`, que é usada para fechar o modal.
* A última linha retorna o componente `Modal` renderizado, passando os seguintes props:
    * `isOpen`: definido como `true` para que o modal seja exibido.
    * `onClose`: é a função `onClose` obtida do objeto `disclosure` para fechar o modal.
    * `modalHeaderText`: é o texto que será exibido no cabeçalho do modal.
    * `modalFooter`: é o conteúdo que será exibido no rodapé do modal. Neste caso, está sendo passado `<></>`, que é uma forma de retornar um componente vazio.
    * `children`: é o conteúdo que será exibido no corpo do modal. Neste caso, é a string "Teste".
 
## Mais exemplos de teste unitário
Aqui estão algumas sugestões adicionais de testes unitários para o componente Modal:
```tsx
it("should render the Modal with a custom header text", () => {
  const customHeaderText = "Custom Header Text";
  renderWithTheme(
    <Modal
      isOpen={true}
      onClose={onClose}
      modalHeaderText={customHeaderText}
      modalFooter={<></>}
    >
      Teste
    </Modal>
  );
  expect(screen.getByText(customHeaderText)).toBeInTheDocument();
});

it("should render the Modal with custom content", () => {
  const customContent = "Custom Content";
  renderWithTheme(
    <Modal
      isOpen={true}
      onClose={onClose}
      modalHeaderText={"Header Text"}
      modalFooter={<></>}
    >
      {customContent}
    </Modal>
  );
  expect(screen.getByText(customContent)).toBeInTheDocument();
});

it("should render the Modal with custom footer", () => {
  const customFooter = <p>Custom Footer</p>;
  renderWithTheme(
    <Modal
      isOpen={true}
      onClose={onClose}
      modalHeaderText={"Header Text"}
      modalFooter={customFooter}
    >
      Teste
    </Modal>
  );
  expect(screen.getByText("Custom Footer")).toBeInTheDocument();
});

it("should call the onClose function when the close button is clicked", () => {
  const spy = jest.fn();
  renderWithTheme(
    <Modal
      isOpen={true}
      onClose={spy}
      modalHeaderText={"Header Text"}
      modalFooter={<></>}
    >
      Teste
    </Modal>
  );
  screen.getByRole("button", { name: "Close" }).click();
  expect(spy).toHaveBeenCalled();
});
```
## E o context global que usa esse modal?
Ainda nessa aula será abordada a criação de um contexto global no React para gerenciar o estado de exibição do modal criado além de gerenciar o estado de loading da aplicação.

Nesta aula, você aprenderá sobre o uso de contextos no React, que é uma maneira de compartilhar estado entre componentes sem passar props manualmente de componente em componente. Além disso, você aprenderá como criar um contexto global e como usá-lo em seus componentes.

Você também aprenderá sobre o uso de hooks para gerenciar o estado de loading da aplicação. Um hook é uma função que permite que você adicione comportamento de estado a componentes funcionais. Usaremos o hook useState para criar um estado de loading na aplicação e o hook useContext para obter o contexto global em componentes.

Em resumo, nesta aula, você aprenderá a:

1.  Criar um contexto global para gerenciar o estado de exibição do modal e o estado de loading da aplicação.
    
2.  Usar hooks para gerenciar o estado de loading na aplicação.
    
3.  Obter o contexto global em componentes usando o hook useContext.
    
Com estes conceitos em mente, você será capaz de criar aplicações mais escaláveis e organizadas. Veja a seguir como fica o context:
```tsx
import { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { Modal } from "widgets";
import { Button } from "shared/ui";
type UiProviderProps = {
  children: ReactNode;
};
type UiContextData = UseDisclosureReturn & {
  clearModalProps: Function;
  showModal: Function;
  loading: boolean;
  setLoading: Function;
};
const UiContext = createContext({} as UiContextData);
const CloseButton = ({ onClose }: any) => {
  return (
    <Button colorScheme={"purple"} mr={3} onClick={onClose}>
      Ok, entendi
    </Button>
  );
};
export function UiProvider({ children }: UiProviderProps) {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure;
  const [modalHeaderText, setModalHeaderText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalBody, setModalBody] = useState<ReactNode>(null);

  const [modalFooter, setModalFooter] = useState<ReactNode>(
    <CloseButton onClose={onClose} />
  );
  const showModal = ({
    newModalFooter = <CloseButton onClose={onClose} />,
    newModalBody = null,
    newModalHeaderText = "Atenção",
  }) => {
    setModalFooter(newModalFooter);
    setModalBody(newModalBody);
    setModalHeaderText(newModalHeaderText);
    onOpen();
  };
  const clearModalProps = () => {
    setModalFooter(
      <Button colorScheme="whiteAlpha" mr={3} onClick={onClose}>
        Fechar
      </Button>
    );
    setModalBody(<></>);
    setModalHeaderText("");
  };
  return (
    <UiContext.Provider
      value={{ ...disclosure, showModal, clearModalProps, loading, setLoading }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        modalHeaderText={modalHeaderText}
        modalFooter={modalFooter}
      >
        {modalBody}
      </Modal>
    </UiContext.Provider>
  );
}
export const useUi = () => useContext(UiContext); 
``` 
Este código define um contexto global para ser usado em uma aplicação React. O contexto é criado com o `createContext` e o nome escolhido para o contexto é `UiContext`. O contexto é criado com um objeto vazio `{} as UiContextData` como seu valor inicial, que define o tipo de dados que esse contexto irá armazenar.

O tipo `UiContextData` é definido como a união de `UseDisclosureReturn` e três outros objetos: `clearModalProps`, `showModal` e `loading`. `UseDisclosureReturn` é importado do pacote `@chakra-ui/react` e é o tipo de retorno da função `useDisclosure`.

`UiProvider` é uma função que aceita um objeto `UiProviderProps` como argumento, que contém um único atributo, `children`, que é o conteúdo que será renderizado dentro do contexto. Dentro do corpo da função `UiProvider`, é usada a função `useDisclosure` para ter acesso ao `isOpen`, `onOpen`, e `onClose` para controlar a exibição do modal.

Há também três estados gerenciados com `useState`: `modalHeaderText`, `loading`, e `modalBody`. `modalFooter` é inicializado com um botão "Ok, entendi".

A função `showModal` aceita três argumentos opcionais: `newModalFooter`, `newModalBody`, e `newModalHeaderText`. Essa função é usada para exibir o modal, definindo o texto do cabeçalho, o corpo e o rodapé do modal com base nos argumentos passados para a função. `onOpen` é chamado para abrir o modal.

A função `clearModalProps` é usada para limpar as propriedades do modal. Ele redefine o rodapé com um botão "Fechar" e o texto do cabeçalho e o corpo com valores vazios.

Por fim, o `UiContext.Provider` é retornado como resultado, fornecendo acesso aos dados do contexto. O contexto contém os valores retornados por `useDisclosure`, bem como `showModal`, `clearModalProps`, `loading`, e `setLoading`. O componente `Modal` é também incluído como filho do `UiContext.Provider`, usando os valores do estado para definir suas propriedades.

A função `useUi` é uma função de hook que permite acessar o contexto usando o `useContext`. Ela retorna o valor armazenado no contexto `UiContext`.

## E se eu usasse Redux Saga pra fazer isso?
Com o Redux Saga, você pode gerenciar o estado global da aplicação, incluindo o modal e o loading, usando o padrão de gerenciamento de estado Redux.

Você começaria criando ações para abrir e fechar o modal, além de mostrar e ocultar o loading. Em seguida, você criaria um saga que ouça as ações e execute as ações apropriadas, por exemplo, atualizando o estado do modal e do loading.

Aqui está um exemplo de código para abrir e fechar o modal usando o Redux Saga:
```tsx
// actions.js
export const openModal = (headerText, body) => ({
  type: "OPEN_MODAL",
  headerText,
  body,
});

export const closeModal = () => ({
  type: "CLOSE_MODAL",
});

// sagas.js
import { takeLatest, put } from "redux-saga/effects";
import { openModal, closeModal } from "./actions";

function* handleOpenModal(action) {
  yield put({
    type: "UPDATE_MODAL",
    isOpen: true,
    headerText: action.headerText,
    body: action.body,
  });
}

function* handleCloseModal() {
  yield put({
    type: "UPDATE_MODAL",
    isOpen: false,
    headerText: "",
    body: null,
  });
}

export default function* modalSaga() {
  yield takeLatest("OPEN_MODAL", handleOpenModal);
  yield takeLatest("CLOSE_MODAL", handleCloseModal);
}

// reducer.js
const initialState = {
  isOpen: false,
  headerText: "",
  body: null,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_MODAL":
      return {
        ...state,
        isOpen: action.isOpen,
        headerText: action.headerText,
        body: action.body,
      };
    default:
      return state;
  }
}
```
Da mesma forma, você poderia criar ações, um saga e um reducer para gerenciar o estado do loading. Em seguida, você poderia integrar o saga do modal e o saga do loading ao seu store Redux usando o createSagaMiddleware do redux-saga.

Vale ressaltar que essa é apenas uma forma de se fazer. Existem muitas outras maneiras de lidar com o modal e o loading usando o Redux Saga, essa é apenas uma abordagem geral para entender como o Redux Saga pode ser usado.

Aos defensores de Redux, eu argumentaria que usar um context global para lidar com modais pode ser uma solução mais simples e menos complexa do que usar o Redux. A ideia do Redux é centralizar todo o estado da aplicação e garantir a consistência dos dados, mas para algumas tarefas, como lidar com modais, pode ser muito complexo e desnecessário.

Com o context global, é possível compartilhar estados e ações entre componentes sem a necessidade de fazer dispatch de ações para alterar o estado global do Redux. Isso significa menos código, menos complexidade e uma experiência de programação mais intuitiva. Além disso, o context global é especialmente útil para compartilhar estados que são usados em uma pequena porção da aplicação.

Claro, se você estiver lidando com muitos estados diferentes e complexos na sua aplicação, o Redux pode ser a escolha certa. Mas para lidar com modais, um context global pode ser uma solução muito mais eficiente e menos complexa.
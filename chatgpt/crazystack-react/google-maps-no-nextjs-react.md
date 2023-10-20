---
title: 'Integrando o Google Maps com Next.js usando @googlemaps/google-maps-services-js e @googlemaps/js-api-loader'
excerpt: 'Nesse post explicarei como utilizar Google Maps na prática quando o assunto é integrar mapas no React.js'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-15T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
O Next.js é uma estrutura popular para o desenvolvimento de aplicativos da web, e o Google Maps é uma escolha comum quando se trata de integração de mapas. Neste artigo, você aprenderá como integrar o Google Maps em um aplicativo Next.js e renderizar uma rota em um mapa usando as bibliotecas @googlemaps/google-maps-services-js e @googlemaps/js-api-loader.

## Instalando as bibliotecas necessárias
Para integrar o Google Maps em seu aplicativo Next.js, você precisará instalar duas bibliotecas: @googlemaps/google-maps-services-js e @googlemaps/js-api-loader. Execute o seguinte comando no terminal:
```tsx
npm install @googlemaps/google-maps-services-js @googlemaps/js-api-loader
``` 
## Gere sua API KEY
Para usar os serviços do Google Maps, você precisará de uma chave de API do Google. Siga as instruções fornecidas pela documentação do Google para obter uma chave de API: Obtenha uma chave de API do Google [clicando AQUI](https://developers.google.com/maps/gmp-get-started?hl=pt-br#enable-services).

## Defina seu ENV
Após obter a chave de API, você precisará configurá-la em seu aplicativo Next.js. Crie um arquivo .env na raiz do projeto e adicione a chave como uma variável de ambiente:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```
Certifique-se de substituir YOUR_API_KEY pela chave de API real.

## Vamos pro código 
O código TypeScript a seguir define uma classe chamada `RouteGoogle`, que implementa a interface `RouteProtocol`. Essa classe é responsável por criar e gerenciar uma rota no Google Maps, incluindo marcadores para o ponto de partida e de chegada, bem como um marcador que representa o veículo em movimento (por exemplo, um carro). Aqui está uma explicação detalhada do código:

1. **Importação de módulos e tipos**:
   ```tsx
   import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
   import { RouteProtocol } from "./route.protocol";
   import { convertDirectionsResponseToDirectionsResult } from "./mapUtils";
   ```
   - A primeira linha importa o tipo `DirectionsResponseData` da biblioteca `@googlemaps/google-maps-services-js`. Este tipo é usado para lidar com os dados da resposta das direções do Google Maps.
   - A segunda linha importa a interface `RouteProtocol` de um módulo local chamado `route.protocol`. Essa interface define um contrato que a classe `RouteGoogle` deve seguir.
   - A terceira linha importa uma função `convertDirectionsResponseToDirectionsResult` do módulo `mapUtils`.

2. **Declaração da classe `RouteGoogle`**:
   ```tsx
   export class RouteGoogle implements RouteProtocol {
     // Propriedades da classe
   }
   ```
   - A classe `RouteGoogle` é exportada e implementa a interface `RouteProtocol`.

3. **Construtor**:
   ```tsx
   constructor(options: {
     startMarkerOptions: google.maps.MarkerOptions;
     endMarkerOptions: google.maps.MarkerOptions;
     carMarkerOptions: google.maps.MarkerOptions;
   }) {
     // Inicialização das propriedades da classe
   }
   ```
   - O construtor da classe aceita um objeto `options` contendo três propriedades: `startMarkerOptions`, `endMarkerOptions` e `carMarkerOptions`. Essas opções são usadas para configurar os marcadores de início, fim e carro.

4. **Inicialização de marcadores e `DirectionsRenderer`**:
   ```tsx
   this.startMarker = new google.maps.Marker(startMarkerOptions);
   this.endMarker = new google.maps.Marker(endMarkerOptions);
   this.carMarker = new google.maps.Marker(carMarkerOptions);
   const { strokeColor } = this.startMarker.getIcon() as google.maps.Symbol;
   this.directionsRenderer = new google.maps.DirectionsRenderer({
     suppressMarkers: true,
     polylineOptions: { strokeColor, strokeOpacity: 0.5, strokeWeight: 5 },
   });
   this.directionsRenderer.setMap(this.startMarker.getMap() as google.maps.Map);
   ```
   - Neste trecho, três marcadores (`startMarker`, `endMarker` e `carMarker`) são criados com base nas opções fornecidas. O `DirectionsRenderer` também é configurado para exibir a rota no mapa. O estilo da linha da rota é definido com base na cor do ícone do marcador de início

**Código completo:**   
```tsx
import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { RouteProtocol } from "./route.protocol";
import { convertDirectionsResponseToDirectionsResult } from "./mapUtils";

export class RouteGoogle implements RouteProtocol {
  public startMarker: google.maps.Marker;
  public endMarker: google.maps.Marker;
  public carMarker: google.maps.Marker;
  public directionsRenderer: google.maps.DirectionsRenderer;
  constructor(options: {
    startMarkerOptions: google.maps.MarkerOptions;
    endMarkerOptions: google.maps.MarkerOptions;
    carMarkerOptions: google.maps.MarkerOptions;
  }) {
    const { startMarkerOptions, endMarkerOptions, carMarkerOptions } = options;
    this.startMarker = new google.maps.Marker(startMarkerOptions);
    this.endMarker = new google.maps.Marker(endMarkerOptions);
    this.carMarker = new google.maps.Marker(carMarkerOptions);
    const { strokeColor } = this.startMarker.getIcon() as google.maps.Symbol;
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: { strokeColor, strokeOpacity: 0.5, strokeWeight: 5 },
    });
    this.directionsRenderer.setMap(this.startMarker.getMap() as google.maps.Map);
  }
  delete(): void {
    this.startMarker.setMap(null);
    this.endMarker.setMap(null);
    this.carMarker.setMap(null);
    this.directionsRenderer.setMap(null);
  }
  async calculateRoute(
    directionsResponseData?: DirectionsResponseData & { request: any }
  ): Promise<void> {
    if (directionsResponseData) {
      const directionsResult =
        convertDirectionsResponseToDirectionsResult(directionsResponseData);
      this.directionsRenderer.setDirections(directionsResult);
      return;
    }
    const startPosition = this.startMarker.getPosition() as google.maps.LatLng;
    const endPosition = this.endMarker.getPosition() as google.maps.LatLng;
    const result = await new google.maps.DirectionsService().route({
      origin: startPosition,
      destination: endPosition,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    this.directionsRenderer.setDirections(result);
  }
}
``` 
## Mas de onde veio essas função convertDirectionsResponseToDirectionsResult e tudo mais? 
Definimos várias funções e constantes relacionadas à renderização de ícones personalizados no Google Maps. Vou explicar cada parte do código em detalhes:

1. **`convertDirectionsResponseToDirectionsResult`**:
   ```tsx
   export function convertDirectionsResponseToDirectionsResult(
     directionsResponseData?: DirectionsResponseData & { request: any }
   ): google.maps.DirectionsResult {
     // ...
   }
   ```
   Esta função converte os dados da resposta do Google Directions API em um objeto `google.maps.DirectionsResult`. Isso é útil para obter informações de direção da rota e renderizá-la no mapa.

2. **`colors`**:
   ```tsx
   export const colors = [
     // Lista de cores
   ];
   ```
   `colors` é uma matriz de cores que pode ser usada para definir cores de ícones de marcadores no mapa.

3. **`makeCarIcon`**:
   ```tsx
   export const makeCarIcon = (color: string) => ({
     // Configurações do ícone do carro
   });
   ```
   `makeCarIcon` é uma função que cria um ícone personalizado para representar um veículo no mapa. Ela aceita uma cor como argumento e retorna um objeto com configurações de ícone, incluindo o formato do ícone e a cor.

4. **`makeMarkerIcon`**:
   ```tsx
   export const makeMarkerIcon = (color: string) => ({
     // Configurações do ícone do marcador
   });
   ```
   `makeMarkerIcon` é semelhante a `makeCarIcon`, mas cria um ícone personalizado para marcadores no mapa, como o marcador de início e de fim da rota.

Essas funções e constantes são úteis ao trabalhar com o Google Maps API, permitindo que você defina facilmente cores e estilos personalizados para os ícones de marcadores no mapa. Você pode usá-las ao criar instâncias de marcadores personalizados, como é feito no código da classe `RouteGoogle`, que você compartilhou anteriormente.

Código completo:
```tsx
import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export function convertDirectionsResponseToDirectionsResult(
  directionsResponseData?: DirectionsResponseData & { request: any }
): google.maps.DirectionsResult {
  const copy = { ...directionsResponseData };
  return {
    available_travel_modes: copy.available_travel_modes as google.maps.TravelMode[],
    geocoded_waypoints: copy.geocoded_waypoints,
    status: copy.status,
    request: copy.request,
    //@ts-expect-error
    routes: copy.routes?.map((route) => {
      const bounds = new google.maps.LatLngBounds(
        route.bounds.southwest,
        route.bounds.northeast
      );
      return {
        bounds,
        overview_path: google.maps.geometry.encoding.decodePath(
          route.overview_polyline.points
        ),
        overview_polyline: route.overview_polyline,
        warnings: route.warnings,
        copyrights: route.copyrights,
        summary: route.summary,
        waypoint_order: route.waypoint_order,
        fare: route.fare,
        legs: route.legs.map((leg) => ({
          ...leg,
          start_location: new google.maps.LatLng(
            leg.start_location.lat,
            leg.start_location.lng
          ),
          end_location: new google.maps.LatLng(leg.end_location.lat, leg.end_location.lng),
          steps: leg.steps.map((step) => ({
            path: google.maps.geometry.encoding.decodePath(step.polyline.points),
            start_location: new google.maps.LatLng(
              step.start_location.lat,
              step.start_location.lng
            ),
          })),
        })),
      };
    }),
  };
}
export const colors = [
  "#006064",
  "#00ff9c",
  "#04d9ff",
  "#00b37e",
  "#8cc840",
  "#ff00d4",
  "#ff0000",
  "#cfff04",
  "#ff8c00",
];

export const makeCarIcon = (color: string) => ({
  path: "M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z",
  fillColor: color,
  strokeColor: color,
  strokeWeight: 1,
  fillOpacity: 1,
  anchor: new google.maps.Point(0, 0),
});

export const makeMarkerIcon = (color: string) => ({
  path: "M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z    M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z",
  strokeColor: color,
  fillColor: color,
  strokeOpacity: 1,
  strokeWeight: 1,
  fillOpacity: 1,
  anchor: new google.maps.Point(46, 70),
}); 
``` 
## E usa esse RouteGoogle onde? Classe MapGoogle?
O código TypeScript a seguir define uma classe chamada `MapGoogle`, que implementa a interface `MapProtocol`. Essa classe é responsável por gerenciar um mapa do Google, adicionar rotas ao mapa, mover um marcador que representa um carro ao longo da rota e realizar outras operações relacionadas a rotas e mapas. Vou explicar o código em detalhes:

1. **Importação de módulos e tipos**:
   ```tsx
   import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
   import { MapProtocol } from "./map.protocol";
   import { RouteGoogle } from "./routeGoogle";
   import { sample, shuffle } from "lodash";
   import { colors, makeMarkerIcon, makeCarIcon } from "./mapUtils";
   ```
   - O código começa importando diversos módulos e tipos necessários. Isso inclui a importação de tipos relacionados à resposta das direções do Google Maps, bem como módulos locais e funções de utilitário.

2. **Declaração da classe `MapGoogle`**:
   ```tsx
   export class MapGoogle implements MapProtocol {
     // Propriedades da classe
   }
   ```
   - A classe `MapGoogle` é exportada e implementa a interface `MapProtocol`. Essa interface provavelmente define um contrato que a classe deve seguir para interagir com o mapa.

3. **Construtor**:
   ```tsx
   constructor(element: HTMLElement, options: google.maps.MapOptions) {
     // Inicialização do mapa
   }
   ```
   - O construtor da classe aceita um elemento HTML e opções de configuração do mapa. Ele inicializa o mapa do Google com as opções fornecidas e estilos personalizados.

4. **Método `addRoute`**:
   ```tsx
   async addRoute(routeOptions: {
     routeId: string;
     startMarkerOptions: google.maps.MarkerOptions;
     endMarkerOptions: google.maps.MarkerOptions;
     carMarkerOptions: google.maps.MarkerOptions;
     directionsResponseData?: DirectionsResponseData & { request: any };
   }): Promise<any> {
     // Adiciona uma rota ao mapa
   }
   ```
   - Este método adiciona uma rota ao mapa. Ele aceita várias opções, incluindo identificador da rota, opções para marcadores de início, fim e carro, e dados de resposta das direções do Google Maps. A rota é criada como uma instância da classe `RouteGoogle`, e a rota é adicionada ao mapa. Os limites do mapa são ajustados para exibir todas as rotas.

5. **Método `addRouteWithIcons`**:
   ```tsx
   async addRouteWithIcons(routeOptions: {
     routeId: string;
     startMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
     endMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
     carMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
     directionsResponseData?: DirectionsResponseData & { request: any };
   }): Promise<any> {
     // Adiciona uma rota ao mapa com ícones personalizados
   }
   ```
   - Este método é semelhante ao `addRoute`, mas também permite definir ícones personalizados para os marcadores de início, fim e carro. Ele seleciona uma cor aleatória para os ícones e, em seguida, chama `addRoute` para adicionar a rota com os ícones personalizados.

6. **Método `moveCar`**:
   ```tsx
   moveCar(routeId: string, position: google.maps.LatLngLiteral): void {
     // Move o marcador do carro ao longo da rota
   }
   ```
   - Este método permite mover o marcador do carro ao longo da rota. Ele recebe o identificador da rota (`routeId`) e a nova posição (coordenadas) do carro.

7. **Método `removeRoute`**:
   ```tsx
   removeRoute(id: string) {
     // Remove uma rota do mapa
   }
   ```
   - Este método remove uma rota do mapa com base no seu identificador. Ele chama o método `delete` da instância de `RouteGoogle` correspondente e, em seguida, remove a rota do registro.

8. **Método `removeAllRoutes`**:
   ```tsx
   removeAllRoutes() {
     // Remove todas as rotas do mapa
   }
   ```
   - Este método remove todas as rotas do mapa chamando repetidamente o método `removeRoute`.

9. **Método `hasRoute`**:
   ```tsx
   hasRoute(id: string): boolean {
     // Verifica se uma rota existe no mapa
   }
   ```
   - Este método verifica se uma rota com o identificador especificado existe no mapa.

10. **Método `getRoute`**:
    ```tsx
    getRoute(id: string): RouteGoogle {
      // Obtém a instância da rota com base no identificador
    }
    ```
    - Este método retorna a instância da rota com base no seu identificador.

11. **`customStyles`**:
    ```tsx
    const customStyles = [
      // Estilos personalizados do mapa
    ];
    ```
    - `customStyles` é uma matriz de estilos personalizados para o mapa. Esses estilos definem a aparência do mapa, como cores e padrões de elementos.

12. **`RouteExistsError`**:
    ```tsx
    export class RouteExistsError extends Error {}
    ```
    - `RouteExistsError` é uma classe personalizada de erro que pode ser lançada se uma tentativa de adicionar uma rota com um identificador já existente for feita.

Este código fornece uma estrutura para gerenciar rotas em um mapa do Google, permitindo a adição, remoção e movimentação de marcadores que representam veículos ao longo das rotas. Ele também oferece a capacidade de definir estilos personalizados para o mapa.
Código completo:
```tsx
import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { MapProtocol } from "./map.protocol";
import { RouteGoogle } from "./routeGoogle";
import { sample, shuffle } from "lodash";
import { colors, makeMarkerIcon, makeCarIcon } from "./mapUtils";

export class MapGoogle implements MapProtocol {
  public map: google.maps.Map;
  private routes: { [routeId: string]: RouteGoogle } = {};
  constructor(element: HTMLElement, options: google.maps.MapOptions) {
    this.map = new google.maps.Map(element, { ...options, styles: customStyles });
  }
  async addRoute(routeOptions: {
    routeId: string;
    startMarkerOptions: google.maps.MarkerOptions;
    endMarkerOptions: google.maps.MarkerOptions;
    carMarkerOptions: google.maps.MarkerOptions;
    directionsResponseData?: DirectionsResponseData & { request: any };
  }): Promise<any> {
    if (routeOptions.routeId in this.routes) {
      throw new RouteExistsError();
    }
    const { startMarkerOptions, endMarkerOptions, carMarkerOptions } = routeOptions;
    const route = new RouteGoogle({
      startMarkerOptions: { ...startMarkerOptions, map: this.map },
      endMarkerOptions: { ...endMarkerOptions, map: this.map },
      carMarkerOptions: { ...carMarkerOptions, map: this.map },
    });
    this.routes[routeOptions.routeId] = route;
    await route.calculateRoute(routeOptions.directionsResponseData);
    this.fitBounds();
  }
  private fitBounds() {
    const bounds = new google.maps.LatLngBounds();
    Object.keys(this.routes).forEach((id: string) => {
      const route = this.routes[id];
      bounds.extend(route.startMarker.getPosition()!);
      bounds.extend(route.endMarker.getPosition()!);
    });
    this.map.fitBounds(bounds);
  }
  async addRouteWithIcons(routeOptions: {
    routeId: string;
    startMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    endMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    carMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    directionsResponseData?: DirectionsResponseData & { request: any };
  }): Promise<any> {
    const color = sample(shuffle(colors)) as string;
    return this.addRoute({
      ...routeOptions,
      startMarkerOptions: {
        ...routeOptions.startMarkerOptions,
        icon: makeMarkerIcon(color),
      },
      endMarkerOptions: {
        ...routeOptions.endMarkerOptions,
        icon: makeMarkerIcon(color),
      },
      carMarkerOptions: {
        ...routeOptions.carMarkerOptions,
        icon: makeCarIcon(color),
      },
      directionsResponseData: routeOptions.directionsResponseData,
    });
  }
  moveCar(routeId: string, position: google.maps.LatLngLiteral): void {
    this.routes[routeId].carMarker.setPosition(position);
  }
  removeRoute(id: string) {
    if (!this.hasRoute(id)) {
      return;
    }
    const route = this.routes[id];
    route.delete();
    delete this.routes[id];
  }
  removeAllRoutes() {
    Object.keys(this.routes).forEach((id) => this.removeRoute(id));
  }
  hasRoute(id: string): boolean {
    return id in this.routes;
  }
  getRoute(id: string): RouteGoogle {
    return this.routes[id];
  }
}
const customStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
export class RouteExistsError extends Error {} 
``` 
## E usa onde essa classe MapGoogle? Tem mais arquivo?
Calma pessoal, tem muita função ainda pela frente. Uma delas é a getCurrentPosition. Ela é usada para obter a posição atual do dispositivo, como latitude e longitude, usando o recurso de geolocalização do navegador. Vou explicar o código em detalhes:

```tsx
export function getCurrentPosition(
  options?: PositionOptions
): Promise<{ lat: number; lng: number }> {
  // Retorna uma Promise que representa a posição atual
  return new Promise((resolve, reject) => {
    // Chama a função `navigator.geolocation.getCurrentPosition` para obter a posição
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (error) => reject(error),
      options
    );
  });
}
```

A função `getCurrentPosition` tem as seguintes partes:

1. **Declaração da Função**:
   - `export function getCurrentPosition(options?: PositionOptions): Promise<{ lat: number; lng: number }> {`
     - A função é declarada com o nome `getCurrentPosition`. Ela aceita um parâmetro opcional `options` do tipo `PositionOptions`, que contém opções de configuração para a solicitação de posição. A função retorna uma promessa (`Promise`) que irá conter um objeto com as coordenadas de latitude e longitude.

2. **Criação de uma Promessa**:
   - `return new Promise((resolve, reject) => {`
     - A função `getCurrentPosition` cria uma nova promessa. Uma promessa é um objeto que representa uma operação assíncrona e que pode ser resolvida com sucesso (através de `resolve`) ou rejeitada com um erro (através de `reject`).

3. **Chamada de `navigator.geolocation.getCurrentPosition`**:
   - `navigator.geolocation.getCurrentPosition(`
     - Aqui, a função `navigator.geolocation.getCurrentPosition` é chamada para obter a posição geográfica atual do dispositivo. Esta é uma funcionalidade do navegador que permite o acesso à localização do usuário.

4. **Manipulação do Resultado de Sucesso**:
   - `(position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),`
     - Se a função `getCurrentPosition` for bem-sucedida em obter a posição, a função de sucesso é chamada. Ela recebe um objeto `position` que contém informações sobre a posição, incluindo as coordenadas de latitude e longitude. Essas coordenadas são extraídas e passadas para a função `resolve` da promessa, o que indica que a promessa foi resolvida com sucesso.

5. **Manipulação de Erro**:
   - `(error) => reject(error),`
     - Se ocorrer um erro ao tentar obter a posição, a função de erro é chamada. O erro é passado para a função `reject` da promessa, indicando que a promessa foi rejeitada com o erro especificado.

6. **Opções de Posição**:
   - `options`
     - As opções de posição passadas para a função `getCurrentPosition` (se fornecidas) são repassadas a esta função. Essas opções podem incluir configurações como o tempo limite da solicitação ou a precisão desejada.

Resumindo, essa função `getCurrentPosition` encapsula a funcionalidade de geolocalização do navegador em uma promessa, permitindo que você solicite a posição do dispositivo e trate-a de maneira assíncrona, seja em caso de sucesso ou erro. A promessa retornada pela função pode ser resolvida com as coordenadas de latitude e longitude da posição atual, ou rejeitada com informações de erro. Isso é útil ao desenvolver aplicativos da web que dependem da localização do usuário.

Código completo:
```tsx
export function getCurrentPosition(
  options?: PositionOptions
): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (error) => reject(error),
      options
    );
  });
}
``` 
## E onde a gente usa ela?
Iremos utilizar numa hook nova pra manipular mapas no React.js. Este código a seguir é uma função chamada `useLoadMap` que utiliza React Hooks para carregar e inicializar um mapa do Google. Vou explicar o código em detalhes:

```tsx
import { Loader } from "@googlemaps/js-api-loader";
import { MapGoogle } from "entidades/mapRoute/googleMaps/mapGoogle";
import { useState, useEffect } from "react";
import { getCurrentPosition } from "shared/libs/utils";

export function useLoadMap(containerRef: React.RefObject<HTMLDivElement>) {
  const [map, setMap] = useState<MapGoogle>();
  useEffect(() => {
    (async () => {
      // Cria uma instância do Loader do Google Maps
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["routes", "geometry"],
      });

      // Carrega as bibliotecas necessárias e obtém a posição atual
      const [, , position] = await Promise.all([
        loader.importLibrary("routes"),
        loader.importLibrary("geometry"),
        getCurrentPosition({ enableHighAccuracy: true }),
      ]);

      // Inicializa o mapa do Google com a posição atual
      const newMap = new MapGoogle(containerRef.current!, { zoom: 15, center: position });
      setMap(newMap);
    })();
  }, [containerRef]);

  return map;
}
```

A função `useLoadMap` é usada como um hook personalizado para carregar e inicializar um mapa do Google. Vamos analisar cada parte:

1. **Importações de Módulos**:
   - O código importa os módulos e bibliotecas necessárias para trabalhar com o Google Maps, incluindo o `Loader` do Google Maps, uma classe `MapGoogle`, e funções do React e utilitários, como `useState`, `useEffect` e `getCurrentPosition`.

2. **Definição da Função `useLoadMap`**:
   - `useLoadMap(containerRef: React.RefObject<HTMLDivElement>)`:
     - A função `useLoadMap` recebe uma referência (`containerRef`) para um elemento HTML do tipo `<div>`, que será usado para renderizar o mapa.

3. **Hooks de Estado e Efeito**:
   - `const [map, setMap] = useState<MapGoogle>();`:
     - É criado um estado para armazenar a instância do mapa. Inicialmente, `map` é definido como `null`.

   - `useEffect(() => { ... }, [containerRef]);`:
     - Um efeito é utilizado para carregar e inicializar o mapa quando a referência ao elemento do container (`containerRef`) muda. Isso garante que o mapa seja carregado e inicializado quando o componente React que utiliza essa função é montado ou quando a referência ao contêiner é atualizada.

4. **Função Assíncrona no Efeito**:
   - `(async () => { ... })();`:
     - Uma função assíncrona é executada imediatamente dentro do efeito. Isso permite que o código seja executado de forma assíncrona e que as operações de carregamento não bloqueiem a interface do usuário.

5. **Instância do `Loader` do Google Maps**:
   - `const loader = new Loader({ ... });`:
     - É criada uma instância do `Loader` do Google Maps com as opções necessárias. Isso inclui a chave de API do Google Maps e a lista de bibliotecas a serem carregadas, como "routes" e "geometry".

6. **Carregamento de Bibliotecas e Posição Atual**:
   - `const [, , position] = await Promise.all([ ... ]);`:
     - O código aguarda o carregamento de duas bibliotecas ("routes" e "geometry") usando o método `importLibrary` do `loader`. Além disso, ele obtém a posição atual do dispositivo usando a função `getCurrentPosition`, passando opções de alta precisão (`enableHighAccuracy: true`).

7. **Inicialização do Mapa do Google**:
   - `const newMap = new MapGoogle(containerRef.current!, { zoom: 15, center: position });`:
     - Com as bibliotecas carregadas e a posição atual disponível, é criada uma nova instância de `MapGoogle`. O mapa é inicializado no elemento referenciado por `containerRef.current` com um zoom de 15 e o centro definido pela posição atual.

8. **Atualização do Estado**:
   - `setMap(newMap);`:
     - Finalmente, a instância do mapa é armazenada no estado `map` usando `setMap`, o que aciona uma re-renderização do componente que está utilizando este hook.

9. **Retorno do Mapa**:
   - `return map;`:
     - A função retorna a instância do mapa, que pode ser usada pelo componente que está utilizando este hook para renderizar e interagir com o mapa do Google.

Portanto, esta função personalizada `useLoadMap` permite carregar e inicializar um mapa do Google de forma assíncrona, garantindo que as bibliotecas necessárias sejam carregadas e a posição atual do dispositivo seja obtida antes da inicialização do mapa. Isso é útil em aplicativos React que exigem mapas interativos baseados no Google Maps.
## Tá mas e a tela que vai usar essa hook?
Primeiro a hook da tela de criação de rotas no código a seguir:
```tsx
import { useUi } from "shared/libs";
import {
  CreateMapRouteFormData,
  SubmitCreateMapRouteHandler,
  useCreateMapRouteLib,
} from "./createMapRoute.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { parseCookies } from "nookies";
import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { useLoadMap } from "../load-map";

export const useCreateMapRoute = ({ mapContainerRef }: any) => {
  const map = useLoadMap(mapContainerRef);
  const [directionsData, setDirectionsData] = useState<
    DirectionsResponseData & { request: any }
  >();
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [originListPlaces, setOriginListPlaces] = useState([]);
  const [destinationListPlaces, setDestinationListPlaces] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const createMapRoute = useMutation(async (mapRoute: CreateMapRouteFormData) => {
    try {
      const { data } = await api.post("/mapRoute/add", {
        ...mapRoute,
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
        // eslint-disable-next-line prettier/prettier
        content:
          "Rotas criada com sucesso, você será redirecionado para a lista de rotas",
        title: "Sucesso",
        type: "success",
      });
      router.push("/mapRoutes/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState, watch } = useCreateMapRouteLib();
  const handleCreateMapRoute: SubmitCreateMapRouteHandler = async (
    values: CreateMapRouteFormData
  ) => {
    const currentOrigin: any = originListPlaces?.find?.(
      (item: any) => item?.label === values?.originText
    );
    const currentDestination: any = destinationListPlaces?.find?.(
      (item: any) => item?.label === values?.destinationText
    );
    await createMapRoute.mutateAsync({
      ...values,
      active,
      source_id: currentOrigin?.value,
      destination_id: currentDestination?.value,
    });
  };
  const originText = watch("originText");
  const destinationText = watch("destinationText");
  const fetchTextOptions = async (text: string, setPlaces: any) => {
    if (text?.length < 1) {
      return;
    }
    const cookies = parseCookies();
    try {
      const sourceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${text}`,
        {
          headers: {
            ContentType: "application/json",
            authorization: `Bearer ${cookies["belezixadmin.token"]}`,
          },
        }
      );
      if (sourceResponse?.status !== 200) {
        setPlaces([]);
        return;
      }
      const sourcePlace = await sourceResponse.json();
      setPlaces(
        sourcePlace?.candidates?.map?.(({ name, place_id }: any) => ({
          label: name,
          value: place_id,
        })) ?? []
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function getTextPlaces() {
      await fetchTextOptions(originText, setOriginListPlaces);
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    }
  }, [originText]);
  useEffect(() => {
    async function getTextPlaces() {
      await fetchTextOptions(destinationText, setDestinationListPlaces);
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    }
  }, [destinationText]);
  const fetchDirections = useCallback(async () => {
    const cookies = parseCookies();
    const source = (document.getElementById("originText") as HTMLInputElement).value;
    const destination = (document.getElementById("destinationText") as HTMLInputElement)
      .value;
    const currentOrigin: any = originListPlaces?.find?.(
      (item: any) => item?.label === source
    );
    if (!currentOrigin) {
      return;
    }
    const currentDestination: any = destinationListPlaces?.find?.(
      (item: any) => item?.label === destination
    );
    if (!currentDestination) {
      return;
    }
    const directionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/directions?originId=${currentOrigin?.value}&destinationId=${currentDestination?.value}`,
      { headers: { authorization: `Bearer ${cookies["belezixadmin.token"]}` } }
    );
    const directionsDataRes: DirectionsResponseData & { request: any } =
      await directionsResponse.json();
    setDirectionsData(directionsDataRes);
    map?.removeAllRoutes();
    await map?.addRouteWithIcons({
      routeId: "123",
      startMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.start_location,
      },
      carMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.start_location,
      },
      endMarkerOptions: {
        position: directionsData?.routes?.[0]?.legs?.[0]?.end_location,
      },
    });
  }, [originText, destinationText, originListPlaces, destinationListPlaces]);
  return {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
    directionsData,
    fetchDirections,
    originText,
    destinationText,
  };
};
``` 
Este é um código React que lida com a criação de rotas em um aplicativo. Vou explicar em detalhes o que está acontecendo no código:

1. **Importações de Módulos**:
   - O código começa importando vários módulos e funções necessárias para o funcionamento do aplicativo, incluindo bibliotecas de gerenciamento de estado, roteamento, chamadas à API e outras utilidades.

2. **Definição da Função `useCreateMapRoute`**:
   - `useCreateMapRoute({ mapContainerRef }: any)`:
     - A função `useCreateMapRoute` é uma função personalizada que recebe um objeto com a propriedade `mapContainerRef`. Esta função é usada para criar rotas no aplicativo.

3. **Hooks e Estados**:
   - O código utiliza vários hooks do React, como `useState`, `useEffect`, `useMutation`, `useCreateMapRouteLib`, `useRouter`, e outros, para gerenciar estados e efeitos no aplicativo.

4. **Manipulação de Mapas**:
   - A função `useLoadMap` é usada para carregar e inicializar um mapa do Google em um contêiner especificado (`mapContainerRef`).

5. **Estado para Direções**:
   - O estado `directionsData` é usado para armazenar dados de direções (roteamento) do Google Maps.

6. **Manipulação de UI**:
   - A função `showModal` é usada para mostrar modais de notificação no aplicativo.

7. **Roteamento**:
   - O objeto `router` é utilizado para navegar entre as páginas do aplicativo.

8. **Gestão de Rotas Ativas**:
   - O estado `active` é utilizado para controlar se uma rota está ativa ou não.

9. **Listas de Origem e Destino**:
   - Os estados `originListPlaces` e `destinationListPlaces` armazenam listas de locais de origem e destino.

10. **Temporizador**:
    - O estado `timeoutId` é usado para controlar um temporizador, que é reiniciado sempre que o usuário digita em campos de origem ou destino.

11. **Criação de Rota**:
    - A função `createMapRoute` é criada usando o hook `useMutation` e é usada para enviar uma solicitação para criar uma nova rota no servidor.

12. **Registro de Dados do Formulário**:
    - Os hooks `register`, `handleSubmit`, `formState`, e `watch` são utilizados para registrar campos de formulário, lidar com envios de formulários, controlar o estado do formulário e monitorar mudanças nos campos do formulário.

13. **Manipulação de Dados de Origem e Destino**:
    - A função `handleCreateMapRoute` é utilizada para lidar com a criação de uma nova rota com base nos dados do formulário. Ela verifica os locais de origem e destino e chama a função `createMapRoute` para enviar a solicitação de criação da rota.

14. **Pesquisa de Locais**:
    - A função `fetchTextOptions` é usada para buscar opções de locais com base no texto inserido pelos usuários nos campos de origem e destino. Ela faz uma solicitação à API para obter resultados de locais correspondentes.

15. **Efeitos de Temporização**:
    - Existem dois efeitos que lidam com a temporização para buscar informações sobre os locais de origem e destino. Eles controlam quando as solicitações são feitas para evitar um grande número de solicitações enquanto o usuário digita.

16. **Obtenção de Direções**:
    - A função `fetchDirections` é usada para buscar informações de direções com base nos locais de origem e destino selecionados. Ela faz uma solicitação à API para obter os dados de direção e utiliza esses dados para exibir uma rota no mapa.

17. **Retorno de Dados**:
    - A função `useCreateMapRoute` retorna um objeto contendo vários estados e funções que são usados no componente que consome esta função personalizada. Isso inclui informações sobre o estado do formulário, locais de origem e destino, dados de direções, e funções para criar e gerenciar rotas.

Resumindo, este código é responsável por gerenciar a criação de rotas em um aplicativo. Ele lida com a interação do usuário, busca de locais, criação de rotas
## Código tsx que utiliza essa hook
Vamos lá pra tela final do tutorial:
 
```tsx
import { useCreateMapRoute } from "./createMapRoute.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm } from "shared/ui";
import { useRef } from "react";
import { Grid, Text, List, ListItem, Card, CardBody, Button } from "@chakra-ui/react";
export const CreateMapRouteForm = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
    directionsData,
    fetchDirections,
    originText,
    destinationText,
  } = useCreateMapRoute({ mapContainerRef });
  return (
    <>
      <BoxCreateItem
        onSubmit={handleSubmit(handleCreateMapRoute)}
        title={"Criar rotas"}
        isLoadingSaveButton={formState.isSubmitting}
        cancelRoute={"/mapRoutes/1"}
      >
        <GridForm>
          <FormControl
            label="Nome da rota"
            error={formState.errors.name}
            {...register("name")}
          />
          <FormControl
            label="Origem"
            error={formState.errors.originText}
            autoCompleteProps={{
              list: originListPlaces,
              placeholder: "Digite para pesquisar a origem",
            }}
            {...register("originText")}
          />
          <FormControl
            label="Destino"
            error={formState.errors.destinationText}
            autoCompleteProps={{
              list: destinationListPlaces,
              placeholder: "Digite para pesquisar a destino",
            }}
            {...register("destinationText")}
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
        {directionsData && (
          <Card mt={1}>
            <CardBody>
              <List>
                <ListItem>
                  <Text>Origem</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.start_address}</Text>
                </ListItem>
                <ListItem>
                  <Text>Destino</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.end_address}</Text>
                </ListItem>
                <ListItem>
                  <Text>Distância (em metros)</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.distance.text}</Text>
                </ListItem>
                <ListItem>
                  <Text>Duração (em minutos)</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.duration.text}</Text>
                </ListItem>
              </List>
            </CardBody>
          </Card>
        )}
      </BoxCreateItem>
      {originText?.length > 0 && destinationText?.length > 0 && (
        <Button
          bgColor="green.500"
          colorScheme="green"
          variant="contained"
          mt={1}
          mb={2}
          onClick={(e) => {
            e.preventDefault();
            fetchDirections();
          }}
        >
          Ver Rotas
        </Button>
      )}
      <Grid id="map" p={40} ref={mapContainerRef}></Grid>
    </>
  );
}; 
``` 
Este código representa um componente React chamado `CreateMapRouteForm`. Vamos entender o que cada parte do código faz:

1. **Imports de Módulos**:
   - O código começa importando vários módulos e componentes necessários, como `useCreateMapRoute` (provavelmente um hook personalizado), componentes de UI do Chakra UI, componentes para formulários, e outros.

2. **Ref do Container do Mapa**:
   - Uma referência (`mapContainerRef`) a um elemento `HTMLDivElement` é criada. Essa referência é usada para identificar onde o mapa será renderizado.

3. **Utilização do Hook Personalizado**:
   - A função `useCreateMapRoute` é chamada, passando a referência `mapContainerRef` como argumento. Isso inicializa o estado do componente com os valores e funções retornados por esse hook.

4. **Renderização do Formulário**:
   - O componente `BoxCreateItem` é renderizado, que provavelmente é um componente personalizado para criar um item em um formulário.
   - Vários campos do formulário são renderizados, como "Nome da rota", "Origem", "Destino" e uma caixa de seleção "Ativo". Cada campo está associado a uma propriedade no estado gerenciado pelo hook `useCreateMapRoute`.
   - Os campos de "Origem" e "Destino" possuem recursos de autocompletar (`autoCompleteProps`) que usam listas (`originListPlaces` e `destinationListPlaces`) de locais disponíveis e um espaço para inserir um novo local.
   - Há um botão para enviar o formulário.

5. **Exibição dos Dados de Direções**:
   - Se houver dados de direções disponíveis (`directionsData`), um `Card` é renderizado para exibir informações sobre a rota. Isso inclui detalhes como origem, destino, distância e duração.

6. **Botão "Ver Rotas"**:
   - Se ambos os campos de "Origem" e "Destino" tiverem algum texto inserido (ou seja, `originText` e `destinationText` têm comprimento maior que zero), um botão "Ver Rotas" é renderizado. Esse botão permite ao usuário buscar e exibir rotas com base nos locais de origem e destino especificados.

7. **Renderização do Mapa**:
   - Um elemento `Grid` com um ID de "map" é renderizado. Esse elemento é onde o mapa será exibido e é referenciado pelo `mapContainerRef`.

Em resumo, este componente representa um formulário para criar rotas e exibir informações sobre as rotas, incluindo detalhes de direções. Ele é conectado a um mapa que é renderizado em um contêiner específico. O usuário pode inserir locais de origem e destino, marcar a rota como ativa, e visualizar detalhes da rota antes de criá-la. Além disso, o botão "Ver Rotas" permite ao usuário buscar e exibir rotas com base nos locais de origem e destino selecionados.


## Iniciando o servidor Next.js
Agora, você pode iniciar o servidor Next.js com o seguinte comando:
```
npm run dev
```
Acesse o aplicativo em http://localhost:3000 e navegue até a página Rota para ver o mapa com a rota renderizada.

## Conclusão
Certamente, aqui está uma conclusão para o tutorial:

**Conclusão: Integrando o Google Maps com React e Criando Rotas de Forma Eficiente**

Neste tutorial, exploramos um exemplo de integração do Google Maps com o framework React para criar rotas de forma eficiente. Começamos por descrever as partes principais do código e as bibliotecas utilizadas, oferecendo uma compreensão detalhada de como cada componente e função funcionam.

Primeiro, discutimos a configuração de um mapa com o auxílio do pacote `@googlemaps/js-api-loader`. Em seguida, examinamos a criação de rotas usando o `RouteGoogle` e a forma como esse componente lida com marcadores e renderização de rotas.

Além disso, detalhamos as funções `convertDirectionsResponseToDirectionsResult` e as diversas funções auxiliares utilizadas para estilizar marcadores no mapa, tornando a interface mais atrativa.

Prosseguimos analisando o uso do hook `useLoadMap` para carregar o mapa, identificando a localização atual do usuário e fornecendo a estrutura necessária para adicionar rotas no mapa.

No último trecho de código, apresentamos a criação de um formulário interativo, onde os usuários podem inserir detalhes da rota, escolher pontos de origem e destino, marcar rotas como ativas e, finalmente, visualizar detalhes das rotas, como distância e duração.

Este tutorial ofereceu uma visão abrangente de como integrar o Google Maps com o React, permitindo que os desenvolvedores criem aplicativos de mapeamento interativos e eficientes. Esperamos que este guia tenha sido informativo e útil, fornecendo as ferramentas necessárias para construir aplicações que envolvam navegação, localização e criação de rotas. Com essas habilidades, você está pronto para criar aplicativos de mapeamento personalizados que atendam às necessidades específicas do seu projeto. Explore, crie e inove com o poder do mapeamento em suas mãos!
 




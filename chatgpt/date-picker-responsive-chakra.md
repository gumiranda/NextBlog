Como criar um datepicker responsivo usando chakra ui
Para criar um datepicker responsivo usando o Chakra UI, você pode seguir os seguintes passos:

Instale o pacote Chakra UI em seu projeto usando o comando npm install @chakra-ui/datepicker

Importe o componente DatePicker do pacote Chakra UI em seu arquivo de componente.

Adicione o componente DatePicker no seu componente renderizado.

Use a propriedade size para definir o tamanho do componente. Por exemplo, size="md"

Use a propriedade isDisabled para desativar o componente quando necessário.

Use a propriedade isReadOnly para tornar o componente somente leitura.

Use a propriedade onChange para gerenciar os eventos de mudança de data.

Exemplo:

Copy code
import { DatePicker } from "@chakra-ui/datepicker";

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      size="md"
      value={selectedDate}
      onChange={date => setSelectedDate(date)}
    />
  );
}
Você também pode personalizar o estilo do componente usando o componente "CSS" do Chakra UI.
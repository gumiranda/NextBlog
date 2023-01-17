Como implementar um cron usando fastify-cron que monitore alteraçoes de um campo status de uma collection request e notifique usuarios atraves de push notification usando one signal
Para implementar um cron usando fastify-cron que monitore alterações em um campo de status de uma coleção de solicitações e notificar usuários através de notificações push usando OneSignal, você pode seguir os seguintes passos:

Instale as dependências fastify-cron e mongodb.
Adicione o plugin fastify-cron ao seu projeto fastify.
Crie uma função que será chamada pelo cron para verificar se há alterações no campo de status da coleção de solicitações.
Utilize o MongoDB para buscar as solicitações com status alterado e armazene-as em uma variável.
Utilize a API do OneSignal para enviar notificações push para os usuários que fizeram as solicitações com status alterado.
Adicione a função criada no passo 3 ao fastify-cron para ser executada periodicamente.
Nota: Certifique-se de ter as credenciais corretas para acessar o banco de dados MongoDB e a sua conta OneSignal.





Mostra exemplo de codigo do topico 2 em diante
Aqui está um exemplo de como adicionar o plugin fastify-cron ao seu projeto fastify e criar uma função que será chamada pelo cron para verificar se há alterações no campo de status da coleção de solicitações:

Copy code
const fastify = require('fastify')()
const cron = require('fastify-cron')
const mongodb = require('mongodb')

// Adicionando o plugin fastify-cron ao projeto fastify
fastify.register(cron.plugin)

// Criando a função que será chamada pelo cron
async function checkRequests() {
  try {
    // Conectando-se ao banco de dados MongoDB
    const client = await mongodb.connect('mongodb://localhost:27017')
    const db = client.db('mydb')
    const requests = db.collection('requests')

    // Buscando as solicitações com status alterado
    const updatedRequests = await requests.find({ status: { $ne: 'pending' } }).toArray()

    // Fazendo algo com as solicitações com status alterado, como enviar notificações push
    console.log(updatedRequests)

    // Fechando a conexão com o banco de dados
    client.close()
  } catch (error) {
    console.error(error)
  }
}

// Adicionando a função checkRequests para ser executada a cada minuto
fastify.cron('* * * * *', checkRequests)

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
E aqui está um exemplo de como utilizar a API do OneSignal para enviar notificações push para os usuários que fizeram as solicitações com status alterado:

Copy code
const OneSignal = require('onesignal-node')

const myClient = new OneSignal.Client({
  userAuthKey: 'YOUR_USER_AUTH_KEY',
  app: { appAuthKey: 'YOUR_APP_AUTH_KEY', appId: 'YOUR_APP_ID' }
})

function sendPushNotification(updatedRequests) {
    let notification = new OneSignal.Notification({
    contents: {
        en: 'Your request status has been updated'
    }
  })
  notification.postBody["include_player_ids"] = updatedRequests.map(req => req.userId)
  myClient.sendNotification(notification, (err, httpResponse,data) => {
    if (err) {
        console.log('Something went wrong...');
    } else {
        console.log(data, httpResponse.statusCode);
    }
  });
}




E se eu nao usar cron pra monitorar essa collection, e sim o proprio mongodb pra monitorar alteraçoes
Se você não quiser usar o cron para monitorar alterações em uma coleção do MongoDB, você pode usar o recurso de "change streams" do MongoDB. Change streams permitem que você escute por alterações em uma coleção, incluindo inserções, atualizações e remoções, e reaja a essas alterações. Aqui está um exemplo de como escutar por alterações no campo de status de uma coleção de solicitações e enviar notificações push para os usuários que fizeram as solicitações com status alterado:

Copy code
const mongodb = require('mongodb')

// Conectando-se ao banco de dados MongoDB
const client = await mongodb.connect('mongodb://localhost:27017')
const db = client.db('mydb')
const requests = db.collection('requests')

// Criando o change stream
const stream = requests.watch([{ $match: { 'updateDescription.updatedFields.status': { $exists: true } } }])

// Escutando por alterações na coleção de solicitações
stream.on('change', (event) => {
    if (event.operationType === 'update') {
        sendPushNotification(event.fullDocument)
    }
});
Note que, essa implementação requer MongoDB v3.6+

Também, você pode querer adicionar uma condição de verificação para verificar se o status foi alterado para um status específico, para evitar notificar usuários desnecessariamente. Além disso, você também pode adicionar uma verificação para garantir que o change stream é fechado quando não é mais necessário.





Tem como criar um plugin do fastify disso
Sim, é possível criar um plugin do fastify para monitorar alterações em uma coleção do MongoDB usando change streams. Aqui está um exemplo de como criar um plugin que adiciona uma rota para escutar por alterações em uma coleção de solicitações e envia notificações push para os usuários que fizeram as solicitações com status alterado:

Copy code
const mongodb = require('mongodb')

async function monitorRequestsPlugin(fastify, options) {
    // Conectando-se ao banco de dados MongoDB
    const client = await mongodb.connect(options.url)
    const db = client.db(options.db)
    const requests = db.collection(options.collection)

    // Adicionando uma rota para escutar por alterações
    fastify.get('/monitor-requests', async (request, reply) => {
        // Criando o change stream
        const stream = requests.watch([{ $match: { 'updateDescription.updatedFields.status': { $exists: true } } }])
        // Escutando por alterações na coleção de solicitações
        stream.on('change', (event) => {
            if (event.operationType === 'update') {
                sendPushNotification(event.fullDocument)
            }
        });
        return { status: 'Monitoring requests' }
    })
}

function sendPushNotification(updatedRequests) {
    // codigo para enviar notificação push para o usuário
}

// Registrando o plugin
fastify.register(monitorRequestsPlugin, {
    url: 'mongodb://localhost:27017',
    db: 'mydb',
    collection: 'requests'
})
No exemplo acima, o plugin adiciona uma rota "/monitor-requests" que, quando chamada, cria um change stream para escutar por alterações na coleção de solicitações especificada nas opções do plugin. Os parâmetros de conexão com o banco de dados (url, db, collection) são passados como opções ao registrar o plugin.

Nota: Certifique-se de adicionar verificações para garantir que o change stream é fechado quando não é mais necessário.





Como fechar esse change stream 
Para fechar um change stream, você pode chamar o método close() na instância do change stream. Por exemplo:

Copy code
stream.close()
Aqui está um exemplo de como fechar um change stream quando uma condição específica é atendida:

Copy code
const condition = true

if (condition) {
    stream.close()
}
É importante fechar o change stream quando não é mais necessário para evitar vazamento de recursos e possíveis problemas de desempenho.

Você também pode fechar o change stream quando o evento "end" é emitido ou quando o evento "close" é emitido. Por exemplo:

Copy code
stream.on("end", function() {
    console.log("Change stream closed");
});

stream.on("close", function() {
    console.log("Change stream closed");
});
E para garantir que o change stream é fechado quando a rota é fechada, você pode adicionar um evento de "onClose" na rota.

Copy code
fastify.get('/monitor-requests', async (request, reply) => {
    // Criando o change stream
    const stream = requests.watch([{ $match: { 'updateDescription.updatedFields.status': { $exists: true } } }])
    request.server.onClose(() => {
        stream.close()
    });
    // Escutando por alterações na coleção de solicitações
    stream.on('change', (event) => {
        if (event.operationType === 'update') {
            sendPushNotification(event.fullDocument)
        }
    });
    return { status: 'Monitoring requests' }
})
Dessa forma, quando a rota é fechada, o change stream será fechado automaticamente.
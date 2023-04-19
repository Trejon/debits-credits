import { SchemaRegistry, SchemaType, avdlToAVSCAsync } from '@kafkajs/confluent-schema-registry'
import avro from 'avsc'
import { kafkaClient, schemaRegistry as registry } from '../services/kafka-client/index';
import path from 'path'

const accountsConsumer = kafkaClient.consumer({ groupId: 'accounts-api' })

const AccountRecord = avro.Type.forSchema({
  type: 'record',
  name: 'Account',
  fields: [
    {
      name: 'id',
      type: { type: 'string', name: 'AccountId' }
    },
    {
      name: 'name',
      type: { type: 'string', name: 'AccountName' }
    },
    {
      name: 'balance',
      type: { type: 'int', name: 'AccountBalance' }
    },
    {
      name: 'debit',
      type: { type: 'boolean', name: 'AccountDebit' }
    },
    {
      name: 'credit limit',
      type: { type: 'int', name: 'AccountCreditLimit' }
    },
    {
      name: 'bank',
      type: { type: 'enum', name: 'AccountBank', symbols: ['Chase', 'U.S. Bank', 'Bank of America', 'FirstBank', 'Capital One', 'Apple', 'Discover'] }
    },
    {
      name: 'user id',
      type: { type: 'string', name: 'AccountUserId' }
    },
    {
      name: 'updated at',
      type: { type: 'string', name: 'AccountUserId' }
    },
    {
      name: 'user id',
      type: { type: 'string', name: 'AccountUserId' }
    },
  ]
});

const buf = AccountRecord.toBuffer({ kind: 'CAT', name: 'Albert' }); // Encoded buffer.
const val = AccountRecord.fromBuffer(buf); // = {kind: 'CAT', name: 'Albert'}




export const getAllAccountsFromKafka = async () => {
  await accountsConsumer.connect()

  await accountsConsumer.subscribe({ topic: 'accounts-service' })

  await accountsConsumer.run({
    eachMessage: async ({ topic, partition, message }: any) => {
      const decodedMessage = {
        ...message,
        value: await registry.decode(message.value)
      }

      console.log(decodedMessage);
    },
  })

  await accountsConsumer.disconnect()
}

// const incomingTopic = 'accounts-api'

// export const run = async () => {
//   const schema = await avdlToAVSCAsync(path.join(__dirname, 'schema.avdl'))
//   const { id } = await registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(schema) })

//   await accountsConsumer.connect()

//   await accountsConsumer.subscribe({ topic: incomingTopic })

//   await accountsConsumer.run({
//     eachMessage: async ({ topic, partition, message }
//       : any) => {
//       const decodedMessage = {
//         ...message,
//         value: await registry.decode(message.value)
//       })

//       const outgoingMessage = {
//         key: message.key,
//         value: await registry.encode(id, decodedMessage.value)
//       }

//       await producer.send({
//         topic: outgoingTopic,
//         messages: [outgoingMessage]
//       })
//     },
//   })
// }

// run().catch(async e => {
//   console.log(e);
//   accountsConsumer && await accountsConsumer.disconnect()
//   process.exit(1)
// })


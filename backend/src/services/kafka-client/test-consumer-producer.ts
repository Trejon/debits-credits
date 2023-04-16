import path from 'path';
import { v4 as uuid } from 'uuid';
import { kafkaClient } from '.';
import { SchemaRegistry, SchemaType, avdlToAVSCAsync } from '@kafkajs/confluent-schema-registry'
import avro from 'avsc'

const registry = new SchemaRegistry({ host: 'http:/localhost:8085' })

const consumer = kafkaClient.consumer({ groupId: 'test-group' })
const producer = kafkaClient.producer()

const incomingTopic = 'incoming'
const outgoingTopic = 'outgoing'

// export const run = async () => {
//   const schema = await avdlToAVSCAsync(path.join(__dirname, 'schema.avdl'))
//   const { id } = await registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(schema) })

//   await consumer.connect()
//   await producer.connect()

//   await consumer.subscribe({ topic: incomingTopic })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }: any) => {
//       const decodedMessage = {
//         ...message,
//         value: await registry.decode(message.value)
//       }

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
//   console.error(e)
//   consumer && await consumer.disconnect()
//   producer && await producer.disconnect()
//   process.exit(1)
// })



// const registry = new SchemaRegistry({ host: 'http://localhost:8085' })


export const run1 = async () => {
  const type = avro.Type.forSchema({
    type: 'record',
    name: 'Pet',
    fields: [
      {
        name: 'kind',
        type: { type: 'enum', name: 'PetKind', symbols: ['CAT', 'DOG'] }
      },
      { name: 'name', type: 'string' }
    ]
  });
  const encodedValue = type.toBuffer({ kind: 'CAT', name: 'Albert' })
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: encodedValue }],
  })
  await producer.disconnect()

  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ message }: any) => {
      console.log(type.fromBuffer(message.value))
      // const decodedValue = type.toBuffer(message.value)
      // console.log(decodedValue)
    }
  })
}

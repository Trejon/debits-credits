import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
// import { KafkaClient } from '../index'

const registry = new SchemaRegistry({ host: 'http://localhost:8085' })

// const consumer = KafkaClient.consumer({ groupId: 'test-group' })

// const run = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }: any) => {
//       const decodedKey = await registry.decode(message.key)
//       const decodedValue = await registry.decode(message.value)
//       console.log({ decodedKey, decodedValue })
//     },
//   })
// }

// run().catch(console.error)









// import path from 'path'
// import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry'

// const registry = new SchemaRegistry({ host: 'http://localhost:8081' })

// // Upload a schema to the registry
// const schema = `
//   {
//     "type": "record",
//     "name": "RandomTest",
//     "namespace": "examples",
//     "fields": [{ "type": "string", "name": "fullName" }]
//   }
// `
// const { id } = await registry.register({
//   type: SchemaType.AVRO,
//   schema
// })

// // Encode using the uploaded schema
// const payload = { fullName: 'John Doe' }
// const encodedPayload = await registry.encode(id, payload)

// // Decode the payload
// const decodedPayload = await registry.decode(encodedPayload)
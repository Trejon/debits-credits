import { Kafka } from 'kafkajs'

export const kafkaClient = new Kafka({
  clientId: 'debits-credits-service',
  brokers: ['kafka-broker:29092', 'localhost:9092'],
  ssl: false,
});

export const kafkaAdmin = kafkaClient.admin();

// const producer = kafkaClient.producer();
// const consumer = kafkaClient.consumer({ groupId: 'test-group' });

// export async function produceAndConsumeMessage() {
//   await producer.connect();

//   await producer.send({
//     topic: 'my-topic',
//     messages: [{ value: 'Hello KafkaJS' }],
//   });

//   await consumer.connect();
//   await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }: any) => {
//       console.log({
//         value: message.value.toString(),
//       });
//     },
//   });

//   await producer.disconnect();
//   await consumer.disconnect();
// }

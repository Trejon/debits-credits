import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'debits-credits-service',
  brokers: ['localhost:9092'],
  sasl: undefined,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

export async function produceAndConsumeMessage() {
  await producer.connect();

  await producer.send({
    topic: 'my-topic',
    messages: [{ value: 'Hello KafkaJS' }],
  });

  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: any) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });

  await producer.disconnect();
  await consumer.disconnect();
}

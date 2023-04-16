import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
// import { KafkaClient } from '../index'
import avro from 'avsc'

const registry = new SchemaRegistry({ host: 'http://localhost:8085' })

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

const buf = type.toBuffer({ kind: 'CAT', name: 'Albert' }); // Encoded buffer.
const val = type.fromBuffer(buf); // = {kind: 'CAT', name: 'Albert'}

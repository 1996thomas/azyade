import { type SchemaTypeDefinition } from 'sanity'
import { photoType } from './photoTypes'
import { eventType } from './eventTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photoType, eventType],
}

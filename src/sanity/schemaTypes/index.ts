import { type SchemaTypeDefinition } from 'sanity'
import { photoType } from './photoTypes'
import { eventType } from './eventTypes'
import { settingType } from './settingsTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photoType, eventType, settingType],
}

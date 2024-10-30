import { defineField, defineType } from "sanity";

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      defineField({
        name: 'image',
        type: 'image',
        title:"Image",
      }),
    ],
  })
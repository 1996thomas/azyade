import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom du Tag",
      type: "string",
      validation: (rule) => rule.required().min(1).max(50),
    }),
  ],
});

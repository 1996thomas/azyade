import { defineField, defineType } from "sanity";

export const aboutTypes = defineType({
  name: "about",
  title: "About",
  type: "document",
  options: {
    //@ts-expect-error/singleton error
    singleton: true,
  },
  fields: [
    defineField({
      name: "profile_picture",
      title: "Photo de profil",
      type: "image",
      validation: (rule) => rule.required(),
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Bio",
      type: "array",
      validation: (rule) => rule.required(),
      of: [{ type: "block" }],
    }),
  ],
});

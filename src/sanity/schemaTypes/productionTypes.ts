import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const productionType = defineType({
  name: "production",
  title: "Production",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "production" }),
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required().min(5).max(50),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({
      name: "presentation",
      title: "Présentation",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "synopsis",
      title: "Synopsis",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "technical_list",
      title: "Liste technique",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "object",
      fields: [
        {
          name: "id",
          title: "video ID",
          type: "string",
          description:
            "Identifiant de la vidéo (par exemple, l'ID YouTube ou Vimeo)",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "provider",
          title: "Provider",
          type: "string",
          options: {
            list: [
              { title: "YouTube", value: "youtube" },
              { title: "Vimeo", value: "vimeo" },
            ],
            layout: "dropdown",
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});

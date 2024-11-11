import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const photoType = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "photo" }),
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
      name: "publishedAt",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "gallery",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      validation: (rule) => rule.max(3),
    }),
  ],
});

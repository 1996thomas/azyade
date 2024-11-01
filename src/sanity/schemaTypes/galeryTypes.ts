import { defineType, defineField } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  type: "object", // Utilisé comme type d'objet pour être réutilisable
  title: "Gallery",
  fields: [
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "display",
      type: "string",
      title: "Display as",
      description: "How should we display these images?",
      options: {
        list: [
          { title: "Stacked on top of each other", value: "stacked" },
          { title: "In-line", value: "inline" },
          { title: "Carousel", value: "carousel" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "zoom",
      type: "boolean",
      title: "Zoom enabled",
      description: "Should we enable zooming of images?",
    }),
  ],
});

import { defineType, defineField } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  type: "object", // Used as an object type for reusability
  title: "Gallery",
  fields: [
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          type: "image", // Directly using the image type
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
  ],
});

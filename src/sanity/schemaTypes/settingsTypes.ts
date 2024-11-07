import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const settingType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: PlayIcon,
  options: {
    //@ts-expect-error/singleton error
    singleton: true,
  },
  fields: [
    defineField({
      name: "site_title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "site_description",
      title: "Site Description",
      type: "string",
    }),
    defineField({
      name: "site_image",
      title: "Site Image",
      type: "image",
    }),
    defineField({
      name: "social_links",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "link",
              title: "Link",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "image",
              type: "image",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "site_title",
      media: "site_image",
    },
  },
});

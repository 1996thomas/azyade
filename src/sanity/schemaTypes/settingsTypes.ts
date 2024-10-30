import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const settingType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: PlayIcon,
  options: {
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
  ],
  preview: {
    select: {
      title: "site_title",
      media: "site_image",
    },
  },
});

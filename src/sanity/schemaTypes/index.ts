import { type SchemaTypeDefinition } from "sanity";
import { photoType } from "./photoTypes";
import { eventType } from "./eventTypes";
import { settingType } from "./settingsTypes";
import { galleryType } from "./galeryTypes";
import { tagType } from "./tagTypes";
import { productionType } from "./productionTypes";
import { aboutTypes } from "./aboutTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    photoType,
    eventType,
    settingType,
    galleryType,
    tagType,
    productionType,
    aboutTypes,
  ],
};

import { filteredDocumentListItems, singletonDocumentListItems } from "sanity-plugin-singleton-tools";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items(S.documentTypeListItems())
    .items([
      // Create a list item for each singleton document in your schema that links directly to a document view
      ...singletonDocumentListItems({ S, context }),
      // // Create a list item for a specific singleton
      // singletonDocumentListItem({
      //   S,
      //   context,
      //   // Schema type
      //   type: "settings",
      //   // Required for showing multiple singletons of the same schema type
      //   title: "My Singleton",
      //   // Required for showing multiple singletons of the same schema type
      //   id: "mySingleton",
      //   // Specify a custom icon
      //   icon: PlugIcon,
      // }),
      S.divider(),
      S.divider(),
      // Filter singleton documents out of the default S.documentTypeListItems() to prevent them from being rendered as lists or as duplicates
      ...filteredDocumentListItems({ S, context }),
    ]);

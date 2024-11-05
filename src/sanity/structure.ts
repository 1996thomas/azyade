import { PlugIcon } from "@sanity/icons";
import { filteredDocumentListItems, singletonDocumentListItem, singletonDocumentListItems } from "sanity-plugin-singleton-tools";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items(S.documentTypeListItems())
    .items([
      ...singletonDocumentListItems({ S, context }),
      S.divider(),
      ...filteredDocumentListItems({ S, context }),
    ]);

import {
  filteredDocumentListItems,
  singletonDocumentListItems,
} from "sanity-plugin-singleton-tools";
import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items(S.documentTypeListItems())
    .items([
      ...singletonDocumentListItems({ S, context }),
      S.divider(),
      ...filteredDocumentListItems({ S, context }),
      orderableDocumentListDeskItem({ type: "photo", S, context }),
      orderableDocumentListDeskItem({ type: "production", S, context }),
    ]);

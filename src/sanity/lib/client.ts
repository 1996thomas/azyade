import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
// });

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn:true
}
export default config
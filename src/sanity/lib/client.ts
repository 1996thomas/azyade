import { apiVersion, dataset, projectId } from "../env";

// const config = {
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn:true
// }
// export default config

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-10-01",
};

export default config;

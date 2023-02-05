import sanityClient from "@sanity/client";

export const client = sanityClient({
  // ProjectId can be found in the Sanity dashboard, click on the top right profile when you
  // visit the sanity studio link, then click on manage project, it will be listed there
  projectId: "qr53cb8m",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: false,
  // In the same page where projectId is, click on the API section, then click on 'Tokens'
  // Then click on 'Add API token', click on the 'editor' option and then name it 'development'
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

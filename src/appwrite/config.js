import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_ENDPOINT)
  .setProject(process.env.REACT_APP_PROJECT_ID);

const databases = new Databases(client);

export { client, databases };

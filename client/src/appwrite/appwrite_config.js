import { Client, Account, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('649a8f11c8798fa07096');

export const Appwrite = {
    account: new Account(client),
    ID
    // database: new Databases(client, '649a8cf0b24fd21c8e45')
}
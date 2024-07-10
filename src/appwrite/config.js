import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

export const appwriteConfig = {
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url:import.meta.env.VITE_APPWRITE_ENDPOINT,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
    commentsCollectionId: import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    subreaditsCollectionId: import.meta.env.VITE_APPWRITE_SUBREADIT_COLLECTION_ID
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
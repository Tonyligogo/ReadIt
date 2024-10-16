import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
export async function createUserAccount(user){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username
        )
        if(!newAccount) throw Error;
        console.log(newAccount,'newAccount');
        const avatarUrl = avatars.getInitials(user.username)
        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            email:newAccount.email,
            username:newAccount.name,
            imageUrl:avatarUrl 
        })
        return newUser;
    } catch (error) {
        console.log(error)
        return error;
    }

}
export async function saveUserToDB(user){
    console.log(user,'user I want')
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user,
        );
        return newUser;
    } catch (error) {
       console.log(error,'ERROR from saveuser to database'); 
    }
}
export async function signInAccount(user) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error, 'error in signinAccount');
        return error;
    }
}
export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error, 'error from getcurrectuser');
        return error;
    }
}
export async function signOutAccount() {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error, 'error in signoutAccount');
        return error;
    }
}
export async function createSubreadit(data) {
    try {
        const newDocument = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.subreaditsCollectionId,
            ID.unique(),
            data,
        );
        return newDocument;
    } catch (error) {
        console.log(error, 'error in create subreadit function');
        return error;
    }
  }
export async function createPost(post) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        ID.unique(),
        {
          user: post.user,
          title: post.title,
          content:post.content,
          subreadit: post.subreadit,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error,'error creating new post');
    }
  }
  export async function sendComment(comment){
    try {
      const newComment = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.commentsCollectionId,
        ID.unique(),
        {
          user:comment.user,
          post:comment.post,
          content:comment.content,
        },
      );
      return newComment;
    } catch (error) {
      console.log(error,'error in send comment');
    }
  }
  // UPLOAD FILE
  export async function uploadFile(file) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
  
      return uploadedFile;
    } catch (error) {
      console.log(error,'error while uploading image file');
    }
  }
  //GET FILE URL
  export function getFilePreview(fileId) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error,'error in get file preview');
    }
  }
  //DELETE FILE
export async function deleteFile(fileId) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error,'error deleting file');
    }
  }
  //  GET POSTS 
export async function getRecentPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(20)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error,'error getting posts');
    }
  }
export async function getSubreadits() {
    try {
      const subs = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.subreaditsCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(20)]
      );
  
      if (!subs) throw Error;
  
      return subs;
    } catch (error) {
      console.log(error,'error getting subs');
    }
  }
export async function getSubreaditById(subId) {
  if (!subId) throw new Error('SubId is required');
  else{  
    try {
      const sub = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subreaditsCollectionId,
        subId
      );
      if (!sub) throw new Error('No subreadit found with that id');
      return sub;
    } catch (error) {
      console.log(error,'error getting sub');
    }
  }
}
export async function likePost(data){
  console.log(data,'data')
  const {postId, newLikes} = data;
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: newLikes,
      }
    )
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error,'error when liking post')
  }
}
export async function getPostById(postId) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error,'error fetching single post');
  }
}
// UPDATE POST
export async function updatePost(post) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        content: post.content,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
// DELETE POST
export async function deletePost(postId, imageId) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}
//GET USER'S POST
export async function getUserPosts(userId) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal("user", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error,'error in get user posts');
  }
}
export async function getInfinitePosts({pageParam}){
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function searchPosts(searchTerm) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("title", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

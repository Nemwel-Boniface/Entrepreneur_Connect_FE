import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import postImg1 from '../../images/aboutus/businesspeople.jpeg'
import postImg2 from '../../images/aboutus/businesspeoplepose.jpeg'

const createPostURL = "http://127.0.0.1:8000/api/posts/post/"

const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('authToken'), // Assuming you have the token stored in localStorage
};

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
}

// Generating random custom details for the created posts
const currentImages = [postImg1, postImg2];
const currentNames = ["Jane Doe", "Michael Scoffield", "Arnold Martin"];
let currentImageRef = Math.floor(Math.random() * 2);
let currentNameRef = Math.floor(Math.random() * 3);
// Update the posts id based on the currents posts length
let postsLength = initialState.posts.length;

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/posts/posts/');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
});

export const createPost = createAsyncThunk('posts/postPosts', async (post) => {
  try {
    let formData = {
      image: post.image,
      body: post.postBody,
      taglist: post.tags,
    }
    const response = await fetch(createPostURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to add Post');
    }
 
    fetchPosts()
    const addedPost = await response.json();
    return addedPost;
  } catch (err) {
    return `Failed to fetch post: ${err.message}`;
  }
});


export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const deleteUrl = "URL/postID";
  try {
    const response = await axios.delete(deleteUrl, {
      id
    })
    return response.data;
  } catch (error) {
    throw new Error("Cannot delete post")
  }
})

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const { id, authorName, createdDate, postBody, image, postLikesCount, postCommentsCount, taglist } = action.payload;
      const postObject = {
        id: ++postsLength,
        authorName: currentNames[currentNameRef],
        postBody,
        image,
        postLikesCount,
        postCommentsCount,
        createdDate,
        taglist: tags,
      }
      return {
        ...state,
        posts: [...state.posts, postObject]
      }
    },
    removePost: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== id)
      }
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });

      return {
        ...state,
        posts: updatedPosts,
      };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPosts.pending, (state) => {
      state.status = "Loading..";
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = "Failed";
      state.error = action.error.message;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "Successful";
      state.posts = action.payload;
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.status = "Succesfully deleted post";
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    })
    .addCase(deletePost.rejected, (state, action) => {
      state.status = "Failed";
      state.error = action.error.message;
    })
  }
})

export const { addPost, removePost, updatePost } = postSlice.actions
export default postSlice.reducer
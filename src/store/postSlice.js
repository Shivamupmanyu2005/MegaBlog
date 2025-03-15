import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    posts: [{
        id: "placeholder-id",
      content: "This is the content of the first blog post.",
      userId: 101

    }],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action) => {
            const createPost = {
                id: action.payload.id,
                content: action.payload.content,
                userId: action.payload.userId||nanoid()
            }

            state.posts.push(post)
        },

        deletePost : (state,action) => {
                state.posts = state.posts.filter(post => post.id != action.payload);
                
            
        },
        updatePost : (state, action) => {
           const{id,content} = action.payload;
           const post = state.posts.find(post=> post.id == id);
           if(post){
            post.content = content;
           }
        }
    }

})

export const{createPost, deletePost, updatePost} = postSlice.actions;

export default postSlice.reducer;
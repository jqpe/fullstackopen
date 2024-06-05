import { createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(({ id }) => id !== action.payload)
    },
    setBlog(state, action) {
      const blog = state.findIndex(({ id }) => id === action.payload.id)
      state[blog] = action.payload
    },
  },
})

const { appendBlog, setBlog, setBlogs, removeBlog } = blogsSlice.actions

/**
 * @returns true if the creation was successful or false if it failed
 */
export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addBlog(blog)
      dispatch(appendBlog(response.data))

      dispatch(
        showNotification({
          message: `A new blog ${blog.title} by ${blog.author} added`,
          variant: 'success',
        }),
      )

      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error.response.data.error,
            variant: 'error',
          }),
        )
      }

      return false
    }
  }
}

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog, token)
      dispatch(removeBlog(blog.id))

      dispatch(
        showNotification({
          message: `removed ${blog.title}`,
          variant: 'success',
        }),
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error.response.data.error,
            variant: 'error',
          }),
        )
      }
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(blog)
      dispatch(setBlog(response.data))
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showNotification({
            message: error.response.data.error,
            variant: 'error',
          }),
        )
      }
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch {
      dispatch(
        showNotification({
          message: 'could not get posts',
          variant: 'error',
        }),
      )
    }
  }
}

export default blogsSlice.reducer

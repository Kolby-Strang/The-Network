import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
    async getPosts(url) {
        let res
        if (url) {
            res = await api.get(url)
        } else {
            res = await api.get('api/posts')
        }
        logger.log("[POSTS SERVICE] Got Posts", res.data)
        AppState.posts = res.data.posts.map(pojo => new Post(pojo))
        AppState.page.older = res.data.older
        AppState.page.newer = res.data.newer
    }
    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)
    }
    async updatePost(postData) {
        const targetIndex = AppState.posts.findIndex(post => post.id == postData.id)
        if (targetIndex == -1) {
            throw new Error(`Error updating post, invalid Post Id: ${postData.id}`)
        }
        const res = await api.put(`api/posts/${postData.id}`, postData)
        logger.log('Updated Post', res.data)
        const newPost = new Post(res.data)
        AppState.posts[targetIndex] = newPost
    }
    async destroyPost(postId) {
        const targetIndex = AppState.posts.findIndex(post => post.id == postId)
        if (targetIndex == -1) {
            throw new Error(`Error updating post, invalid Post Id: ${postId}`)
        }
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('Deleted Post', res.data)
        AppState.posts.splice(targetIndex, 1)
    }
    async getPostsByQuery(searchInput) {
        const res = await api.get(`/api/posts?query=${searchInput}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(pojo => new Post(pojo))
        logger.log(AppState.posts)
    }
}

export const postsService = new PostsService()
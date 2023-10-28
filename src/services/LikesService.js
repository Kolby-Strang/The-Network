import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class LikesService {
    async handleLike(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log(res.data)
        const newPost = new Post(res.data)
        const postIndex = AppState.posts.findIndex(post => post.id == postId)
        if (postIndex == -1) {
            throw new Error('Something went wrong :(')
        }
        AppState.posts[postIndex] = newPost
    }
}

export const likesService = new LikesService()
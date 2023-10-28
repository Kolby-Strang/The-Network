import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
    async getProfileById(profileId) {
        const res = await api.get(`api/profiles/${profileId}`)
        const newProfile = new Profile(res.data)
        logger.log('GOT PROFILE', newProfile)
        return newProfile
    }
    async getPostsByProfileId(profileId) {
        const res = await api.get(`api/profiles/${profileId}/posts`)
        const newPosts = res.data.posts.map(pojo => new Post(pojo))
        AppState.posts = newPosts
        AppState.page.newer = res.data.newer
        AppState.page.older = res.data.older
    }
}

export const profilesService = new ProfilesService()
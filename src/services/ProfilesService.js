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
}

export const profilesService = new ProfilesService()
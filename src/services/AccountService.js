import { applyStyles } from '@popperjs/core'
import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Post } from '../models/Post'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async editAccount(accountData) {
    const res = await api.put('account', accountData)
    AppState.account = new Account(res.data)
  }
  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    const newProfile = new Account(res.data)
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
  async getProfilesByQuery(searchInput) {
    const res = await api.get(`/api/profiles?query=${searchInput}`)
    logger.log(res.data)
    return res.data.map(pojo => new Account(pojo))
  }
}

export const accountService = new AccountService()

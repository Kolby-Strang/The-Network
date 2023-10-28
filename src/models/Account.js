export class Account {
  constructor(data) {
    // ID
    this.id = data.id
    // Data
    this.name = data.name
    this.class = data.class
    this.bio = data.bio
    // Images
    this.picture = data.picture
    this.coverImg = data.coverImg
    // Dates
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    // Links
    this.email = data.email
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    // Booleans
    this.graduated = data.graduated
  }
}

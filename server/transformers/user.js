export const userTransformer = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.image,
    handle: '@' + user.email.substring(0, user.email.indexOf('@')),
  }
}

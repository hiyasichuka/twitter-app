import { prisma } from '.'

export const getUserById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

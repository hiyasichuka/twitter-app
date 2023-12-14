import { Prisma } from '@prisma/client'
import { prisma } from '.'

export const createTweet = (tweetData: Prisma.TweetCreateInput) => {
  return prisma.tweet.create({
    data: tweetData,
  })
}

export const getTweets = (params = {}) => {
  return prisma.tweet.findMany({
    ...params,
  })
}

export const getTweetById = (tweetId: string, params = {}) => {
  return prisma.tweet.findUnique({
    ...params,
    where: {
      id: tweetId,
    },
  })
}

// eslint-disable-next-line import/no-named-as-default
import formidable from 'formidable'
import { createTweet } from '../../../db/tweets'
import { createMediaFile } from '../../../db/mediaFiles.js'
import { tweetTransformer } from '~~/server/transformers/tweet.js'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  const data = await readMultipartFormData(event)

  // const form = formidable({})
  // const response = await new Promise((resolve, reject) => {
  //   form.parse(event, (err, fields, files) => {
  //     if (err) {
  //       reject(err)
  //     }
  //     resolve({ fields, files })
  //   })
  // })

  // const { fields, files } = response

  const tweetData = {
    text: data.find((item) => item.name === 'text').data.toString(),
    authorId: session.userId,
  }

  const replyTo = data.find((item) => item.name === 'replyTo').data.toString()

  if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
    tweetData.replyToId = replyTo
  }

  const tweet = await createTweet(tweetData)

  // const filePromises = Object.keys(files).map(async (key) => {
  //   const file = files[key]
  //   const cloudinaryResource = await uploadToCloudinary(file.filepath)
  //   return createMediaFile({
  //     url: cloudinaryResource.secure_url,
  //     providerPublicId: cloudinaryResource.public_id,
  //     userId,
  //     tweetId: tweet.id,
  //   })
  // })

  // await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet),
  }
})

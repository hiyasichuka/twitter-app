import AzureADProvider from 'next-auth/providers/azure-ad'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()

// async function refreshAccessToken(accessToken: JWT) {
//   try {
//     const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`
//     const req = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body:
//         `grant_type=refresh_token` +
//         `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET}` +
//         `&refresh_token=${accessToken.refreshToken}` +
//         `&client_id=${process.env.AZURE_AD_CLIENT_ID}`,
//     })
//     const res = await req.json()
//     return {
//       ...accessToken,
//       accessToken: res.access_token,
//       accessTokenExpires: Date.now() + res.expires_in * 1000,
//       refreshToken: res.refresh_token ?? accessToken.refreshToken, // Fall back to old refresh token
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       ...accessToken,
//       error: 'RefreshAccessTokenError',
//     }
//   }
// }

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    AzureADProvider.default({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    session({ session, user }) {
      session.userId = user.id

      return session
    },
  },
  // callbacks: {
  //   jwt({ token, account, profile }) {
  //     // Persist the access_token in the encrypted JWT.
  //     if (account && profile) {
  //       token.accessToken = account.access_token
  //       token.accessTokenExpires = account.expires_at * 1000
  //       token.refreshToken = account.refresh_token
  //     }
  //     if (Date.now() < token.accessTokenExpires) {
  //       return token
  //     }
  //     return refreshAccessToken(token)
  //   },
  // },
})

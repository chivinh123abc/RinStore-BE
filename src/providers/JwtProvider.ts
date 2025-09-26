import jwt, { SignOptions } from 'jsonwebtoken'
import type { StringValue } from "ms"
import { user } from '../users/user.model.js'

const generateTokens = async (userInfo: user, secretSignature: string, tokenLife: StringValue | number): Promise<string> => {
  try {

    const generateUser = {
      user_id: userInfo.user_id,
      email: userInfo.email
    }

    const options: SignOptions = {
      algorithm: 'HS256',
      expiresIn: tokenLife
    }

    return jwt.sign(generateUser, secretSignature, options)
  } catch (error) {
    throw new Error("Generate Token Failed")
  }
}

const verifyTokens = async (token: string, secretSignature: string) => {
  try {
    jwt.verify(token, secretSignature)
  } catch (error) {
    throw new Error("Verify Token Failed")
  }
}

export const JwtProvider = {
  generateTokens,
  verifyTokens
}

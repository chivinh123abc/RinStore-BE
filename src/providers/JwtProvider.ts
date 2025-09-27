import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import type { StringValue } from 'ms'
import { user } from '../types/user.js'

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
    throw error
  }
}

const verifyTokens = async (token: string, secretSignature: string): Promise<JwtPayload> => {
  try {
    return jwt.verify(token, secretSignature) as JwtPayload
  } catch (error) {
    throw error
  }
}

export const JwtProvider = {
  generateTokens,
  verifyTokens
}

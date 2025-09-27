import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { v7 as uuidv7 } from 'uuid'
import { env } from '../configs/environment.js'
import { JwtProvider } from '../providers/JwtProvider.js'
import { user } from '../types/user.js'
import ApiError from '../utils/ApiError.js'
import { userModel } from './user.model.js'

const createNew = async (reqBody: user) => {
  try {
    if (!reqBody.email || !reqBody.password || !reqBody.username) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email and password are required')
    }
    const existUser = await userModel.findUserByEmail(reqBody.email)

    if (existUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exist')
    }
    //tao data de luu vao data base;
    const newUser = {
      username: reqBody.username,
      email: reqBody.email,
      phone_number: reqBody.phone_number,
      avatar: reqBody.avatar,
      password: bcrypt.hashSync(reqBody.password, 8),
      verify_token: uuidv7()
    }

    const createdUser = await userModel.create(newUser)

    return createdUser

  } catch (error) {
    throw error
  }
}

const getUser = async (reqBody: { user_id: number }) => {
  try {
    const userData = await userModel.findUserById(reqBody.user_id)

    if (!userData) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User is not exist')
    }

    return userData
  } catch (error) {
    throw (error)
  }

}

const update = async (user_id: number, reqBody: user) => {

  try {
    const existUser = userModel.findUserById(user_id)

    if (!existUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User is not exist')
    }

    const updateData = {
      username: reqBody.username,
      email: reqBody.email,
      phone_number: reqBody.phone_number,
      avatar: reqBody.avatar
    }

    const updatedUser = await userModel.update(user_id, updateData)

    return updatedUser
  } catch (error) {
    throw (error)
  }
}

const softDelete = async (user_id: number) => {
  try {
    const existUser = await userModel.findUserById(user_id)
    if (!existUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User is not exist')
    }

    const deletedUser = await userModel.softDelete(user_id)
    return deletedUser
  } catch (error) {
    throw (error)
  }
}

const login = async (email: string, password: string) => {

  try {
    const existUser = await userModel.findUserByEmail(email)

    if (!existUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User is not exist')
    }
    if (!existUser.is_active) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Account is not active')
    }

    const currentPassword = existUser.password as string

    if (!bcrypt.compareSync(password, currentPassword)) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Password is not correct')
    }

    const accessToken = await JwtProvider.generateTokens(existUser, env.ACCESS_TOKEN_SECRET_SIGNATURE, env.ACCESS_TOKEN_LIFE)
    const refreshToken = await JwtProvider.generateTokens(existUser, env.REFRESH_TOKEN_SECRET_SIGNATURE, env.REFRESH_TOKEN_LIFE)

    return { accessToken, refreshToken, ...existUser }
  } catch (error) {
    throw (error)
  }
}

const verifyAccount = async (reqBody: user) => {
  try {
    if (!reqBody.email) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email are required')
    }

    const existUser = await userModel.findUserByEmail(reqBody.email)
    if (!existUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not exist')
    }
    if (existUser.is_active) {
      throw new ApiError(StatusCodes.CONFLICT, 'User has been activated')
    }

    if (reqBody.verify_token !== existUser.verify_token) {
      throw new ApiError(StatusCodes.CONFLICT, 'Verify Failed')
    }

    const verifiedData = {
      verify_token: null,
      is_active: true
    }

    const existUserId = existUser.user_id as number

    const updatedData = await userModel.update(existUserId, verifiedData)

    return updatedData
  } catch (error) {
    throw error
  }
}

const refreshToken = async (clientRefreshToken: string) => {
  try {
    const refreshTokenDecoded = await JwtProvider.verifyTokens(
      clientRefreshToken,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    )

    const userInfo = {
      user_id: refreshTokenDecoded.user_id as number,
      email: refreshTokenDecoded.email as string
    }

    const accessToken = await JwtProvider.generateTokens(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    return { accessToken }
  } catch (error) {
    throw (error)
  }
}

export const userService = {
  createNew,
  getUser,
  update,
  softDelete,
  login,
  refreshToken,
  verifyAccount
}

import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import ApiError from '../../utils/ApiError.js'
import { UserLoginDto } from '../types/user.js'
import { userService } from './user.service.js'

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdUser = await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user_id = req.jwtDecoded?.user_id

    const userInfo = await userService.getUser({ user_id: user_id })

    res.status(StatusCodes.ACCEPTED).json(userInfo)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = req.jwtDecoded?.user_id
    const updateData = req.body
    const updatedInfo = await userService.update(user_id, updateData)
    res.status(StatusCodes.ACCEPTED).json(updatedInfo)
  } catch (error) {
    next(error)
  }
}

const softDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = req.jwtDecoded?.user_id

    if (isNaN(user_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' })
    }

    const deletedUser = await userService.softDelete(user_id)
    res.status(StatusCodes.ACCEPTED).json(deletedUser)

  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqBody: UserLoginDto = req.body
    const loginedUser = await userService.login(reqBody)

    res.cookie('accessToken', loginedUser.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', loginedUser.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json(loginedUser)
  } catch (error) {
    next(error)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    res.status(StatusCodes.OK).json({ loggedout: true })
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await userService.refreshToken(req.cookies?.refreshToken)

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(new ApiError(StatusCodes.FORBIDDEN, 'Please Sign In! (Error from refresh token)'))
  }
}

const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.verifyAccount(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createNew,
  getUser,
  update,
  softDelete,
  login,
  refreshToken,
  logout,
  verifyAccount
}

import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service.js'
import ms from 'ms'

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
    const user_id = Number(req.params.user_id) // chuyển string → number

    if (isNaN(user_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' })
    }

    const userInfo = await userService.getUser({ user_id: user_id })

    res.status(StatusCodes.ACCEPTED).json(userInfo)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = Number(req.params.user_id)
    const updateData = req.body

    if (isNaN(user_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' })
    }

    const updatedInfo = await userService.update(user_id, updateData)
    res.status(StatusCodes.ACCEPTED).json(updatedInfo)
  } catch (error) {
    next(error)
  }
}

const softDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = Number(req.params.user_id)

    if (isNaN(user_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' })
    }

    const deletedUser = await userService.softDelete(user_id)
    console.log(deletedUser)
    res.status(StatusCodes.ACCEPTED).json(deletedUser)

  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const loginedUser = await userService.login(email, password)

  res.cookie('accessToken', loginedUser.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ms('14 days')
  })

  res.cookie('refreshToken', loginedUser.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ms('14 days')
  })

  res.status(StatusCodes.OK).json(loginedUser)
}

export const userController = {
  createNew,
  getUser,
  update,
  softDelete,
  login
}
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { userService } from 'src/services/userService'


interface createUser {
  user_name: string,
  user_email: string
}

const createNew = async (req: Request, res: Response) => {
  try {
    const createdUser = await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    throw (error)
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id) // chuyển string → number

    if (isNaN(user_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' })
    }

    const userInfo = await userService.getUser({ "user_id": user_id })

    res.status(StatusCodes.ACCEPTED).json(userInfo)
  } catch (error) {
    throw (error)
  }
}

export const userController = {
  createNew,
  getUser
}
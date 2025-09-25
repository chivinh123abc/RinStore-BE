import { userModel } from './user.model.js'

interface userNoId {
  user_name: string,
  user_email: string
}

interface userNoId_noStrict {
  user_name?: string,
  user_email?: string
}

const createNew = async (reqBody: userNoId) => {
  const newUser = await userModel.create(reqBody.user_name, reqBody.user_email)
  return newUser
}

const getUser = async (reqBody: { user_id: number }) => {
  const userData = await userModel.findUserId(reqBody.user_id)
  return userData
}

const update = async (user_id: number, reqBody: userNoId_noStrict) => {

  const updateData: userNoId_noStrict = {
    ...(reqBody.user_name !== undefined && { user_name: reqBody.user_name }),
    ...(reqBody.user_email !== undefined && { user_email: reqBody.user_email })
  }

  const userUpdated = await userModel.update(user_id, updateData)

  return userUpdated
}

export const userService = {
  createNew,
  getUser,
  update
}

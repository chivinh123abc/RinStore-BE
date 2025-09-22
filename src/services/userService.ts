import { userModel } from 'src/models/userModel'

interface createUser {
  user_name: string,
  user_email: string
}

interface user {
  user_id: number,
  user_name: string,
  user_email: string
}

const createNew = async (reqBody: createUser) => {
  const newUser = await userModel.create({
    user_name: reqBody.user_name,
    user_email: reqBody.user_email
  })
  console.log("service: ", newUser)
  return newUser
}

const getUser = async (reqBody: { user_id: number }) => {
  const userData = await userModel.findUserId(reqBody.user_id)
  return userData
}

export const userService = {
  createNew,
  getUser
}

import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      jwtDecoded?: JwtPayload
    }
  }
}

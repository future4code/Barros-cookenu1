import * as jwt from "jsonwebtoken";
import { Unauthorized } from "../customError/UserCustomError";
import { AuthenticationToken } from "../model/UserModel";

export class TokenGenerator {
  private jwtKey = process.env.JWT_KEY as string;

  public generateToken = ({id,role}:AuthenticationToken):string => {
    const token = jwt.sign(
      { id:id, 
        role:role
      },
        this.jwtKey,
      { expiresIn:"1h" }
    )
   return token
  };

  getTokenData = (token:string):AuthenticationToken => {
    try{
      const payload = jwt.verify(
        token, 
        this.jwtKey
      ) as jwt.JwtPayload;
      return {id:payload.id, role:payload.role}
    }catch(error:any){
      throw new Unauthorized()  
    };
  }; 
};
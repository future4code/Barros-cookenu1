import { LoginInputDTO, TUser, UserInputDTO, UserProfileOutput, USER_TYPE } from "../model/UserModel";
import * as UserError from "../customError/UserCustomError";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness {
  private userDatabase = new UserDatabase();
  private tokenGenerator = new TokenGenerator();

  public createUser = async (input:UserInputDTO):Promise<string> => {
    try{
      const {name, email, role, password} = input;
      
      if(!name || !email || !role || !password){
        throw new UserError.InvalidUserBody()
      } else if(role !== USER_TYPE.NORMAL &&  role !== USER_TYPE.ADMIN){
        throw new UserError.InvalidUserRole()
      } else if(typeof(password) !== "string"){
        throw new UserError.UserCustomError(409,"Por favor digite a senha em formato de string")
      } else if(password.length < 6){
        throw new UserError.InvalidPassword()
      };
      if(!email.includes("@")) {
        throw new UserError.InvalidEmail();
      }

      const findUser = await this.userDatabase.getUserByEmail(email);
      if(findUser && findUser !== undefined){
        if(findUser.name === name && findUser.email === email){
          throw new UserError.UserAlreadyCadasted()
        }else if(findUser.email === email){
          throw new UserError.EmailAlreadyCadasted()
        }
      };

      const id = IdGenerator.generateId();
      const newUser:TUser = {
        id: id,
        name: name,
        role: role, 
        email: email, 
        password: password
      };
      await this.userDatabase.createUser(newUser)
      const token = this.tokenGenerator.generateToken({id:id,role:role})

      return token
    }catch(error:any){
      throw new UserError.UserCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //

  public login = async (input:LoginInputDTO):Promise<string> => {
    try{
      if(!input.email || !input.password){
        throw new UserError.InvalidInputLogin()
      }else if(!input.email.includes("@")){
        throw new UserError.InvalidEmail();
      };
      
      const user:TUser = await this.userDatabase.getUserByEmail(input.email);
      if(!user){
        throw new UserError.UserNotFound()
      }else if(user.email === input.email && user.password !== input.password){
        throw new UserError.InvalidInputPassword()
      }
      const token = this.tokenGenerator.generateToken({id:user.id,role:user.role})

      return token
    }catch(error:any){
      throw new UserError.UserCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //

  public getProfile = async (token:string):Promise<UserProfileOutput> => {
    try{
      if(!token){
        throw new UserError.Unauthorized()
      };
      
      const tokenData = this.tokenGenerator.getTokenData(token)
      const user:TUser = await this.userDatabase.getUserById(tokenData.id);
      if(!user){
        throw new UserError.UserNotFound()
      };
      
      const profile:UserProfileOutput = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      return profile;
    }catch(error:any){
      throw new UserError.UserCustomError(error.statusCode, error.message);
    };
  }
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //

  public getAllUsers = async ():Promise<TUser[]> => {
    try{
      const users = await this.userDatabase.getAllUsers()
      return users;
    }catch(error:any){
      throw new UserError.UserCustomError(error.statusCode, error.message);
    };
  }
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //

};
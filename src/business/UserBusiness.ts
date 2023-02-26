import { followUserInputDTO, GetUserInfoById, IdentifiersUsersInput, LoginInputDTO, TUser, UserInputDTO, UserProfileOutput, USER_TYPE } from "../model/UserModel";
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
        throw new UserError.UserCustomError(422,"Preencha o authorization com um token!")
      };
      
      const tokenData = this.tokenGenerator.getTokenData(token)
      if(!tokenData){
        throw new UserError.Unauthorized()
      }
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

  public followUser = async (input:followUserInputDTO):Promise<void> => {
    try{
      const {token,  followId } = input
      if(!token || !followId){
        throw new UserError.UserCustomError(422,"Preencha os campos 'followId' e o Authorization com o token!")
      };

      const getUserIdByToken:string = this.tokenGenerator.getTokenData(token).id;
      const findUser = await this.userDatabase.getUserById(followId);
      if(!getUserIdByToken){
        throw new UserError.Unauthorized()
      } else if(!findUser){
        throw new UserError.UserCustomError(404,"ID de usuário que deseja seguir não existe!")
      };

      const identifiersUsers:IdentifiersUsersInput = {
        id: IdGenerator.generateId(),
        fk_user_follower: getUserIdByToken,
        fk_following_user: followId
      };
      
      await this.userDatabase.followUser(identifiersUsers)
    }catch(error:any){
      throw new UserError.UserCustomError(error.statusCode, error.message);
    };
  };

  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getUserById = async (input: GetUserInfoById):Promise<UserProfileOutput> => {
    try{
      if(!input.token || !input.userId){
        throw new UserError.UserCustomError(422,"Infome o 'userId' no params e o token de autenticação no headers")
      };
      if(input.userId === ":id"){
        throw new UserError.UserCustomError(422,"Informe o id do usuário")
      };

      const tokenData = this.tokenGenerator.getTokenData(input.token)
      if(!tokenData){
        throw new UserError.Unauthorized()
      };

      const user:TUser = await this.userDatabase.getUserById(input.userId);
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
};
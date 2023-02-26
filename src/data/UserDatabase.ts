import { UserCustomError } from "../customError/UserCustomError";
import { IdentifiersUsersInput, TUser} from "../model/UserModel";
import { BaseDatabase } from "./BaseDatabase";
import { TablesNames } from "./TablesName";


export class UserDatabase extends BaseDatabase{

  public createUser = async (input:TUser):Promise<void> => {
    try{

      await UserDatabase.connection.insert(input).into(TablesNames.Table_user);

    }catch(error:any){
      throw new UserCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getUserByEmail = async (email:string):Promise<TUser> => {
    try{
      const user = await UserDatabase.connection(TablesNames.Table_user).select().where("email",email)
      return user[0]
    }catch(error:any){
      throw new UserCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getUserById = async (id:string):Promise<TUser> => {
    try{
      const user = await UserDatabase.connection(TablesNames.Table_user).select().where("id",id)
      return user[0]

    }catch(error:any){
      throw new UserCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getAllUsers = async ():Promise<TUser[]> => {
    try{
      const users = await UserDatabase.connection(TablesNames.Table_user).select()
      return users
    }catch(error:any){
      throw new UserCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public followUser = async (input:IdentifiersUsersInput):Promise<void> => {
    try{
      await UserDatabase.connection(TablesNames.Table_following).insert(input)

    }catch(error:any){
      throw new UserCustomError(error.statusCode, error.message);
    };
  };

}
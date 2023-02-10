import { CustomError } from "../customError/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{

  public crateUser = async ():Promise<void> => {
    try{
     

    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public login = async (email:string) => {
    try{
     

    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getUserById = async (id:string) => {
    try{
     

    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    };
  }; 
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
}
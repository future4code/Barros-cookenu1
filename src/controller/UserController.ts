import { UserBusiness } from "../business/UserBusiness"
import { Request, Response } from "express";
import { LoginInputDTO, UserInputDTO, UserProfileOutput, TUser } from "../model/UserModel";


export class UserController{
  private userBusiness = new UserBusiness()

  public createUser = async (req:Request, res:Response):Promise<void> => {
    try{
      const input:UserInputDTO = {
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
      };
      const token:string = await this.userBusiness.createUser(input);

      res.status(201).send({ message: "Usuário criado!", token});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  //  ------ -- // ----- ----- ---- // ---- -- ---- // --- -- -- //

  public login = async (req:Request, res:Response):Promise<void> => {
    try{
      const inputLogin:LoginInputDTO = {
        email: req.body.email,
        password:req.body.password
      };
      const token:string = await this.userBusiness.login(inputLogin);

      res.status(200).send({message: "Online", token});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  //  ------ -- // ----- ----- ---- // ---- -- ---- // --- -- -- //

  public getProfile = async (req:Request, res:Response):Promise<void> => {
    try{
      const token = req.headers.authorization as string;
    
      const profile:UserProfileOutput = await this.userBusiness.getProfile(token);

      res.status(200).send(profile);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  //  ------ -- // ----- ----- ---- // ---- -- ---- // --- -- -- //

  public getAllUsers = async (req:Request, res:Response):Promise<void> => {
    try{
      
    
      const allUsers:TUser[] = await this.userBusiness.getAllUsers();

      res.status(200).send(allUsers);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
}
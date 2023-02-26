import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { GetRecipeByIdInput, RecipeInputDTO } from "../model/RecipeModel";

export class RecipeController {
  private recipeBusiness = new RecipeBusiness()

  public createRecipe = async (req:Request, res:Response):Promise<void> => {
    try{
      const input:RecipeInputDTO = {
        token: req.headers.authorization as string,
        title: req.body.title,
        description: req.body.description
      };

      await this.recipeBusiness.createRecipe(input)
      res.status(201).send({ message: "Recipe Criado!"});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getRecipeById = async (req:Request, res:Response):Promise<void> => {
    try{
      const input:GetRecipeByIdInput = {
        token: req.headers.authorization as string,
        id: req.params.id
      };

      const recipe = await this.recipeBusiness.getRecipeById(input)
      res.status(201).send(recipe);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getAllRecipe = async (req:Request, res:Response):Promise<void> => {
    try{
      
      const recipes = await this.recipeBusiness.getAllRecipe()
      res.status(201).send(recipes);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }
}
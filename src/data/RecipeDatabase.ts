import { RecipeCustomError } from "../customError/RecipeCustomError";
import { TRecipe } from "../model/RecipeModel";
import { BaseDatabase } from "./BaseDatabase";
import { TablesNames } from "./TablesName";


export class RecipeDatabase extends BaseDatabase {
  private TableRecipe = TablesNames.Table_recipe;

  public createRecipe = async (recipe:TRecipe):Promise<void> => {
    try{
      await RecipeDatabase.connection(this.TableRecipe).insert(recipe)

    }catch(error:any){
      throw new RecipeCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getRecipeById = async (id:string):Promise<TRecipe> => {
    try{
      const recipe =  await RecipeDatabase.connection(this.TableRecipe)
      .select().where("id",id);

      return recipe[0]
    }catch(error:any){
      throw new RecipeCustomError(error.statusCode, error.message);
    };
  }
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getAllRecipe = async ():Promise<TRecipe[]> => {
    try{
      const allRecipe =  await RecipeDatabase.connection(this.TableRecipe).select();

      return allRecipe
    }catch(error:any){
      throw new RecipeCustomError(error.statusCode, error.message);
    };
  }
};
import { RecipeDatabase } from "../data/RecipeDatabase"
import { GetRecipeByIdInput, RecipeInputDTO, RecipeOutPutDTO, TRecipe } from "../model/RecipeModel";
import { TokenGenerator } from "../services/TokenGenerator";
import { InvalidBodyRecipe, invalidBodyRecipeIdInput, InvalidTypeBodyRecipe, RecipeCustomError, RecipeNotFound } from "../customError/RecipeCustomError";
import { IdGenerator } from "../services/IdGenerator";
import { Unauthorized } from "../customError/UserCustomError";
export class RecipeBusiness {
  private recipeDatabase = new RecipeDatabase();
  private tokenInfo = new TokenGenerator();

  public createRecipe = async (recipe:RecipeInputDTO):Promise<void> => {
    try{
      if(!recipe.title || !recipe.description || !recipe.token){
        throw new InvalidBodyRecipe()
      };
      if(typeof(recipe.description) !== "string" || typeof(recipe.title) !== "string"){
        throw new InvalidTypeBodyRecipe()
      };

      const userId = this.tokenInfo.getTokenData(recipe.token).id;
      if(!userId){
        throw new Unauthorized()
      };

      const localDateTime = new Date();
      const newRecipe:TRecipe = {
        id: IdGenerator.generateId(),
        title:recipe.title,
        description:recipe.description,
        created_at:localDateTime
      };
     
      await this.recipeDatabase.createRecipe(newRecipe)
    }catch(error:any){
      throw new RecipeCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getRecipeById = async (input:GetRecipeByIdInput):Promise<RecipeOutPutDTO> => {
    try{
      if(!input.id || !input.token || input.id === ":id"){
        throw new invalidBodyRecipeIdInput()
      };
      console.log(input)
      const userId = this.tokenInfo.getTokenData(input.token).id;
      if(!userId){
        throw new Unauthorized()
      };

      const getRecipe:TRecipe = await this.recipeDatabase.getRecipeById(input.id)
      if(!getRecipe){
        throw new RecipeNotFound()
      };
      const dateRecipe = getRecipe.created_at.toLocaleString()
      const recipe:RecipeOutPutDTO = {
        id:getRecipe.id,
        title:getRecipe.title,
        description: getRecipe.description,
        createdAt: dateRecipe
      };

      return recipe
    }catch(error:any){
      throw new RecipeCustomError(error.statusCode, error.message);
    };
  };
  // -- -- -- -- -- -- - -- -- -- // -- -- -- -- -- -- -- -- -- -- -- //
  public getAllRecipe = async ():Promise<TRecipe[]> => {
    try{
      const getRecipes = await this.recipeDatabase.getAllRecipe()

      return getRecipes
    }catch(error:any){
      throw new RecipeCustomError(error.statusCode, error.message);
    };
  };
}
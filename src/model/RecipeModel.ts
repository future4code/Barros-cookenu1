export type TRecipe = {
  id: string,
  title:string,
  description:string,
  created_at:Date
};

export interface RecipeInputDTO {
  token:string,
  title:string,
  description:string
};
export interface RecipeOutPutDTO {
  id: string,
  title:string,
  description:string,
  createdAt:string
};
export interface GetRecipeByIdInput {
  id:string,
  token:string
};
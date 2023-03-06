export class RecipeCustomError extends Error {
  public readonly statusCode:number
  constructor(statusCode:number, message:string,){
    super(message)
    this.statusCode = statusCode
  }
};


export class InvalidBodyRecipe extends RecipeCustomError {
  constructor(){
    super(422, "Preencha os campos 'title', 'description' e o token de autorização!")
  }
};

export class InvalidTypeBodyRecipe extends RecipeCustomError {
  constructor(){
    super(409, "Os campos 'title' e 'description' devem receber um valor em string")
  }
};
export class invalidBodyRecipeIdInput extends RecipeCustomError {
  constructor(){
    super(422, "Passe o  ID da receita e o token de autorização!")
  }
}
export class RecipeNotFound extends RecipeCustomError {
  constructor(){
    super(404, "Receita não encontrada, verifique o ID")
  }
}
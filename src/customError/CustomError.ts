export class CustomError extends Error {
  public statusCode:number
  constructor(statusCode:number, message:string,){
    super(message)
    this.statusCode = statusCode
  }
}

export class Unauthorized extends CustomError{ 
  constructor(){
      super(401, "Usuário não autorizado: Verifique o token")
  }
}
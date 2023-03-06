
export class UserCustomError extends Error {
  public readonly statusCode:number
  constructor(statusCode:number, message:string,){
    super(message)
    this.statusCode = statusCode
  }
};

export class UserNotFound extends UserCustomError{ 
  constructor(){
    super(404, "Usuário não encontrado ou inexistente")
  }
};
// -- // -- -- -- -- -- -- -- -- -- -- -- -- -- -- // -- //

export class Unauthorized extends UserCustomError{ 
  constructor(){
      super(401, "Usuário não autorizado: Verifique o token")
  }
};
// -- // -- -- -- -- -- -- -- -- -- -- -- -- -- -- // -- //

export class InvalidUserBody extends UserCustomError{
  constructor(){
    super(422, "Preencha os campos 'name', 'email', 'role' e 'password' ")
  }
};

export class InvalidUserRole extends UserCustomError{
  constructor(){
    super(409, "O tipo(role) de usuário so pode ser 'normal' ou 'admin' ")
  } 
};
// -- // -- -- -- -- -- -- -- -- -- -- -- -- -- -- // -- //

export class EmailAlreadyCadasted extends UserCustomError{
  constructor(){
    super(409, "Email já cadastrado, tente outro ")
  } 
};

export class UserAlreadyCadasted  extends UserCustomError{
  constructor(){
    super(409, "Usuario ja casdastrado!")
  } 
};
// -- // -- -- -- -- -- -- -- -- -- -- -- -- -- -- // -- //

export class InvalidEmail extends UserCustomError{
  constructor(){
    super(409,"Email inválido, deve possuir @")
  }
};

export class InvalidPassword extends UserCustomError{
  constructor(){
    super(409,"A senha deve possuir 6 ou mais caracteres!")
  }
};
// -- // -- -- -- -- -- -- -- -- -- -- -- -- -- -- // -- //

export class InvalidInputLogin extends UserCustomError{
  constructor(){
    super(422,"Preencha os campos 'email' e 'password' ")
  }
};
export class InvalidInputPassword extends UserCustomError{
  constructor(){
    super(409,"Senha incorreta!")
  }
};
declare namespace User {
  //DTO
  export interface SignInReqDto {
    username: string;
    password: string;
  }

  export interface SignInResDto {
    result: {
      id: number;
      name: string;
      access_token: string;
      refresh_token: string;
    };
  }
}

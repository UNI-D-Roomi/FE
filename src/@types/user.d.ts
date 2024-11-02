declare namespace User {
  //DTO
  export interface SignInReqDto {
    loginId: string;
    password: string;
  }

  export interface SignInResDto {
    accessToken: string;
  }

  export interface SignUpResDto {
    name: string;
    loginId: string;
    password: string;
  }

  export interface Store {
    point: number;
    setPoint: (point: number) => void;
  }
}

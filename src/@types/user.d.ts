declare namespace User {
  //DTO
  export interface SignInReqDto {
    id: string;
    password: string;
  }

  export interface SignInResDto {
    accessToken: string;
  }

  export interface Store {
    point: number;
    setPoint: (point: number) => void;
  }
}

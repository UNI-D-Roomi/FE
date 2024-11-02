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
    gauge: number;
    isRibbon: boolean;
    setPoint: (point: number) => void;
    setGauge: (gauge: number) => void;
    setIsRibbon: (isRibbon: boolean) => void;
  }

  export interface RoomieResponse {
    memberId: number;
    loginId: string;
    name: string;
    points: number;
    roomImageUrl: string;
    roomieId: number;
    hungerGage: number;
    lastFeedTime: string;
    isRibbon: boolean;
    beforeWashImageUrl: string;
    washingStartTime: string;
    roomieTalkMsg: string;
  }
}

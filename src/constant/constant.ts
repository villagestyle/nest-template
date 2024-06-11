// 自定义状态码，避免与http状态码冲突
export enum CustomErrorStatus {
  // 参数错误
  WRONG_PARAMETERS = 50001,
  // 请求错误，拒绝请求
  REJECT_REQUEST = 50002,
}

// 登录token key
export const AuthKey = 'Authorization';

// 微信第三方第三方平台信息
export const ThirdPartyPlatform = {
  APP_SECRET: 'xxxxxxxxxxxxx',
  APP_ID: 'xxxxxxxxxxxxx',
  // 消息校验Token
  VERIFY_TOKEN: 'xxxxxxxxxxxxx',
  // 消息加解密Key
  ENCODING_AES_KEY: 'xxxxxxxxxxxxx',
};

export const CONSTANT_CONFIG = {
  NO_DATA_NUMBER_ID: -9999999,
};

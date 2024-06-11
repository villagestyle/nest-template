export interface WechatMsgVerify {
  signature: string;
  timestamp: string;
  nonce: string;
  encrypt_type: string;
  msg_signature: string;
}

export type WithXMLWrapper<T> = {
  xml: T;
};

export type ComponentVerifyTicket = WithXMLWrapper<{
  ComponentVerifyTicket: string;
  InfoType: 'component_verify_ticket';
  AppId: string;
}>;

export interface PreAuthCode {
  pre_auth_code: string;
  expires_in: number;
}

export interface ComponentAccessToken {
  component_access_token: string;
  expires_in: number;
}

export interface AuthorizationInfo {
  authorizer_appid: string;
  authorizer_access_token: string;
  expires_in: number;
  authorizer_refresh_token: string;
}

export interface AuthorizationAccountInfo {
  account_name: string;
  account_type: number;
  head_image_url: string;
}

export interface AuthorizationAccountResponse {
  account_type: number;
  nickname: string;
  head_image_info: {
    head_image_url: string;
  };
}

export interface RefreshTokenAuthorizationResponse {
  authorizer_access_token: string;
  authorizer_refresh_token: string;
  expires_in: number;
}

export type UnauthorizedMessage = WithXMLWrapper<{
  AppId: string;
  CreateTime: string;
  InfoType: 'unauthorized' | 'updateauthorized' | 'authorized';
  AuthorizerAppid: string;
}>;

export type WxTextMessage = WithXMLWrapper<{
  ToUserName: string;
  FromUserName: string;
  CreateTime: string;
  MsgType: string;
  Content: string;
  MsgId: string;
}>;

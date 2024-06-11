import { ThirdPartyPlatform } from '@/constant/constant';
import { axios } from './config';
import {
  AuthorizationAccountResponse,
  AuthorizationInfo,
  ComponentAccessToken,
  PreAuthCode,
  RefreshTokenAuthorizationResponse,
} from '@/types/model/wechat';

// 获取第三方平台令牌
export const getComponentToken = (ticket: string) => {
  return axios.httpRequest<ComponentAccessToken>({
    method: 'POST',
    url: 'https://api.weixin.qq.com/cgi-bin/component/api_component_token',
    data: {
      component_appid: ThirdPartyPlatform.APP_ID,
      component_appsecret: ThirdPartyPlatform.APP_SECRET,
      component_verify_ticket: ticket,
    },
    customResponse: true,
  });
};

// 获取预授权码
export const getPreAuthCode = (componentAccessToken: string) => {
  return axios.httpRequest<PreAuthCode>({
    method: 'POST',
    url: 'https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode',
    data: {
      component_appid: ThirdPartyPlatform.APP_ID,
    },
    params: {
      component_access_token: componentAccessToken,
    },
    customResponse: true,
  });
};

// 使用授权码获取授权信息
export const getAuthorizationInfo = (
  componentAccessToken: string,
  authCode: string,
) => {
  return axios.httpRequest<{
    authorization_info: AuthorizationInfo;
  }>({
    method: 'POST',
    url: 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth',
    data: {
      component_appid: ThirdPartyPlatform.APP_ID,
      authorization_code: authCode,
    },
    params: {
      component_access_token: componentAccessToken,
    },
    customResponse: true,
  });
};

// 通过token获取授权账号的基本信息
export const getAuthorizerAccountInfo = (accessToken: string) => {
  return axios.httpRequest<AuthorizationAccountResponse>({
    method: 'POST',
    url: 'https://api.weixin.qq.com/cgi-bin/account/getaccountbasicinfo',
    params: {
      access_token: accessToken,
    },
    customResponse: true,
  });
};

// 使用authorizer_refresh_token重新获取token
export const getTokenByRefreshToken = (
  componentAccessToken: string,
  data: {
    refreshToken: string;
    appId: string;
  },
) => {
  return axios.httpRequest<RefreshTokenAuthorizationResponse>({
    method: 'POST',
    url: 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token',
    params: {
      component_access_token: componentAccessToken,
    },
    data: {
      component_appid: ThirdPartyPlatform.APP_ID,
      authorizer_appid: data.appId,
      authorizer_refresh_token: data.refreshToken,
    },
    customResponse: true,
  });
};

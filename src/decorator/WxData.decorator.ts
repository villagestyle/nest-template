import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import WXBizMsgCrypt from '@/plugin/wxcrypt';
import { ThirdPartyPlatform } from '@/constant/constant';
import { WechatMsgVerify } from '@/types/model/wechat';

export const WxData = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request<any, any, { xml: string }, WechatMsgVerify>>();
    const xml = request.body.xml;
    const query = request.query;

    if (xml) {
      const crypt = new WXBizMsgCrypt(
        ThirdPartyPlatform.VERIFY_TOKEN,
        ThirdPartyPlatform.ENCODING_AES_KEY,
        ThirdPartyPlatform.APP_ID,
      );

      // 转换[OBJECT NULL]对象
      const encryptMsg = JSON.parse(JSON.stringify(xml));
      const decryptedMsg = crypt.decryptMsg(
        query.msg_signature,
        query.timestamp,
        query.nonce,
        WXBizMsgCrypt.o2x(encryptMsg),
      );
      const parsedMessage = WXBizMsgCrypt.x2o(decryptedMsg);

      return parsedMessage;
    }

    return null;
  },
);

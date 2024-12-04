import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

// import * as moment from 'moment';
import {
  IPayloadResponse,
  Request,
  Response,
} from 'src/utilities/helper-type.util';

@Injectable()
export default class ResponseMiddleware implements NestMiddleware {
  private validate: any = null;
  private partialData: Object = null;

  use(req: Request, res: Response, next: NextFunction) {
    // this.validate = req.validations as FX_ROUTERS.TCombineOptValidate;

    const rawResponseEnd = res.end;
    const chunkBuffers = [];

    // Assign custom response of JSON
    res.asJson = (
      statusCode: number,
      payloadResponse: IPayloadResponse,
      logData: any,
    ) => {
      this.partialData = logData || null;

      return res.status(statusCode).json({
        reqId: req.id,
        meta: {
          success: statusCode > 299 || statusCode < 200 ? false : true,
          code: parseInt(`${statusCode}`),
          message: payloadResponse.message,
        },
        detailMessage:
          payloadResponse.detailMessage || typeof logData?.message === 'string'
            ? logData.message
            : undefined,
        data: payloadResponse.data || undefined,
        page: payloadResponse.page || undefined,
        pageSize: payloadResponse.pageSize || undefined,
        total: payloadResponse.total || undefined,
      });
    };

    res.end = (...chunk) => {
      if (!res.headersSent) {
        res.setHeader('Last-Modified', new Date().toUTCString());
      }

      const resArgs = [];
      for (let i = 0; i < chunk.length; i++) {
        resArgs[i] = chunk[i];
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }

      // const body = Buffer.concat(chunkBuffers).toString('utf8');
      // const dataBody = body ? JSON.parse(body) : null;

      const responseLog = {
        reqId: req.id,
        clientInformations: req.client_informations,
        statusCode: res.statusCode,
        reqAt: req.at,
        resAt: Date.now(),
        // data: dataBody,
      };

      if (
        typeof this.validate?.logging === 'boolean' &&
        this.validate?.logging
      ) {
        // // Store log response to store data
        // let tmpMsg = responseLog.data?.message;
        // if (Array.isArray(responseLog.data?.message)) {
        //   tmpMsg = responseLog.data?.message[0];
        // } else if (typeof responseLog.data?.message === 'object') {
        //   tmpMsg = 'Somemthing wrong';
        // }
      }

      rawResponseEnd.apply(res, resArgs);
      return responseLog as unknown as Response;
    };

    next();
  }
}

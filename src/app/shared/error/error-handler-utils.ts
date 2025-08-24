import { HttpErrorResponse } from '@angular/common/http';
import { errorCodeMapping } from './error-code-mapping';

export namespace ErrorHandlerUtils {
  export function getMsg(error: any) {
    let messageTemp = 'ไม่สามารถเข้าใช้งานได้ในขณะนี้ กรุณารอสักครู่ แล้วเข้าใหม่อีกครั้ง';

    if (error instanceof HttpErrorResponse) {
      const httpStatus = error.status;

      switch (httpStatus) {
        case 400:
          const subCode = error.error?.error?.subCode;
          const errorCodeMsg = errorCodeMapping[subCode];

          if (errorCodeMsg) messageTemp = errorCodeMsg;

          break;

        case 401:
          messageTemp = 'เซสชั่นหมดอายุ กรุณาลองใหม่อีกครั้ง';
          break;

        case 404:
          messageTemp = 'ไม่พบหน้าดังกล่าว กรุณาลองใหม่อีกครั้ง';
          break;

        case 409:
          messageTemp = 'เบอร์โทรศัพท์มีการใช้งานแล้ว กรุณาลองใหม่อีกครั้ง';
          break;
      }
    }

    if (!navigator.onLine) {
      messageTemp = 'ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตและลองใหม่อีกครั้ง';
    }

    return messageTemp;
  }
}

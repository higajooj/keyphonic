import { registerAs } from '@nestjs/config';

export const EnvironmentVariables = registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV,
    app: {
      driver: {
        forceLogin: process.env.FORCE_LOGIN,
        forcePassword: process.env.FORCE_PASSWORD,
        mailDriver: process.env.MAIL_DRIVER,
        storageDriver: process.env.STORAGE_DRIVER,
        tokenDriver: process.env.TOKEN_DRIVER,
        cryptographyDriver: process.env.CRYPTOGRAPHY_DRIVER,
      },
      frontWebUrl: process.env.FRONT_WEB_URL,
      serverUrl: process.env.SERVER_URL,
      port: process.env.PORT,
      uploadFileLimitSize: process.env.UPLOAD_FILE_LIMIT_SIZE,
      subscriptionTerm: {
        url: process.env.SUBSCRIPTION_TERM_URL,
        name: process.env.SUBSCRIPTION_TERM_NAME,
      },
    },
    database: {
      uri: process.env.DATABASE_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    bunny: {
      apiKey: process.env.BUNNY_API_KEY,
      hostname: process.env.BUNNY_HOSTNAME,
      storageName: process.env.BUNNY_STORAGE_NAME,
    },
    sendGrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      templateCode: process.env.SENDGRID_TEMPLATE_CODE,
    },
    mail: {
      from: process.env.MAIL_FROM,
      name: process.env.MAIL_NAME,
    },
    qiTech: {
      basePath: process.env.QITECH_BASE_PATH,
      apiKey: process.env.QITECH_API_KEY,
      privateKey: process.env.QITECH_PRIVATE_KEY,
      accountKey: process.env.QITECH_ACCOUNT_KEY,
      publicKey: process.env.QITECH_PUBLIC_KEY,
      riskSolution: {
        basePath: process.env.QITECH_RISK_SOLUTION_BASE_PATH,
      },
      ocr: {
        apiKey: process.env.QITECH_OCR_API_KEY,
        mobileToken: process.env.QITECH_OCR_MOBILE_TOKEN,
      },
      face: {
        apiKey: process.env.QITECH_FACE_API_KEY,
        mobileToken: process.env.QITECH_FACE_MOBILE_TOKEN,
      },
      deviceScan: {
        mobileToken: process.env.QITECH_DEVICE_SCAN_MOBILE_TOKEN,
      },
      onboarding: {
        apiKey: process.env.QITECH_ONBOARDING_API_KEY,
        signatureKey: process.env.QITECH_ONBOARDING_SIGNATURE_KEY,
      },
      sign: {
        basePath: process.env.QITECH_SIGN_BASE_PATH,
        apiKey: process.env.QITECH_SIGN_API_KEY,
        signatureKey: process.env.QITECH_SIGN_SIGNATURE_KEY,
      },
    },
  };
});

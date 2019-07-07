import { Logger } from 'ts-framework-common';
import { Text, TextGateway } from '../../lib';

const logger = Logger.initialize();

const text = new Text({
  from: process.env.SMS_FROM,
  gateway: TextGateway.TWILIO,
  gatewayOptions: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
});

setTimeout(async () => {
  try {
    await text.onInit(null);

    const response = await text.send({
      to: process.env.SMS_TO,
      text: 'hello world',
    })

    logger.debug('Text message sent successfully', response);
    process.exit(0);
  } catch (error) {
    logger.error('Could not send text message', error)
    process.exit(1);
  }

}, 10);
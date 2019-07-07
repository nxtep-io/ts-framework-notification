import { Logger } from 'ts-framework-common';
import { Email } from '../../lib';

const logger = Logger.initialize();

const email = new Email({
  from: process.env.SMTP_FROM,
  connectionUrl: process.env.SMTP_URL,
  template: {
    enabled: true
  }
});

email.send({
  // The basic email information
  to: process.env.EMAIL_TO || 'hello@devnup.com',
  subject: 'Notification Test',

  // The basic email body both in plain text and HTML
  text: 'This is a sample email from TS Framework notification services',
  html: 'This is a sample email from <b>TS Framework notification services</b>',
}).then(response => {
  logger.debug(response);
  process.exit(0);
}).catch(error => {
  logger.error(error)
  process.exit(1);
});
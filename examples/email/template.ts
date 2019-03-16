import { Logger } from 'ts-framework-common';
import { Email } from '../../lib';

const logger = Logger.getInstance();

const email = new Email({
  from: process.env.SMTP_FROM,
  connectionUrl: process.env.SMTP_URL,

  // Enable the template engine
  template: { enabled: true }
});

email.send({
  // The basic email information
  subject: 'Notification Test',
  to: process.env.EMAIL_TO || 'hello@devnup.com',
  
  // Pass variables to the template engine
  locals: {
    title: 'Simple sender test',
    logo: 'https://i.imgur.com/5UMVOBG.jpg',
    preview: `(Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject
    line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for
    anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not
    included, email clients will automatically populate it using the text (including image alt text) at the start of the
    email's body.`,
    body: `Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
    per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium 
    lobortis rhoncus ut erat.`,
    button: {
      label: 'Visit the Web Page',
      url: 'https://google.com'
    },
    footer: 'This is a footer',
    company: {
      name: 'Devnup Ltd.',
      address: 'Campinas, Brazil',
      tel: '(123) 456-7890',
      url: 'https://devnup.com',
    },
    unsubscribe: {
      label: 'Unsubscribe',
      url: 'https://google.com',
    },
  },
}).then(response => {
  logger.debug(response);
  process.exit(0);
}).catch(error => {
  logger.error(error)
  process.exit(1);
});
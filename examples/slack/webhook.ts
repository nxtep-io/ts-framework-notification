import { Logger } from 'ts-framework-common';
import { Slack } from '../../lib';

const logger = Logger.initialize();

const slack = new Slack({
  webhookUrl: process.env.SLACK_URL,
});

setTimeout(async () => {
  try {
    await slack.onInit(null);

    const response = await slack.send({
      text: 'hello world',
      username: 'ts-framework-notification',
      attachments: [{
        color: 'warning',
        text: 'everything look ok!',
        fallback: 'everything look ok!',
        thumbUrl: 'http://i.pravatar.cc/300',
        fields: [{
          title: 'Name',
          value: 'John Doe',
        }, {
          title: 'Email',
          value: 'john@example.com',
        }],
        actions: [{
          type: 'button',
          text: 'See Profile',
          url: 'https://github.com',
          fallback: 'See profile',
        }, {
          type: 'button',
          text: 'Block User',
          url: 'https://github.com',
          fallback: 'Accept User',
          style: 'primary',
        }]
      }]
    })

    logger.debug('Slack message sent successfully', response);
    process.exit(0);
  } catch (error) {
    logger.error('Could not send slack message', error)
    process.exit(1);
  }

}, 10);
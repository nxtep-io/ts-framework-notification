import * as hat from 'hat';
import Notification, { TextGateway } from "../../lib";

describe('lib.services.Notification', () => {
  it('should not instantiate a Notification service without any transports', async () => {
    expect(() => new Notification({})).toThrow(/No transports configured/);
  });

  it('should instantiate a Notification service with a debug email transport', async () => {
    let service = new Notification({ email: { from: 'test@company.com', debug: true } });

    await service.send(new Notification.EmailMessage({
      to: 'test@company.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    }));
  });

  it('should instantiate a Notification service with a debug firebase transport', async () => {
    let service = new Notification({ firebase: { debug: true } });

    await service.onInit(null);

    await service.send(new Notification.FirebaseMessage({
      registrationToken: hat(),
      body: 'Unit test',
      sample: 'true'
    }));
  });

  it('should instantiate a Notification service with a debug text transport', async () => {
    let service = new Notification({ text: { gateway: TextGateway.DEBUG } });

    await service.onInit(null);

    await service.send(new Notification.TextMessage({
      to: '+55119876543210',
      text: 'Sample text for Unit Testing'
    }));
  });

  it('should instantiate a Notification service with a debug slack transport', async () => {
    let service = new Notification({ slack: { debug: true } });

    await service.onInit(null);

    await service.send(new Notification.SlackMessage({
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
    }));
  });
});
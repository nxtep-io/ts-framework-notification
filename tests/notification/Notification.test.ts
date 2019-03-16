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
});
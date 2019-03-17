import { Slack, SlackMessage } from "../../lib";

describe('lib.services.Slack', () => {
  it('should crash without a valid configuration', async () => {
    const slack = new Slack({});
    await expect(slack.send({ text: ''})).rejects.toThrowError(/Webhook url not supplied/ig);
  });

  it('should send a simple message with a debug slack transport', async () => {
    let service = new Slack({ debug: true });

    await service.onMount(null);
    await service.onInit(null);

    await service.send(new SlackMessage({
      text: 'hello world',
      username: 'ts-framework-notification',
    }));

    await service.onUnmount(null);
  });

  it('should send attachments with a debug slack transport', async () => {
    let service = new Slack({ debug: true });

    await service.onMount(null);
    await service.onInit(null);

    await service.send(new SlackMessage({
      text: 'hello world',
      username: 'ts-framework-notification',
      attachments: [{
        color: 'warning',
        text: 'everything look ok!',
        fallback: 'everything look ok!',
        thumbUrl: 'http://i.pravatar.cc/300',
      }]
    }));
  });

  it('should send field attachments with a debug slack transport', async () => {
    let service = new Slack({ debug: true });

    await service.onMount(null);
    await service.onInit(null);

    await service.send(new SlackMessage({
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
      }]
    }));
  });

  it('should send field and action attachments with a debug slack transport', async () => {
    let service = new Slack({ debug: true });

    await service.onMount(null);
    await service.onInit(null);

    await service.send(new SlackMessage({
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

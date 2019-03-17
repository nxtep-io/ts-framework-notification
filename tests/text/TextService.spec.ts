import * as hat from 'hat';
import { Text, TextGateway, TextMessage } from "../../lib";

describe('lib.services.Text', () => {

  it('should instantiate a simple text message', async () => {
    const message = new TextMessage({ to: '+5511987654321', text: 'Unit test' });
    expect(message).toHaveProperty('to', '+5511987654321');
    expect(message).toHaveProperty('text', 'Unit test');
  });

  it('should not instantiate without a valid configuration for Twilio', async () => {
    const text = new Text({ gateway: TextGateway.TWILIO });
    expect(await text.isReady()).toBe(false);

    await text.onMount(null);
    await expect(text.onInit(null)).rejects.toThrow(/without a valid set of credentials/ig);

    expect(await text.isReady()).toBe(false);
  });

  it('should crash without a valid configuration', async () => {
    const text = new Text({ gateway: undefined });
    await expect(text.send({
      to: '+5511987654321',
      text: 'This is an automated test'
    })).rejects.toThrowError(/No gateway instance initialized/ig);
  });

  it('should not crash initializing Twilio with a valid configuration', async () => {
    const text = new Text({ 
      gateway: TextGateway.TWILIO,  
      gatewayOptions: {
        accountSid: 'ACabf01714c5eac8942652c576388c70eb',
        authToken: '0e076aee34c8171a769836faebd371ca',
      }
    });

    await text.onMount(null);
    await text.onInit(null);
  });

  it('should crash without a valid message', async () => {
    const text = new Text({ gateway: TextGateway.DEBUG });

    await text.onMount(null);
    await text.onInit(null);

    await expect(text.send(null)).rejects.toThrowError(/No message provided/ig);
  });

  it('should not crash sending with a valid configuration but in debug mode', async () => {
    const text = new Text({ gateway: TextGateway.DEBUG });

    await text.onMount(null);
    await text.onInit(null);

    await text.send({
      to: '+5511987654321',
      text: 'This is an automated test'
    });
  });

  it('should not send invalid Twilio set of credentials', async () => {
    const text = new Text({ 
      gateway: TextGateway.TWILIO,  
      gatewayOptions: {
        accountSid: 'ACabf01714c5eac8942652c576388c70eb',
        authToken: '0e076aee34c8171a769836faebd371ca',
      }
    });

    await text.onMount(null);
    await text.onInit(null);

    await expect(text.send({
      to: '+5511987654321',
      text: 'This is an automated test'
    })).rejects.toThrowError(/Authenticate/ig);
  });
});

import { Logger } from 'ts-framework-common';
import { Email, EmailMessage } from "../../lib";
import MockTransport from "../util/MockTransport";

describe('lib.services.Email', () => {
  Logger.initialize();

  it('should instantiate a simple firebase message', async () => {
    const message = new EmailMessage({ to: 'test@company.com', subject: 'Unit test', text: 'Unit test' });
    expect(message).toHaveProperty('to', 'test@company.com');
    expect(message).toHaveProperty('text', 'Unit test');
  });

  it('should crash without a valid configuration', async () => {
    expect(() => new Email({ from: 'test@company.com' })).toThrowError(/connectionUrl/);
  });

  it('should crash without a valid connection URL', async () => {
    const email = new Email({
      from: 'test@company.com',
      connectionUrl: 'smtp://invalid:user@localhost:1234'
    });

    await expect(email.send({
      to: 'test@company.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    })).rejects.toThrow(/SMTP connectionUrl may be invalid or unavailable/ig)
  });

  it('should not crash without a valid configuration but in debug mode', async () => {
    const email = new Email({ from: 'test@company.com', debug: true });
    expect(await email.isReady()).toBe(false);
  });

  it('should not crash sending with a valid configuration but in debug mode', async () => {
    const email = new Email({ from: 'test@company.com', debug: true });
    expect(await email.isReady()).toBe(false);

    await email.send({
      to: 'test@company.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    });
  });

  it('should send a valid email with a valid transporter', async () => {
    const email = new Email({
      from: 'test@company.com',
      transporter: new MockTransport({}) as any,
      template: {
        enabled: false
      }
    });

    await email.send({
      to: 'test@company.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    });
  });

  it('should send a template engine based email with a valid transporter', async () => {
    const email = new Email({
      from: 'test@company.com',
      transporter: new MockTransport({}) as any,
      template: {
        enabled: true
      }
    });

    await email.send({
      to: 'test@company.com',
      subject: 'Unit test',
      text: 'This is an automated test',
      locals: {
        title: 'Sample',
        body: 'Sample',
      },
    });
  });
});
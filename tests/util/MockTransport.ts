import { Transport } from 'nodemailer';

export default class MockTransport implements Transport {
  name: string;
  options: any;
  mailer?: any;
  sentMail: any[];
  version: string;

  constructor(options) {
    this.options = options || {}
    this.sentMail = []
    this.name = 'Mock Transport'
    this.version = '1.0.0'
  }

  public close(): void {
    return null;
  }

  protected validate(addr) {
    return null;
  }

  public async verify(): Promise<true> {
    return true;
  }

  public sendMail(mail, callback = () => true) {
    return this.send(mail, callback);
  }

  public send(mail, callback) {
    let err;
    const to = (mail.to || mail.data.to);

    if (!to) {
      return callback(new Error('I need to know who this email is being sent to :-('))
    }

    if (Array.isArray(to)) {
      for (var i = 0; i < to.length; i++) {
        var addr = to[i]
        err = this.validate(addr)
        if (err != null) {
          return callback(err)
        }
      }
    } else {
      err = this.validate(to)
      if (err != null) {
        return callback(err)
      }
    }

    this.sentMail.push(mail);
    return callback()
  }
}
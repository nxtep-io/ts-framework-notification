import * as hat from 'hat';
import { Logger } from 'ts-framework-common';
import { Firebase, FirebaseMessage } from "../../lib";

describe('lib.services.FirebaseService', () => {
  Logger.initialize();

  it('should instantiate a simple firebase message', async () => {
    const registrationToken = hat();
    const message = new FirebaseMessage({ body: 'Unit test', registrationToken, sample: 'true' });
    expect(message).toHaveProperty('registrationToken', registrationToken);
    expect(message).toHaveProperty('body', 'Unit test');
    expect(message).toHaveProperty('sample', 'true');
  });

  it('should not instantiate a debug Firebase service instance without explicit configuration', async () => {
    expect(() => new Firebase({})).toThrow(/The Google Service Account is not available/);
  });

  it('should intantiate a simple debug instance', async () => {
    const firebase = new Firebase({ debug: true });
    expect(firebase).toBeTruthy();
    expect(firebase['sdk']).toBeUndefined();
  });

  it('should intantiate a simple debug instance and send simple notification', async () => {
    const firebase = new Firebase({ debug: true });
    expect(firebase).toBeTruthy();
    expect(firebase['sdk']).toBeUndefined();
    expect(async () => await firebase.send({ registrationToken: hat(), body: 'Unit test', sample: 'true' })).not.toThrow();
  });

  it('should intantiate a simple debug instance and send full notification', async () => {
    const firebase = new Firebase({ debug: true });
    expect(firebase).toBeTruthy();
    expect(firebase['sdk']).toBeUndefined();
    expect(async () => await firebase.send({
      registrationToken: hat(),
      body: 'Unit test',
      sample: 'true',
      title: 'sample',
      sound: 'sample',
      titleLocArgs: 'sample',
      titleLocKey: 'sample',
      bodyLocArgs: 'sample',
      bodyLocKey: 'sample',
      clickAction: 'sample',
      tag: 'sample',
      icon: 'sample',
      color: 'sample',
      badge: '1',
    })).not.toThrow();
  });

});
import { Slack } from "../../lib";

describe('lib.services.Slack', () => {
  it('should crash without a valid configuration', async () => {
    const slack = new Slack({});
    expect(() => slack.send({} as any)).rejects.toThrowError(/no webhook supplied/ig);
  });
});

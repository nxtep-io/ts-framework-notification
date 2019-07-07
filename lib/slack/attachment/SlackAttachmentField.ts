
export interface SlackAttachmentFieldSchema {
  title?: string;
  value?: string;
  short?: string;
}

export class SlackAttachmentField implements SlackAttachmentFieldSchema {
  title?: string;
  value?: string;
  short?: string;

  constructor(data: SlackAttachmentFieldSchema) {
    Object.assign(this, data);
  }

  public toJSON() {
    const { ...otherProps } = this;

    return {
      ...otherProps,
    }
  }
}
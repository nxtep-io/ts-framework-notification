
export interface SlackAttachmentActionSchema {
  type: string;
  text: string;
  url: string;
  fallback: string;
  style?: 'primary' | 'danger' | undefined;
}

export class SlackAttachmentAction implements SlackAttachmentActionSchema {
  type: string;
  text: string;
  url: string;
  fallback: string;
  style?: 'primary' | 'danger' | undefined;

  constructor(data: SlackAttachmentActionSchema) {
    Object.assign(this, data);
  }

  public toJSON() {
    const { ...otherProps } = this;

    return {
      ...otherProps,
    }
  }
}
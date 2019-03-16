import { SlackAttachmentFieldSchema, SlackAttachmentField } from "./SlackAttachmentField";
import { SlackAttachmentActionSchema, SlackAttachmentAction } from "./SlackAttachmentAction";

export interface SlackAttachmentSchema {
  fallback: string;
  pretext?: string;
  authorName?: string;
  authorLink?: string;
  authorIcon?: string;
  title?: string;
  titleLink?: string;
  text?: string;
  fields?: SlackAttachmentFieldSchema[];
  actions?: SlackAttachmentActionSchema[];
  color?: 'good' | 'warning' | 'danger' | string;
  imageUrl?: string;
  thumbUrl?: string;
}

export class SlackAttachment implements SlackAttachmentSchema {
  fallback: string;
  pretext?: string;
  authorName?: string;
  authorLink?: string;
  authorIcon?: string;
  title?: string;
  titleLink?: string;
  text?: string;
  fields?: SlackAttachmentField[];
  actions?: SlackAttachmentAction[];
  color?: 'good' | 'warning' | 'danger' | string;
  imageUrl?: string;
  thumbUrl?: string;

  constructor(data: SlackAttachmentSchema) {
    const { fields = [], actions = [], ...otherData } = data;
    Object.assign(this, otherData);
    this.fields = fields.map(field => new SlackAttachmentField(field));
    this.actions = actions.map(action => new SlackAttachmentAction(action));
  }

  public toJSON() {
    const { fields = [], actions = [], imageUrl, thumbUrl, authorName, authorLink, authorIcon, titleLink, ...otherProps } = this;

    return {
      author_name: authorName,
      author_link: authorLink,
      author_icon: authorIcon,
      title_link: titleLink,
      image_url: imageUrl,
      thumb_url: thumbUrl,
      fields: fields.map(field => field.toJSON ? field.toJSON() : field),
      actions: actions.map(action => action.toJSON ? action.toJSON() : action),
      ...otherProps,
    }
  }
}
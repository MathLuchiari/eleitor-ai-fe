export type DocumentType =
  | 'GOVERNMENT_PLAN'
  | 'OFFICIAL_DOCUMENT'
  | 'OTHER';

export interface DocumentProps {
  id: string;
  governmentPlanId: string;
  title: string;
  type: DocumentType;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Document {
  private constructor(private readonly props: DocumentProps) {}

  static create(
    props: Omit<DocumentProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Document {
    const now = new Date();

    return new Document({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get governmentPlanId(): string {
    return this.props.governmentPlanId;
  }

  get title(): string {
    return this.props.title;
  }

  get type(): DocumentType {
    return this.props.type;
  }

  get content(): string {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
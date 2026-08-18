export type SourceType =
  | 'OFFICIAL_WEBSITE'
  | 'TSE'
  | 'GOVERNMENT'
  | 'OTHER';

export interface SourceProps {
  id: string;
  documentId: string;
  title: string;
  url: string;
  publisher: string;
  type: SourceType;
  publishedAt?: Date;
  createdAt: Date;
}

export class Source {
  private constructor(private readonly props: SourceProps) {}

  static create(
    props: Omit<SourceProps, 'id' | 'createdAt'>,
  ): Source {
    return new Source({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  static restore(props: SourceProps): Source {
    return new Source(props);
  }

  get id(): string {
    return this.props.id;
  }

  get documentId(): string {
    return this.props.documentId;
  }

  get title(): string {
    return this.props.title;
  }

  get url(): string {
    return this.props.url;
  }

  get publisher(): string {
    return this.props.publisher;
  }

  get type(): SourceType {
    return this.props.type;
  }

  get publishedAt(): Date | undefined {
    return this.props.publishedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

export interface PartyProps {
  id: string;
  name: string;
  acronym: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Party {
  private constructor(private readonly props: PartyProps) {}

  static create(
    props: Omit<PartyProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Party {
    const now = new Date();

    return new Party({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get acronym(): string {
    return this.props.acronym;
  }

  get number(): number {
    return this.props.number;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
export type CandidateStatus = 'ACTIVE' | 'INACTIVE';

export interface CandidateProps {
  id: string;
  name: string;
  partyId: string;
  status: CandidateStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Candidate {
  private constructor(private readonly props: CandidateProps) {}

  static create(
    props: Omit<CandidateProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Candidate {
    const now = new Date();

    return new Candidate({
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

  get partyId(): string {
    return this.props.partyId;
  }

  get status(): CandidateStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
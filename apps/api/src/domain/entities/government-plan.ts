export interface GovernmentPlanProps {
  id: string;
  candidateId: string;
  title: string;
  description?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class GovernmentPlan {
  private constructor(private readonly props: GovernmentPlanProps) {}

  static create(
    props: Omit<GovernmentPlanProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): GovernmentPlan {
    const now = new Date();

    return new GovernmentPlan({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get candidateId(): string {
    return this.props.candidateId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get publishedAt(): Date | undefined {
    return this.props.publishedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
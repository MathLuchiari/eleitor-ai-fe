import { Source, type SourceType } from '../../../domain/entities/source.js';
import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

interface CreateSourceInput {
  documentId: string;
  title: string;
  url: string;
  publisher: string;
  type: SourceType;
  publishedAt?: Date;
}

export class CreateSourceUseCase {
  constructor(private readonly sourceRepository: SourceRepository) {}

  async execute(input: CreateSourceInput): Promise<Source> {
    const source = Source.create(input);

    await this.sourceRepository.create(source);

    return source;
  }
}
import { type Source } from '../../../domain/entities/source.js';
import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

export class ListSourcesByDocumentUseCase {
  constructor(private readonly sourceRepository: SourceRepository) {}

  async execute(documentId: string): Promise<Source[]> {
    return this.sourceRepository.findByDocumentId(documentId);
  }
}
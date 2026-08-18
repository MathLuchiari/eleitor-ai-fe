import { type Document } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

export class GetDocumentUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(id: string): Promise<Document | null> {
    return this.documentRepository.findById(id);
  }
}
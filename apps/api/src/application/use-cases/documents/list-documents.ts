import { Document } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

export class ListDocumentsUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }
}
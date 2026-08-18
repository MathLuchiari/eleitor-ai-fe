import { type Document } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

export class ListDocumentsByGovernmentPlanUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(governmentPlanId: string): Promise<Document[]> {
    return this.documentRepository.findByGovernmentPlanId(governmentPlanId);
  }
}
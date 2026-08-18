import { describe, expect, it, vi } from 'vitest';

import { Document } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

import { GetDocumentUseCase } from './get-document.js';

describe('GetDocumentUseCase', () => {
  it('should return a document by id', async () => {
    const document = Document.create({
      governmentPlanId: 'plan-1',
      title: 'Plano de Governo 2026',
      type: 'GOVERNMENT_PLAN',
      content: 'Conteúdo do plano de governo.',
    });

    const documentRepository: DocumentRepository = {
      findById: vi.fn().mockResolvedValue(document),
      findByGovernmentPlanId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetDocumentUseCase(documentRepository);

    const result = await useCase.execute(document.id);

    expect(result).toEqual(document);
    expect(documentRepository.findById).toHaveBeenCalledWith(document.id);
  });

  it('should return null when document does not exist', async () => {
    const documentRepository: DocumentRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findByGovernmentPlanId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetDocumentUseCase(documentRepository);

    const result = await useCase.execute('non-existent-id');

    expect(result).toBeNull();
    expect(documentRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });
});
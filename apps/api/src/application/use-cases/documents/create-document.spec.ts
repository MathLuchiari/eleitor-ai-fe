import { describe, expect, it, vi } from 'vitest';

import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

import { CreateDocumentUseCase } from './create-document.js';

describe('CreateDocumentUseCase', () => {
  it('should create a document', async () => {
    const documentRepository: DocumentRepository = {
      findById: vi.fn(),
      findByGovernmentPlanId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateDocumentUseCase(documentRepository);

    const input = {
      governmentPlanId: 'plan-1',
      title: 'Plano de Governo 2026',
      type: 'GOVERNMENT_PLAN' as const,
      content: 'Conteúdo do plano de governo.',
    };

    const result = await useCase.execute(input);

    expect(result).toMatchObject(input);
    expect(result.id).toBeDefined();
    expect(documentRepository.create).toHaveBeenCalledWith(result);
  });
});
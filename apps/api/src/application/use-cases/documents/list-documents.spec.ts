import { describe, expect, it, vi } from 'vitest';

import { Document } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

import { ListDocumentsUseCase } from './list-documents.js';

describe('ListDocumentsUseCase', () => {
  it('should return all documents', async () => {
    const documents = [
      Document.create({
        governmentPlanId: 'plan-1',
        title: 'Plano de Governo 2026',
        type: 'GOVERNMENT_PLAN',
        content: 'Conteúdo do plano de governo.',
      }),
      Document.create({
        governmentPlanId: 'plan-2',
        title: 'Plano de Governo 2026 - Documento 2',
        type: 'GOVERNMENT_PLAN',
        content: 'Conteúdo do segundo documento.',
      }),
    ];

    const documentRepository: DocumentRepository = {
      findById: vi.fn(),
      findByGovernmentPlanId: vi.fn(),
      findAll: vi.fn().mockResolvedValue(documents),
      create: vi.fn(),
    };

    const useCase = new ListDocumentsUseCase(documentRepository);

    const result = await useCase.execute();

    expect(result).toEqual(documents);
    expect(documentRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
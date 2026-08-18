import { describe, expect, it, vi } from 'vitest';

import { Document } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

import { ListDocumentsByGovernmentPlanUseCase } from './list-documents-by-government-plan.js';

describe('ListDocumentsByGovernmentPlanUseCase', () => {
  it('should return documents by government plan', async () => {
    const governmentPlanId = 'plan-1';

    const documents = [
      Document.create({
        governmentPlanId,
        title: 'Plano de Governo 2026',
        type: 'GOVERNMENT_PLAN',
        content: 'Conteúdo do plano de governo.',
      }),
      Document.create({
        governmentPlanId,
        title: 'Documento Oficial',
        type: 'OFFICIAL_DOCUMENT',
        content: 'Conteúdo do documento oficial.',
      }),
    ];

    const documentRepository: DocumentRepository = {
      findById: vi.fn(),
      findByGovernmentPlanId: vi.fn().mockResolvedValue(documents),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new ListDocumentsByGovernmentPlanUseCase(
      documentRepository,
    );

    const result = await useCase.execute(governmentPlanId);

    expect(result).toEqual(documents);
    expect(
      documentRepository.findByGovernmentPlanId,
    ).toHaveBeenCalledWith(governmentPlanId);
  });
});
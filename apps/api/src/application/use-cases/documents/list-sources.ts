import { type Source } from '../../../domain/entities/source.js';
import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

export class ListSourcesUseCase {
  constructor(private readonly sourceRepository: SourceRepository) {}

  async execute(): Promise<Source[]> {
    return this.sourceRepository.findAll();
  }
}
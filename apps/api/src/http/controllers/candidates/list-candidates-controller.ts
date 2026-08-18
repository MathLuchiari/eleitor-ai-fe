import { ListCandidatesUseCase } from '../../../application/use-cases/candidates/list-candidates.js';

export class ListCandidatesController {
  constructor(
    private readonly listCandidatesUseCase: ListCandidatesUseCase,
  ) {}

  async handle() {
    const candidates = await this.listCandidatesUseCase.execute();

    return {
      statusCode: 200,
      body: candidates,
    };
  }
}
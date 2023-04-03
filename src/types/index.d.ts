declare module 'lib' {
  type GeneratorError = {
    customData?: Record<string, unknown>;
    message: string;
    status: number;
  }

  type GeneratorGame = {
    awayTeam: string;
    customData?: Record<string, unknown>;
    homeTeam: string;
    id?: string;
    round: number;
    score?: string;
  }

  type GeneratorGameCustomData = {
    awayTeam?: string;
    homeTeam?: string;
  }

  type GeneratorOptions = {
    completeCup?: boolean;
    toBeDefinedValue?: string;
    type: string;
  }

  type GeneratorResponse = {
    data: GeneratorGame[];
    errors?: GeneratorError[];
  }
}
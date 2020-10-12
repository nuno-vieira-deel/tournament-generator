export interface GeneratorError {
  customData?: Record<string, unknown>
  message: string
  status: number
}

export interface GeneratorGame {
  awayTeam: string,
  customData?: Record<string, unknown>
  homeTeam: string,
  id?: string,
  round: number,
  score?: string
}

export interface GeneratorOptions {
  toBeDefinedValue?: string,
  type: string
}

export interface GeneratorResponse {
  data: GeneratorGame[],
  errors?: GeneratorError[]
}
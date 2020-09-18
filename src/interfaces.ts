export interface GeneratorError {
  message: string
  status: number
}

export interface GeneratorGame {
  awayTeam: string,
  homeTeam: string,
  round: number,
  score?: string
}

export interface GeneratorOptions {
  type: string
}

export interface GeneratorResponse {
  data: GeneratorGame[],
  errors?: GeneratorError[]
}
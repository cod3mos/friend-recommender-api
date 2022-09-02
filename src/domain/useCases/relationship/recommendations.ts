export interface ListRecommendations {
    listRecommendations(cpf: string): Promise<string[]>
}

export interface GenerateDishSuggestionResponse {
  message: string;
}

export interface MessageSent {
  role: string;
  content: string;
}

export interface GenerateDishSuggestionRequest {
  messages: MessageSent[];
  restaurantId: string;
}

export abstract class GenerateDishSuggestion {
  abstract generate(
    request: GenerateDishSuggestionRequest,
  ): Promise<GenerateDishSuggestionResponse>;
}

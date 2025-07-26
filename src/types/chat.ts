export interface ChatRequest {
  message: string;
  userId?: string;
}

export interface ChatResponse {
  message: string;
  timestamp: string;
  requestId: string;
}

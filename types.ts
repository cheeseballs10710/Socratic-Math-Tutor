
export enum Role {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface ImagePart {
  inlineData: {
    mimeType: string;
    data: string;
  };
}

export interface TextPart {
  text: string;
}

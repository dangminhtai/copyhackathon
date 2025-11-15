
import { GoogleGenAI, Chat } from "@google/genai";
import { ERROR_MESSAGES } from "../config/errors";

export interface ChatMessage {
  text: string;
  role: 'user' | 'model';
  timestamp: Date;
}

const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Giả lập lưu trữ lịch sử chat ở phía client để đơn giản hóa
// Trong ứng dụng thực tế, bạn sẽ gọi API đến backend để lưu trữ
const chatHistory: { [key: string]: ChatMessage[] } = {};
let chatInstance: Chat | null = null;

export class ChatService {
  private static getChannelKey(userId: string, channelId: string): string {
    return `${userId}-${channelId}`;
  }

  static async sendMessage(
    userId: string,
    channelId: string,
    message: string
  ): Promise<string> {
    if (!apiKey || !ai) {
      throw new Error(ERROR_MESSAGES.API_KEY_NOT_CONFIGURED);
    }

    try {
      const history = await this.getHistory(userId, channelId);
      
      const geminiHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Khởi tạo chat session nếu chưa có
      if (!chatInstance) {
          chatInstance = ai.chats.create({
            model: "gemini-2.5-flash",
            history: geminiHistory,
            config: {
              systemInstruction: "Bạn là trợ lý AI định hướng nghề nghiệp cho học sinh, sinh viên. Bạn giúp họ khám phá con đường học tập và sự nghiệp phù hợp. Hãy đưa ra lời khuyên hữu ích, thực tế và động viên họ.",
            }
          });
      }

      const response = await chatInstance.sendMessage({ message });
      const responseText = response.text;

      // Lưu message mới vào lịch sử
      const userMessage: ChatMessage = { text: message, role: 'user', timestamp: new Date() };
      const modelMessage: ChatMessage = { text: responseText, role: 'model', timestamp: new Date() };
      await this.saveHistory(userId, channelId, [...history, userMessage, modelMessage]);

      return responseText;
    } catch (error: any) {
      console.error('Error sending message:', error);
      throw new Error(error?.message || ERROR_MESSAGES.GENERIC_ERROR);
    }
  }

  static async getHistory(userId: string, channelId: string): Promise<ChatMessage[]> {
    const key = this.getChannelKey(userId, channelId);
    return Promise.resolve(chatHistory[key] || []);
  }

  static async saveHistory(userId: string, channelId: string, messages: ChatMessage[]): Promise<void> {
    const key = this.getChannelKey(userId, channelId);
    chatHistory[key] = messages;
    return Promise.resolve();
  }

  static async clearHistory(userId: string, channelId: string): Promise<void> {
    const key = this.getChannelKey(userId, channelId);
    delete chatHistory[key];
    chatInstance = null; // Reset chat instance
    return Promise.resolve();
  }
}

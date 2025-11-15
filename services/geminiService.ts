import { GoogleGenAI, Type } from "@google/genai";
import { MajorSuggestion, CareerSuggestion } from '../types';

// Khởi tạo AI client một lần.
// Ứng dụng sẽ báo lỗi nếu process.env.API_KEY không được thiết lập.
// Vui lòng đảm bảo bạn đã tạo file .env và thêm API key vào đó.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const suggestMajorsForRoadmap = async (roadmapName: string): Promise<MajorSuggestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Dựa trên lộ trình học tập "${roadmapName}", hãy đề xuất 5 chuyên ngành đại học phù hợp. Với mỗi chuyên ngành, cung cấp một mô tả ngắn gọn (2-3 câu) và danh sách các kỹ năng cốt lõi cần có.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              majorName: {
                type: Type.STRING,
                description: "Tên của chuyên ngành được đề xuất.",
              },
              description: {
                type: Type.STRING,
                description: "Mô tả ngắn gọn về chuyên ngành.",
              },
              coreSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Danh sách các kỹ năng cốt lõi cần thiết cho chuyên ngành.",
              },
            },
            required: ["majorName", "description", "coreSkills"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText.startsWith('[') || !jsonText.endsWith(']')) {
        console.error("Dữ liệu trả về không phải là một mảng JSON hợp lệ:", jsonText);
        throw new Error("Định dạng phản hồi từ AI không đúng. Vui lòng thử lại.");
    }
    const suggestions: MajorSuggestion[] = JSON.parse(jsonText);
    return suggestions;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API để gợi ý chuyên ngành:", error);
    if (error instanceof Error && (error.message.includes("API key not valid") || error.message.includes("API Key"))) {
        throw new Error("API Key không hợp lệ hoặc bị thiếu. Vui lòng kiểm tra lại file .env của bạn.");
    }
    throw new Error("Không thể nhận được gợi ý chuyên ngành. Vui lòng thử lại sau.");
  }
};

export const suggestCareersForSubjects = async (subjectNames: string[]): Promise<CareerSuggestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Tôi là một sinh viên đại học và các môn học yêu thích của tôi là: ${subjectNames.join(', ')}. Dựa trên những sở thích này, hãy đề xuất 5 định hướng nghề nghiệp tiềm năng. Với mỗi định hướng, cung cấp một mô tả ngắn gọn về công việc và lý do tại sao nó phù hợp với các môn học đã chọn.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              careerName: {
                type: Type.STRING,
                description: "Tên của định hướng nghề nghiệp.",
              },
              description: {
                type: Type.STRING,
                description: "Mô tả ngắn gọn về công việc và triển vọng.",
              },
              suitability: {
                type: Type.STRING,
                description: "Giải thích tại sao nghề nghiệp này lại phù hợp với các môn học đã chọn.",
              },
            },
            required: ["careerName", "description", "suitability"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    if (!jsonText.startsWith('[') || !jsonText.endsWith(']')) {
        console.error("Dữ liệu trả về không phải là một mảng JSON hợp lệ:", jsonText);
        throw new Error("Định dạng phản hồi từ AI không đúng. Vui lòng thử lại.");
    }
    const suggestions: CareerSuggestion[] = JSON.parse(jsonText);
    return suggestions;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API để gợi ý nghề nghiệp:", error);
    if (error instanceof Error && (error.message.includes("API key not valid") || error.message.includes("API Key"))) {
        throw new Error("API Key không hợp lệ hoặc bị thiếu. Vui lòng kiểm tra lại file .env của bạn.");
    }
    throw new Error("Không thể nhận được gợi ý nghề nghiệp. Vui lòng thử lại sau.");
  }
};
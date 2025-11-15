import { GoogleGenAI, Type, GenerateContentRequest } from "@google/genai";
import { QuizTurn, NextQuizStep, MajorDetails, MajorSuggestion, CareerSuggestion, QuizRecommendation } from "../../../client/src/class/types"; // Tái sử dụng types từ client cho nhất quán

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API Key chưa được cấu hình trên server.");
}
const ai = new GoogleGenAI({ apiKey });

// Helper function to safely parse JSON
async function callAIAndParseJSON<T>(request: GenerateContentRequest): Promise<T> {
    try {
        const response = await ai.models.generateContent(request);
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (error: any) {
        console.error("Lỗi khi gọi AI hoặc parse JSON:", error);
        console.error("Request đã gửi:", JSON.stringify(request.contents));
        throw new Error(`Lỗi từ AI service: ${error.message}`);
    }
}


// --- CHAT SERVICE ---
export const getChatResponse = async (history: any[], message: string): Promise<string> => {
    const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        history: history,
        config: {
            systemInstruction: "Bạn là trợ lý AI định hướng nghề nghiệp cho học sinh, sinh viên. Bạn giúp họ khám phá con đường học tập và sự nghiệp phù hợp. Hãy đưa ra lời khuyên hữu ích, thực tế và động viên họ.",
        }
    });
    const response = await chat.sendMessage({ message });
    return response.text;
}

// --- EXPLORATION SERVICES ---

export const suggestMajorsForRoadmap = async (roadmapName: string): Promise<MajorSuggestion[]> => {
    const request: GenerateContentRequest = {
        model: "gemini-2.5-flash",
        contents: `Dựa trên lộ trình học tập "${roadmapName}", hãy đề xuất 5 chuyên ngành đại học phù hợp. Với mỗi chuyên ngành, cung cấp mô tả ngắn gọn (2-3 câu) và danh sách các kỹ năng cốt lõi cần có.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { majorName: { type: Type.STRING }, description: { type: Type.STRING }, coreSkills: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
        }
    };
    return callAIAndParseJSON<MajorSuggestion[]>(request);
};

export const suggestCareersForSubjects = async (subjectNames: string[]): Promise<CareerSuggestion[]> => {
    const subjectsText = subjectNames.join(', ');
    const request: GenerateContentRequest = {
        model: "gemini-2.5-flash",
        contents: `Tôi là một sinh viên đại học và các môn học yêu thích của tôi là: ${subjectsText}. Dựa trên những sở thích này, hãy đề xuất 5 định hướng nghề nghiệp tiềm năng. Với mỗi định hướng, cung cấp một mô tả ngắn gọn về công việc và lý do tại sao nó phù hợp với các môn học đã chọn.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { careerName: { type: Type.STRING }, description: { type: Type.STRING }, suitability: { type: Type.STRING } } } }
        }
    };
    return callAIAndParseJSON<CareerSuggestion[]>(request);
};

export const getMajorDetails = async (majorName: string): Promise<MajorDetails> => {
    const request: GenerateContentRequest = {
        model: "gemini-2.5-flash",
        contents: `Cung cấp thông tin chi tiết về chuyên ngành đại học "${majorName}". Thông tin cần bao gồm: 1. Mục tiêu đào tạo (trainingObjectives). 2. Các môn học chính (mainSubjects). 3. Các môn học tự chọn (electiveSubjects). 4. Lộ trình học tập (curriculumRoadmap). 5. Định hướng nghề nghiệp (careerOrientations).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { trainingObjectives: { type: Type.STRING }, mainSubjects: { type: Type.ARRAY, items: { type: Type.STRING } }, electiveSubjects: { type: Type.ARRAY, items: { type: Type.STRING } }, curriculumRoadmap: { type: Type.ARRAY, items: { type: Type.STRING } }, careerOrientations: { type: Type.ARRAY, items: { type: Type.STRING } } } }
        }
    };
    return callAIAndParseJSON<MajorDetails>(request);
};

// --- QUIZ SERVICES ---

export const generateNextQuizQuestion = async (history: QuizTurn[]): Promise<NextQuizStep> => {
    const historyText = history.length > 0
      ? history.map(turn => `Q: ${turn.question}\nA: ${turn.answer}`).join('\n\n')
      : "Đây là câu hỏi đầu tiên.";
      
    const request: GenerateContentRequest = {
        model: "gemini-2.5-flash",
        contents: `Bạn là một AI tư vấn hướng nghiệp đang thực hiện một bài trắc nghiệm tương tác. Dựa trên lịch sử câu hỏi và câu trả lời dưới đây, hãy tạo ra CÂU HỎI TIẾP THEO để hiểu sâu hơn về người dùng. Câu hỏi cần ngắn gọn, sâu sắc và giúp làm rõ hơn sở thích hoặc tính cách của họ. Đồng thời, cung cấp 3 lựa chọn trả lời (options) ngắn gọn, khác biệt cho câu hỏi đó. LỊCH SỬ: ${historyText}. QUAN TRỌNG: Nếu bạn cảm thấy đã có đủ thông tin (sau 3-5 câu), hãy trả về JSON với "isComplete" là true. Ngược lại, trả về "question", "options", và "isComplete" là false.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { question: { type: Type.STRING, nullable: true }, options: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true }, isComplete: { type: Type.BOOLEAN } } }
        }
    };
    return callAIAndParseJSON<NextQuizStep>(request);
};

export const getQuizRecommendations = async (answers: QuizTurn[]): Promise<QuizRecommendation[]> => {
    const answersText = answers.map(a => `- ${a.question}: ${a.answer}`).join('\n');
    const request: GenerateContentRequest = {
        model: "gemini-2.5-flash",
        contents: `Một sinh viên đã trả lời các câu hỏi sau: ${answersText}. Dựa trên đó, phân tích và đề xuất 3 định hướng nghề nghiệp phù hợp nhất. Với mỗi định hướng, cung cấp: tên nghề (careerName), mô tả (description), lý do phù hợp (suitability), và các ngành học gợi ý (suggestedMajors).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { careerName: { type: Type.STRING }, description: { type: Type.STRING }, suitability: { type: Type.STRING }, suggestedMajors: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
        }
    };
    return callAIAndParseJSON<QuizRecommendation[]>(request);
};

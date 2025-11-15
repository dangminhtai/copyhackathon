
import { Roadmap, Subject, QuizQuestion } from '../class/types';
import { Code, Briefcase, Palette, HeartPulse, Users, BookUser } from 'lucide-react';

export const ROADMAPS: Roadmap[] = [
  {
    id: 'tech',
    name: 'Công nghệ & Kỹ thuật',
    description: 'Dành cho những người đam mê sáng tạo công nghệ, giải quyết vấn đề bằng logic và thuật toán.',
    icon: Code,
  },
  {
    id: 'business',
    name: 'Kinh doanh & Quản lý',
    description: 'Phù hợp với những ai có tư duy chiến lược, kỹ năng lãnh đạo và mong muốn phát triển kinh tế.',
    icon: Briefcase,
  },
  {
    id: 'arts',
    name: 'Nghệ thuật & Nhân văn',
    description: 'Con đường cho các tâm hồn sáng tạo, yêu cái đẹp, và muốn khám phá văn hóa, xã hội con người.',
    icon: Palette,
  },
  {
    id: 'health',
    name: 'Khoa học Sức khỏe',
    description: 'Lĩnh vực dành cho những ai muốn chăm sóc sức khỏe, nghiên cứu y học và cải thiện cuộc sống.',
    icon: HeartPulse,
  },
  {
    id: 'social',
    name: 'Khoa học Xã hội',
    description: 'Khám phá các khía cạnh của xã hội, hành vi con người, và các cấu trúc chính trị, văn hóa.',
    icon: Users,
  },
  {
    id: 'education',
    name: 'Giáo dục & Đào tạo',
    description: 'Dành cho những người có đam mê truyền đạt kiến thức và định hình tương lai cho thế hệ trẻ.',
    icon: BookUser,
  },
];

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Toán cao cấp' },
  { id: 'physics', name: 'Vật lý đại cương' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'data_structures', name: 'Cấu trúc dữ liệu & Giải thuật' },
  { id: 'microeconomics', name: 'Kinh tế vi mô' },
  { id: 'marketing', name: 'Marketing căn bản' },
  { id: 'psychology', name: 'Tâm lý học đại cương' },
  { id: 'philosophy', name: 'Triết học Mác-Lênin' },
  { id: 'literature', name: 'Văn học Việt Nam hiện đại' },
  { id: 'biology', name: 'Sinh học phân tử' },
  { id: 'chemistry', name: 'Hóa học hữu cơ' },
  { id: 'law', name: 'Pháp luật đại cương' },
];

export const INITIAL_QUIZ_QUESTION: QuizQuestion = {
  question: 'Để bắt đầu, hãy cho tôi biết: Bạn bị thu hút bởi loại hoạt động nào nhất?',
  options: [
    'Làm việc với ý tưởng, dữ liệu và phân tích logic.',
    'Sáng tạo nghệ thuật, thiết kế hoặc thể hiện bản thân.',
    'Làm việc thực tế, thủ công, hoặc các hoạt động thể chất.',
    'Tương tác, giao tiếp và giúp đỡ mọi người.',
  ],
};

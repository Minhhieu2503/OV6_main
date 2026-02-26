import { Crosshair, Radio, GraduationCap } from 'lucide-react';

export const SERVICES = [
  {
    title: 'Mentoring 1-1',
    icon: Crosshair,
    audience: 'Dành cho trader nghiêm túc muốn phát triển bền vững',
    includes: [
      'Phân tích phong cách trading cá nhân',
      'Xây dựng kế hoạch giao dịch riêng',
      'Review trade và cải thiện điểm yếu',
      'Hỗ trợ tâm lý và mindset',
      'Kèm cặp liên tục qua Telegram'
    ]
  },
  {
    title: 'Nhóm Signal',
    icon: Radio,
    audience: 'Dành cho trader muốn học hỏi và tham khảo ý kiến',
    includes: [
      'Phân tích thị trường hàng ngày',
      'Setup giao dịch tiềm năng',
      'Giải thích logic đằng sau mỗi setup',
      'Cộng đồng trader hỗ trợ lẫn nhau',
      'Không cam kết lợi nhuận'
    ]
  },
  {
    title: 'Khóa Học Trading',
    icon: GraduationCap,
    audience: 'Dành cho người mới bắt đầu và trader cần hệ thống lại kiến thức',
    includes: [
      'Từ cơ bản đến nâng cao',
      'Price Action & ICT concepts',
      'Quản lý vốn và tâm lý',
      'Xây dựng trading plan',
      'Tài liệu và bài tập thực hành'
    ]
  }
];


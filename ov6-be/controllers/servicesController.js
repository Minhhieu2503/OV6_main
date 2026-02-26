// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    // Services data (can be moved to database later)
    const services = [
      {
        id: 1,
        title: 'Mentoring 1-1',
        icon: 'Users',
        audience: 'Dành cho trader nghiêm túc muốn phát triển bền vững',
        includes: [
          'Phân tích phong cách trading cá nhân',
          'Xây dựng kế hoạch giao dịch riêng',
          'Review trade và cải thiện điểm yếu',
          'Hỗ trợ tâm lý và mindset',
          'Kèm cặp liên tục qua Telegram'
        ],
        price: 'Liên hệ',
        duration: 'Theo nhu cầu'
      },
      {
        id: 2,
        title: 'Nhóm Signal',
        icon: 'Send',
        audience: 'Dành cho trader muốn học hỏi và tham khảo ý kiến',
        includes: [
          'Phân tích thị trường hàng ngày',
          'Setup giao dịch tiềm năng',
          'Giải thích logic đằng sau mỗi setup',
          'Cộng đồng trader hỗ trợ lẫn nhau',
          'Không cam kết lợi nhuận'
        ],
        price: 'Liên hệ',
        duration: 'Hàng tháng'
      },
      {
        id: 3,
        title: 'Khóa Học Trading',
        icon: 'BookOpen',
        audience: 'Dành cho người mới bắt đầu và trader cần hệ thống lại kiến thức',
        includes: [
          'Từ cơ bản đến nâng cao',
          'Price Action & ICT concepts',
          'Quản lý vốn và tâm lý',
          'Xây dựng trading plan',
          'Tài liệu và bài tập thực hành'
        ],
        price: 'Liên hệ',
        duration: '8-12 tuần'
      }
    ];

    res.json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
};


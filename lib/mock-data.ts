// Static mock data powering every screen in this first pass. No backend/API calls yet.

export const avatar = (seed: string) => `https://i.pravatar.cc/150?u=${seed}`;
export const photo = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const me = {
  id: 'u1',
  name: 'Abhishek',
  fullName: 'Abhishek Sharma',
  email: 'abhishek@college.edu',
  course: 'B.Tech CSE',
  semester: 4,
  role: 'Student' as const,
  avatar: avatar('abhishek'),
  points: 1240,
  rank: 12,
  postsCount: 18,
};

export const courses = ['MCA', 'BCA', 'BSc IT'];

// BCA / BSc IT run 6 semesters, MCA 4 — so nothing above 6 exists anymore.
export const semesters = [1, 2, 3, 4, 5, 6];

export type NoticeCategory = 'Urgent' | 'Exam' | 'Event' | 'General';

export const noticeCategoryColor: Record<NoticeCategory, string> = {
  Urgent: 'danger',
  Exam: 'warning',
  Event: 'primary',
  General: 'mint',
};

export const notices = [
  {
    id: 'n1',
    category: 'Urgent' as NoticeCategory,
    title: 'Mid-sem exam hall allotment released',
    preview:
      'Hall tickets and seating arrangement for the mid-semester examinations have been published. Please check your seat number before Friday.',
    body: 'Hall tickets and seating arrangement for the mid-semester examinations have been published on the student portal. Please check your seat number and reporting time before Friday 9 AM. Students without a downloaded hall ticket will not be allowed to sit for the exam. Contact the exam cell for any discrepancies in your roll number or subject code.',
    author: 'Exam Cell',
    authorAvatar: avatar('examcell'),
    time: '2h ago',
    date: 'Oct 12, 2026',
    unread: true,
    pinned: true,
    attachment: { name: 'Seating_Plan_MidSem.pdf', size: '1.2 MB' },
  },
  {
    id: 'n2',
    category: 'Exam' as NoticeCategory,
    title: 'Internal assessment-2 schedule',
    preview:
      'The second internal assessment for all CSE courses will be conducted from Oct 20-24. Syllabus covers units 3 and 4.',
    body: 'The second internal assessment for all CSE courses will be conducted from Oct 20–24. Syllabus covers units 3 and 4 as discussed in class. Students are advised to collect revised question banks from their respective faculty advisors.',
    author: 'Academic Office',
    authorAvatar: avatar('academic'),
    time: '5h ago',
    date: 'Oct 12, 2026',
    unread: true,
    attachment: null,
  },
  {
    id: 'n3',
    category: 'Event' as NoticeCategory,
    title: 'Annual tech fest "Ignite 2026" registrations open',
    preview:
      'Registrations for Ignite 2026 are now open. Hackathon, robotics, design and gaming tracks available with cash prizes.',
    body: 'Registrations for Ignite 2026 are now open. Hackathon, robotics, design and gaming tracks available with cash prizes worth ₹2,00,000. Teams of up to 4 members can register through the student portal before Oct 25.',
    author: 'Student Council',
    authorAvatar: avatar('council'),
    time: '1d ago',
    date: 'Oct 11, 2026',
    unread: false,
    attachment: { name: 'Ignite2026_Brochure.pdf', size: '3.4 MB' },
  },
  {
    id: 'n4',
    category: 'General' as NoticeCategory,
    title: 'Library extended hours during exam week',
    preview:
      'The central library will remain open till midnight from Oct 18 to Oct 26 to support exam preparation.',
    body: 'The central library will remain open till midnight from Oct 18 to Oct 26 to support exam preparation. Group discussion rooms can be booked via the library app.',
    author: 'Library Admin',
    authorAvatar: avatar('library'),
    time: '2d ago',
    date: 'Oct 10, 2026',
    unread: false,
    attachment: null,
  },
];

export const notifications = {
  today: [
    { id: 'f1', icon: 'bell', title: 'New urgent notice posted', subtitle: 'Mid-sem exam hall allotment released', time: '2h ago' },
    { id: 'f2', icon: 'heart', title: 'Priya liked your post', subtitle: 'Campus fest setup looks amazing!', time: '3h ago' },
    { id: 'f3', icon: 'trophy', title: 'Quiz result is out', subtitle: 'You scored 8/10 in DBMS Quiz', time: '6h ago' },
  ],
  earlier: [
    { id: 'f4', icon: 'message-circle', title: 'New message in CSE Sem 4 group', subtitle: 'Rahul: anyone has notes for unit 4?', time: '1d ago' },
    { id: 'f5', icon: 'user-plus', title: 'Your account was approved', subtitle: 'Welcome to Campus Connect!', time: '3d ago' },
  ],
};

export const posts = [
  {
    id: 'p1',
    author: 'Priya Verma',
    avatar: avatar('priya'),
    course: 'B.Tech CSE',
    time: '1h ago',
    images: [photo('fest1'), photo('fest2'), photo('fest3')],
    likes: 142,
    comments: 24,
    caption:
      'Campus fest setup looks absolutely amazing this year 🎉 can\'t wait for the main event tomorrow!',
    liked: false,
    saved: false,
  },
  {
    id: 'p2',
    author: 'Rahul Mehta',
    avatar: avatar('rahul'),
    course: 'B.Tech ECE',
    time: '3h ago',
    images: [] as string[],
    likes: 38,
    comments: 6,
    caption:
      'PSA: the library group discussion rooms can now be booked online. Game changer for finals week 📚',
    liked: true,
    saved: false,
  },
  {
    id: 'p3',
    author: 'Sneha Kapoor',
    avatar: avatar('sneha'),
    course: 'BBA',
    time: '6h ago',
    images: [photo('team1'), photo('team2')],
    likes: 96,
    comments: 11,
    caption: 'Our hackathon team after 24 hours of no sleep 😅 worth it though!',
    liked: false,
    saved: true,
  },
];

export const myPosts = [
  { id: 'mp1', image: photo('mypost1'), status: 'Approved' as const },
  { id: 'mp2', image: photo('mypost2'), status: 'Pending' as const },
  { id: 'mp3', image: photo('mypost3'), status: 'Approved' as const },
  { id: 'mp4', image: photo('mypost4'), status: 'Rejected' as const },
  { id: 'mp5', image: photo('mypost5'), status: 'Approved' as const },
  { id: 'mp6', image: photo('mypost6'), status: 'Pending' as const },
];

export const comments = [
  { id: 'c1', author: 'Rahul Mehta', avatar: avatar('rahul'), text: 'This looks incredible! 🔥', time: '45m', likes: 4 },
  { id: 'c2', author: 'Sneha Kapoor', avatar: avatar('sneha'), text: 'Who designed the stage backdrop?', time: '30m', likes: 1 },
  { id: 'c3', author: 'Aman Gupta', avatar: avatar('aman'), text: 'See you all there tomorrow!', time: '12m', likes: 2 },
];

export const groups = [
  { id: 'g1', name: 'CSE Sem 4 - Official', icon: avatar('cse4'), lastMessage: 'Rahul: anyone has notes for unit 4?', time: '2m', unread: 3, members: 64 },
  { id: 'g2', name: 'Hackathon Squad', icon: avatar('hack'), lastMessage: 'You: pushed the final build', time: '1h', unread: 0, members: 4 },
  { id: 'g3', name: 'Badminton Club', icon: avatar('badminton'), lastMessage: 'Priya: practice at 6 AM tomorrow', time: '3h', unread: 5, members: 28 },
  { id: 'g4', name: 'Placement Prep 2027', icon: avatar('placement'), lastMessage: 'Shared a PDF', time: '1d', unread: 0, members: 212 },
];

export const communityMessages = [
  { id: 'm1', mine: false, author: 'Priya Verma', avatar: avatar('priya'), text: 'Good morning campus! ☀️', time: '9:02 AM' },
  { id: 'm2', mine: false, author: 'Rahul Mehta', avatar: avatar('rahul'), image: photo('chatimg1', 500, 400), time: '9:05 AM' },
  { id: 'm3', mine: true, text: 'That looks great, where is this?', time: '9:06 AM' },
  { id: 'm4', mine: false, author: 'Rahul Mehta', avatar: avatar('rahul'), text: 'Near the new cafeteria block', time: '9:07 AM' },
  { id: 'm5', mine: true, poll: { question: 'Best time for the badminton meetup?', options: [
    { label: '6 AM', pct: 52 },
    { label: '6 PM', pct: 31 },
    { label: '8 PM', pct: 17 },
  ], votes: 83, timeLeft: '5h left', voted: true }, time: '9:10 AM' },
];

export const groupFiles = [
  { id: 'file1', name: 'Unit4_DBMS_Notes.pdf', type: 'pdf', size: '2.1 MB', uploader: 'Rahul Mehta', date: 'Oct 10' },
  { id: 'file2', name: 'Assignment_Guidelines.docx', type: 'docx', size: '540 KB', uploader: 'Priya Verma', date: 'Oct 9' },
  { id: 'file3', name: 'Project_Presentation.pptx', type: 'ppt', size: '6.8 MB', uploader: 'Aman Gupta', date: 'Oct 7' },
];

export type QuizStatus = 'live' | 'upcoming' | 'completed';

export const quizzes = [
  { id: 'q1', subject: 'DBMS', title: 'Database Normalization', questions: 10, time: 15, points: 100, status: 'live' as QuizStatus },
  { id: 'q2', subject: 'OS', title: 'Process Scheduling', questions: 12, time: 18, points: 120, status: 'upcoming' as QuizStatus, startsIn: 'Fri 4:00 PM' },
  { id: 'q3', subject: 'CN', title: 'OSI & TCP/IP Layers', questions: 10, time: 15, points: 100, status: 'upcoming' as QuizStatus, startsIn: 'Mon 10:00 AM' },
  { id: 'q4', subject: 'DSA', title: 'Trees & Graphs', questions: 15, time: 20, points: 150, status: 'completed' as QuizStatus, score: '12/15' },
  { id: 'q5', subject: 'Maths', title: 'Probability Basics', questions: 10, time: 12, points: 90, status: 'completed' as QuizStatus, score: '8/10' },
];

export const quizQuestions = [
  { id: 1, text: 'Which normal form eliminates transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 2 },
  { id: 2, text: 'A relation is in 2NF if it is in 1NF and has no:', options: ['Partial dependency', 'Transitive dependency', 'Multivalued dependency', 'Join dependency'], correct: 0 },
  { id: 3, text: 'BCNF stands for:', options: ['Basic Candidate Normal Form', 'Boyce-Codd Normal Form', 'Binary Code Normal Form', 'Block Candidate Normal Form'], correct: 1 },
  { id: 4, text: 'Which key uniquely identifies a row in a table?', options: ['Foreign key', 'Candidate key', 'Primary key', 'Composite key'], correct: 2 },
  { id: 5, text: 'Denormalization is primarily done to improve:', options: ['Data integrity', 'Read performance', 'Write performance', 'Storage efficiency'], correct: 1 },
];

export const leaderboard = [
  { rank: 1, name: 'Aman Gupta', course: 'B.Tech CSE', points: 2840, avatar: avatar('aman') },
  { rank: 2, name: 'Sneha Kapoor', course: 'BBA', points: 2715, avatar: avatar('sneha') },
  { rank: 3, name: 'Rahul Mehta', course: 'B.Tech ECE', points: 2598, avatar: avatar('rahul') },
  { rank: 4, name: 'Priya Verma', course: 'B.Tech CSE', points: 2341, avatar: avatar('priya'), trend: 'up' as const },
  { rank: 5, name: 'Kabir Singh', course: 'BCA', points: 2190, avatar: avatar('kabir'), trend: 'down' as const },
  { rank: 6, name: 'Ritika Jain', course: 'B.Com', points: 2088, avatar: avatar('ritika'), trend: 'up' as const },
  { rank: 7, name: 'Dev Patel', course: 'B.Tech Mechanical', points: 1980, avatar: avatar('dev'), trend: 'up' as const },
  { rank: 8, name: 'Neha Sharma', course: 'B.Tech CSE', points: 1902, avatar: avatar('neha'), trend: 'down' as const },
];

export const myRank = { rank: 12, points: 1240, trend: 'up' as const };

export const adminStats = {
  totalStudents: 3240,
  pendingApprovals: 18,
  activeToday: 1184,
  bannedUsers: 6,
  activeUsersWeek: [420, 512, 480, 610, 590, 702, 668],
  readRates: [
    { label: 'Mid-sem hall allotment', pct: 92 },
    { label: 'IA-2 schedule', pct: 78 },
    { label: 'Ignite 2026', pct: 65 },
    { label: 'Library hours', pct: 44 },
  ],
  quizAttempted: 72,
  quizMissed: 28,
  topPosts: [
    { id: 'tp1', author: 'Priya Verma', avatar: avatar('priya'), likes: 142, comments: 24 },
    { id: 'tp2', author: 'Sneha Kapoor', avatar: avatar('sneha'), likes: 96, comments: 11 },
    { id: 'tp3', author: 'Aman Gupta', avatar: avatar('aman'), likes: 81, comments: 9 },
  ],
};

export const pendingUsers = [
  { id: 'pu1', name: 'Karan Malhotra', course: 'B.Tech CSE', semester: 2, email: 'karan@college.edu', avatar: avatar('karan') },
  { id: 'pu2', name: 'Isha Reddy', course: 'BCA', semester: 1, email: 'isha@college.edu', avatar: avatar('isha') },
  { id: 'pu3', name: 'Yash Thakur', course: 'B.Com', semester: 3, email: 'yash@college.edu', avatar: avatar('yash') },
];

export const pendingPosts = [
  { id: 'pp1', author: 'Vikram Rao', avatar: avatar('vikram'), image: photo('pending1'), caption: 'Freshers party vibes 🎊', time: '20m ago' },
  { id: 'pp2', author: 'Anjali Nair', avatar: avatar('anjali'), image: photo('pending2'), caption: 'Our robotics club prototype!', time: '1h ago' },
];

export const reports = [
  { id: 'r1', postAuthor: 'Unknown User', reason: 'Spam', image: photo('report1'), reportedBy: 3 },
  { id: 'r2', postAuthor: 'Anonymous', reason: 'Inappropriate', image: photo('report2'), reportedBy: 1 },
];

export const allUsers = [
  { id: 'au1', name: 'Priya Verma', course: 'B.Tech CSE', role: 'Student', status: 'Active', avatar: avatar('priya') },
  { id: 'au2', name: 'Rahul Mehta', course: 'B.Tech ECE', role: 'Student', status: 'Active', avatar: avatar('rahul') },
  { id: 'au3', name: 'Dr. Mehra', course: 'Faculty', role: 'Teacher', status: 'Active', avatar: avatar('mehra') },
  { id: 'au4', name: 'Suresh Kumar', course: 'BBA', role: 'Student', status: 'Banned', avatar: avatar('suresh') },
];

export const hardestQuestions = [
  { id: 1, text: 'BCNF stands for:', correctPct: 38 },
  { id: 2, text: 'Denormalization improves which aspect?', correctPct: 44 },
  { id: 3, text: 'Which key uniquely identifies a row?', correctPct: 51 },
];

export const missedStudents = [
  { id: 'ms1', name: 'Yash Thakur', course: 'B.Com', avatar: avatar('yash') },
  { id: 'ms2', name: 'Isha Reddy', course: 'BCA', avatar: avatar('isha') },
];

// ---------------------------------------------------------------------------
// Teacher role — quiz & notice creation
// ---------------------------------------------------------------------------

export const teacherMe = {
  id: 't1',
  name: 'Shweta Iyer',
  fullName: 'Dr. Shweta Iyer',
  email: 'shweta.iyer@college.edu',
  department: 'Mathematics',
  avatar: avatar('shweta'),
  role: 'Teacher' as const,
};

export const subjects = [
  'Mathematics – CS301',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Data Structures & Algorithms',
];

export type QuizVisibility = 'students' | 'private';
export type DraftStatus = 'draft' | 'upcoming' | 'live' | 'completed';

export type QuizQuestionDraft = {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: number | null;
  explanation?: string;
};

export type TeacherQuiz = {
  id: string;
  title: string;
  subject: string;
  course: string;
  semester: number;
  timeLimit: number; // minutes
  pointsPerQuestion: number;
  totalQuestions: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  visibility: QuizVisibility;
  status: DraftStatus;
  questions: QuizQuestionDraft[];
  attempted?: number;
  avgScore?: string;
};

export const teacherQuizzes: TeacherQuiz[] = [
  {
    id: 'tq1',
    title: 'Calculus Mid-Term Quiz',
    subject: 'Mathematics – CS301',
    course: 'MCA',
    semester: 3,
    timeLimit: 15,
    pointsPerQuestion: 10,
    totalQuestions: 10,
    startDate: 'Nov 15, 2026',
    startTime: '10:00 AM',
    endDate: 'Nov 15, 2026',
    endTime: '11:59 PM',
    visibility: 'students',
    status: 'draft',
    questions: [
      {
        id: 'q1',
        text: 'What is d/dx of x³?',
        options: ['2x²', '3x²', 'x²', '3x'],
        correctIndex: 1,
        explanation: 'Power rule: d/dx[xⁿ] = n·xⁿ⁻¹, so d/dx[x³] = 3x².',
      },
      {
        id: 'q2',
        text: 'The integral of x² dx is:',
        options: ['(1/2)x²', '(2/3)x³ + C', 'x³ + C', '2x + C'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'tq2',
    title: 'Linear Algebra Basics',
    subject: 'Mathematics – CS301',
    course: 'B.Tech CSE',
    semester: 2,
    timeLimit: 12,
    pointsPerQuestion: 10,
    totalQuestions: 8,
    startDate: 'Nov 8, 2026',
    startTime: '9:00 AM',
    endDate: 'Nov 8, 2026',
    endTime: '11:59 PM',
    visibility: 'students',
    status: 'completed',
    questions: [],
    attempted: 86,
    avgScore: '6.8/8',
  },
  {
    id: 'tq3',
    title: 'Probability & Statistics',
    subject: 'Mathematics – CS301',
    course: 'BCA',
    semester: 4,
    timeLimit: 15,
    pointsPerQuestion: 10,
    totalQuestions: 10,
    startDate: 'Nov 18, 2026',
    startTime: '2:00 PM',
    endDate: 'Nov 18, 2026',
    endTime: '11:59 PM',
    visibility: 'private',
    status: 'upcoming',
    questions: [],
  },
];

export type TeacherNotice = {
  id: string;
  title: string;
  description: string;
  category: NoticeCategory;
  audience: 'all' | 'course';
  targetCourse?: string;
  targetSemester?: number;
  date: string;
  readPct?: number;
};

export const teacherNotices: TeacherNotice[] = [
  {
    id: 'tn1',
    title: 'Mid-Semester Examination Schedule — Nov 2026',
    description:
      'Mid-semester exams will commence from November 15th. Kindly note your subject-wise schedule shared below and report 15 minutes before your slot.',
    category: 'Exam',
    audience: 'all',
    date: 'Oct 12, 2026',
    readPct: 74,
  },
  {
    id: 'tn2',
    title: 'Extra doubt-clearing session this Friday',
    description:
      'An additional doubt-clearing session for Calculus will be held this Friday at 4 PM in Room 204 for students who missed the last class.',
    category: 'General',
    audience: 'course',
    targetCourse: 'MCA',
    targetSemester: 3,
    date: 'Oct 10, 2026',
    readPct: 52,
  },
];

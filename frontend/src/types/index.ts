export interface JobRole {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface InterviewSession {
  id: string;
  jobRoleId: string;
  userId: string;
  status: 'pending' | 'active' | 'completed';
  currentQuestion: number;
  startTime: Date;
  answers: Answer[];
  feedback?: Feedback;
}

export interface Answer {
  questionId: string;
  answer: string;
  timeSpent: number;
}

export interface Feedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
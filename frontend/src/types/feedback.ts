export type FeedbackCategory = "SaaS" | "UI" | "Error";
export type FeedbackStatus = "Pendiente" | "Resuelto";

export interface Feedback {
  id: string;
  name: string;
  category: FeedbackCategory;
  comment: string;
  status: FeedbackStatus;
  createdAt: string;
}

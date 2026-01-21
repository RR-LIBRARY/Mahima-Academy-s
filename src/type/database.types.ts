export interface Course {
  id: string;
  title: string;
  description: string;
  price_inr: number;
  video_url?: string;
}

export interface PaymentRequest {
  id: string;
  user_id: string;
  course_id: string;
  upi_vpa: string;
  amount_inr: number;
  reference_id: string;
  status: 'pending' | 'paid' | 'rejected';
  created_at: string;
  users?: { email: string; full_name: string }; // Joined data
  courses?: { title: string }; // Joined data
}
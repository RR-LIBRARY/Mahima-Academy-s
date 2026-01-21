import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext'; // Assuming you have this

interface Props {
  courseId: string;
  coursePrice: number;
  adminVpa: string; // e.g., 'mahima@upi'
}

const UpiCheckoutForm = ({ courseId, coursePrice, adminVpa }: Props) => {
  const { user } = useAuth();
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please login first');
    setLoading(true);

    try {
      // Logic: Insert into payment_requests table
      const { error } = await supabase
        .from('payment_requests')
        .insert({
          user_id: user.id,
          course_id: courseId,
          upi_vpa: adminVpa,
          amount_inr: coursePrice,
          reference_id: refId,
          status: 'pending'
        });

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <h3 className="text-navy font-bold text-lg">Payment Request Sent</h3>
        <p className="text-gray-600 mt-2">
          We will verify Transaction ID: <span className="font-mono font-bold">{refId}</span> within 24 hours.
          Access will be granted automatically upon verification.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-navy mb-4">Secure Enrollment</h3>
      
      <div className="bg-saffron/10 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-700">Scan QR or pay to UPI ID:</p>
        <p className="text-lg font-mono font-bold text-navy mt-1">{adminVpa}</p>
        <p className="text-sm text-gray-700 mt-2">Amount: <span className="font-bold">₹{coursePrice}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Transaction / Reference ID
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 3245xxxxxxxx"
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:outline-none"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-saffron hover:bg-saffron-dark text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Confirm Payment Sent'}
        </button>
      </form>
    </div>
  );
};

export default UpiCheckoutForm;
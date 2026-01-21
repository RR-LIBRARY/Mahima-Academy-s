import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PaymentRequest } from '../../types/database.types';

const PaymentVerification = () => {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch pending requests
  const fetchPending = async () => {
    const { data, error } = await supabase
      .from('payment_requests')
      .select('*, users(email), courses(title)') // Join tables
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    
    if (data) setRequests(data as any);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleVerify = async (req: PaymentRequest) => {
    if (!confirm(`Confirm payment of ₹${req.amount_inr} for Ref: ${req.reference_id}?`)) return;
    setProcessingId(req.id);

    try {
      // 1. Update Payment Request Status
      const { error: updateError } = await supabase
        .from('payment_requests')
        .update({ status: 'paid' })
        .eq('id', req.id);

      if (updateError) throw updateError;

      // 2. Grant Access (Insert into purchases)
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: req.user_id,
          course_id: req.course_id,
          payment_id: req.id,
          amount_inr: req.amount_inr
        });

      if (purchaseError) throw purchaseError;

      // Refresh list
      await fetchPending();
      alert("Verification Successful. User enrolled.");

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-8 bg-paper min-h-screen">
      <h1 className="text-2xl font-bold text-navy mb-6">Payment Verification Desk</h1>
      
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-navy text-white">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">User</th>
              <th className="p-4">Course</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Ref ID</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-600">
                  {new Date(req.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 font-medium text-navy">
                  {/* @ts-ignore - Assuming join works */}
                  {req.users?.email}
                </td>
                <td className="p-4 text-gray-700">
                  {/* @ts-ignore */}
                  {req.courses?.title}
                </td>
                <td className="p-4 font-bold">₹{req.amount_inr}</td>
                <td className="p-4 font-mono text-saffron-dark">{req.reference_id}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleVerify(req)}
                    disabled={processingId === req.id}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {processingId === req.id ? 'Verifying...' : 'Verify & Enroll'}
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No pending payments. The Ashram is quiet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentVerification;
import React from 'react';
import { CreditCard, X, AlertCircle, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const bgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100";
  const headerBg = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const subText = isDarkMode ? "text-gray-400" : "text-gray-500";
  const cardHover = isDarkMode ? "hover:bg-gray-700 border-gray-600" : "hover:bg-gray-50 border-gray-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`${bgClass} rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100`}>
   
        <div className={`${headerBg} px-6 py-4 border-b ${borderClass} flex justify-between items-center`}>
          <h3 className="font-semibold flex items-center gap-2">
            <CreditCard className="text-blue-600" size={20} />
            Upgrade Plan
          </h3>
          <button onClick={onClose} className={`${subText} hover:text-gray-500 transition-colors`}>
            <X size={20} />
          </button>
        </div>

      
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-red-100 rounded-full shrink-0">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <h4 className="font-medium">Credits Expiring Soon</h4>
              <p className={`text-sm ${subText} mt-1`}>Your 450,000 credits are at risk. Upgrade to Pro.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className={`border border-blue-500 bg-blue-50/10 rounded-lg p-4 flex justify-between items-center cursor-pointer ring-1 ring-blue-500`}>
              <div>
                <div className="font-semibold text-blue-500">Pro Monthly</div>
                <div className="text-xs text-blue-400">Billed monthly</div>
              </div>
              <div className="font-bold text-blue-500">$29<span className="text-xs font-normal">/mo</span></div>
            </div>

            <div className={`border rounded-lg p-4 flex justify-between items-center cursor-pointer ${cardHover}`}>
              <div>
                <div className="font-semibold">Pro Annual</div>
                <div className="text-xs text-green-500 font-medium">Save 20%</div>
              </div>
              <div className="font-bold">$279<span className="text-xs font-normal">/yr</span></div>
            </div>
          </div>

          <div className={`mt-6 flex items-center justify-center gap-2 text-xs ${subText}`}>
            <ShieldCheck size={14} />
            <span>Secure SSL Payment</span>
          </div>
        </div>

   
        <div className={`px-6 py-4 ${headerBg} border-t ${borderClass} flex justify-end gap-3`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium ${subText} hover:bg-gray-100/10 rounded-lg transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={() => { alert("Redirecting to Stripe..."); onClose(); }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};
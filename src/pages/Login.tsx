import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRMStore } from '@/store/useCRMStore';
import TeletalkLogo from '@/components/TeletalkLogo';

// Dummy user credentials
const DUMMY_USERS = [
  { id: 1, username: 'tabtila', password: 'password123', name: 'Tabtila Islam', role: 'Admin' },
  { id: 2, username: 'admin', password: 'admin123', name: 'Administrator', role: 'Admin' },
  { id: 3, username: 'operator', password: 'op123', name: 'Rafiqul Islam', role: 'Operator' },
  { id: 4, username: 'manager', password: 'mgr123', name: 'Nasir Uddin', role: 'Manager' },
  { id: 5, username: 'supervisor', password: 'sup123', name: 'Kamal Hossain', role: 'Supervisor' },
];

export default function Login() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof DUMMY_USERS[0] | null>(null);
  const login = useCRMStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Find user with matching credentials
    const user = DUMMY_USERS.find(
      u => u.username === account && u.password === password
    );

    if (user) {
      setSelectedUser(user);
      // Store user info in localStorage or state management
      localStorage.setItem('currentUser', JSON.stringify(user));
      login();
      navigate('/crm/workspace');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleQuickFill = (user: typeof DUMMY_USERS[0]) => {
    setAccount(user.username);
    setPassword(user.password);
    setLoginError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full border border-gray-300">
        {/* Header Image Section */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Team collaboration"
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/80 to-transparent"></div>
        </div>

        {/* Login Form Section */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              {/* Account Field */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                <label className="sm:w-28 text-sm text-gray-700 font-medium">Account</label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="Enter your account"
                  className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                <label className="sm:w-28 text-sm text-gray-700 font-medium">Password</label>
                <div className="flex-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <span className="text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline whitespace-nowrap">
                    Forgot password?
                  </span>
                </div>
              </div>

              {/* Language Field */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                <label className="sm:w-28 text-sm text-gray-700 font-medium">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option>English</option>
                  <option>Bangla</option>
                  <option>Hindi</option>
                  <option>Urdu</option>
                </select>
              </div>

              {/* Verification Code Field */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                <label className="sm:w-28 text-sm text-gray-700 font-medium">Verification Code</label>
                <div className="flex-1 flex items-center gap-2 flex-wrap">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 min-w-[100px] px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 font-mono text-lg text-gray-700 select-none tracking-wider">
                    ERa8
                  </div>
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 text-xl transition-transform hover:rotate-45"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="px-12 py-2.5 bg-gradient-to-r from-blue-200 to-blue-300 border border-blue-400 rounded-lg font-semibold text-blue-800 shadow-md hover:from-blue-300 hover:to-blue-400 transition-all text-sm sm:text-base"
              >
                Login
              </button>
            </div>

            {/* Quick Login Options */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-3">Quick Login (Demo Credentials)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {DUMMY_USERS.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleQuickFill(user)}
                    className="px-2 py-1.5 text-xs bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-md transition-colors text-gray-600 hover:text-blue-600"
                  >
                    {user.username}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Copyright */}
          <div className="mt-6 text-center text-xs text-gray-500">
            Copyright © Huawei Technologies Co., Ltd. 2024. All rights reserved.
          </div>
        </div>
      </div>

      {/* Teletalk Logo - Bottom Right */}
      <div className="fixed bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
        <TeletalkLogo className="h-6" />
      </div>

      {/* Browser Version Info - Bottom Left */}
      <div className="fixed bottom-6 left-6 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow border border-gray-200">
        Chrome 83, 94, 102, 107 • IE 11 • Edge 107
      </div>
    </div>
  );
}
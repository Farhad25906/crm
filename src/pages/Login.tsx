import { useState } from 'react';
import { useCRMStore } from '@/store/useCRMStore';

export default function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const login = useCRMStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login - just call login() regardless of input
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full mx-4 border border-gray-300">
        {/* Header Image Section */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Team" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100 to-transparent"></div>
        </div>

        {/* Login Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-32 text-sm text-gray-700 font-medium">Account</label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <label className="w-32 text-sm text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-sm text-gray-700 font-medium">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>English</option>
                  <option>Bangla</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-sm text-gray-700 font-medium">Verification Code</label>
                <div className="flex-1 flex items-center gap-3">
                  <input
                    type="text"
                    className="w-40 px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="bg-gray-100 px-4 py-2 rounded border border-gray-300 font-mono text-lg text-gray-700 select-none">
                    ERa8
                  </div>
                  <button type="button" className="text-green-600 hover:text-green-700">
                    🔄
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="px-10 py-2 bg-gradient-to-r from-blue-200 to-blue-300 border border-blue-400 rounded font-semibold text-blue-800 shadow hover:from-blue-300 hover:to-blue-400 transition-all"
              >
                Login
              </button>
            </div>
          </form>

          {/* Copyright */}
          <div className="mt-8 text-center text-xs text-gray-500">
            Copyright © Huawei Technologies Co., Ltd. 2024. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Teletalk Logo */}
      <div className="absolute bottom-8 right-8">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold text-xl">teletalk</span>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-4 bg-white rounded-t-full"></div>
            </div>
            <div className="w-6 h-4 bg-green-600 rounded-t-full -mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

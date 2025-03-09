import React from 'react';
import { LogOut, User } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function Header({ onLogout, isAuthenticated }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">AI Interview Pro</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <button className="text-gray-500 hover:text-gray-700">
                  <User size={24} />
                </button>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-gray-700"
                  title="Log out"
                >
                  <LogOut size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}



// import React from 'react';
// import { LogOut, User } from 'lucide-react';

// export function Header() {
//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-indigo-600">AI Interview Pro</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="text-gray-500 hover:text-gray-700">
//               <User size={24} />
//             </button>
//             <button className="text-gray-500 hover:text-gray-700">
//               <LogOut size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
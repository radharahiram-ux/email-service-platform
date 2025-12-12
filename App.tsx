import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import ComposeEmail from './components/ComposeEmail';
import { EmailProvider, useEmail } from './contexts/EmailContext';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedEmail,
    setSelectedEmail,
    composing,
    setComposing,
    sending,
    notification,
    searchQuery,
    setSearchQuery,
    composeData,
    setComposeData,
    filteredEmails,
    markAsRead,
    toggleStar,
    deleteEmail,
    handleSendEmail
  } = useEmail();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in ${
          notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="flex h-screen">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setComposing={setComposing}
          emails={filteredEmails}
        />

        <div className="flex-1 flex flex-col bg-white">
          <div className="border-b border-gray-200 p-4 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <EmailList
              emails={filteredEmails}
              selectedEmail={selectedEmail}
              setSelectedEmail={setSelectedEmail}
              markAsRead={markAsRead}
              toggleStar={toggleStar}
            />

            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-slate-50">
              {composing ? (
                <ComposeEmail
                  composeData={composeData}
                  setComposeData={setComposeData}
                  handleSendEmail={handleSendEmail}
                  setComposing={setComposing}
                  sending={sending}
                />
              ) : selectedEmail ? (
                <EmailView
                  email={selectedEmail}
                  toggleStar={toggleStar}
                  deleteEmail={deleteEmail}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600 text-4xl">📧</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Select an email to read
                    </h3>
                    <p className="text-gray-500">
                      Choose a message from your inbox to view its contents
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <EmailProvider>
      <AppContent />
    </EmailProvider>
  );
};

export default App;
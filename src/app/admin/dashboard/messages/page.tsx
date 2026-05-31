'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '@/lib/useSiteData';
import { Message } from '@/lib/siteData';

export default function MessagesPage() {
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const filtered = (messages || []).filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  });

  const unreadCount = (messages || []).filter(m => !m.read).length;

  /*
  const markAsRead = (id: number) => {
    if (typeof window === 'undefined') return;
    
    try {
      const updated = messages.map(m => 
        m.id === id ? { ...m, read: true } : m
      );
      localStorage.setItem('admin_messages', JSON.stringify(updated));
      window.dispatchEvent(new Event('admin_messages_updated'));
    } catch (e) {
      console.error('Failed to mark as read:', e);
    }
  };

  const deleteMessage = (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const updated = messages.filter(m => m.id !== id);
      localStorage.setItem('admin_messages', JSON.stringify(updated));
      window.dispatchEvent(new Event('admin_messages_updated'));
      setSelectedMessage(null);
    } catch (e) {
      console.error('Failed to delete message:', e);
    }
  };
  */

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Messages
          </h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">
              {unreadCount} Unread
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">
              {(messages || []).length} Total
            </span>
          </div>
        </div>
        <p className="text-slate-600">Manage contact form submissions</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {(['all', 'unread', 'read'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-semibold capitalize transition-colors relative ${
              filter === f
                ? 'text-teal-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f}
            {filter === f && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* Messages List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Messages</h3>
          <p className="text-slate-600">
            {filter === 'unread' ? 'All caught up!' : 'No messages yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((message, idx) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) markAsRead(message.id);
                }}
                className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                  message.read
                    ? 'border-slate-200'
                    : 'border-teal-200 bg-teal-50/30'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 line-clamp-1">
                      {message.firstName} {message.lastName}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{message.email}</p>
                  </div>
                  {!message.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0 mt-1" />
                  )}
                </div>

                {/* Message Preview */}
                <p className="text-slate-600 text-sm line-clamp-3 mb-3">
                  {message.message}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{formatDate(message.date)}</span>
                  <span className="text-teal-600 font-medium">View →</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">
                      {selectedMessage.firstName} {selectedMessage.lastName}
                    </h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {formatDate(selectedMessage.date)}
                </p>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your Message&body=Hi ${selectedMessage.firstName},%0D%0A%0D%0A`}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-center"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-6 py-3 border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

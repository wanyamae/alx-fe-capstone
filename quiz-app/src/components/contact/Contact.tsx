import React, { useState } from 'react';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200); // Simulate sending
  };

  if (sent) {
    return (
      <div className="max-w-lg mx-auto mt-20 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
        <PaperAirplaneIcon className="h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300">Message Sent!</h2>
        <p className="text-gray-700 dark:text-gray-200 text-center">Thank you for reaching out. We'll get back to you soon.</p>
        <button className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-lg mx-auto mt-20 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-2">
        <UserCircleIcon className="h-8 w-8 text-blue-500 dark:text-blue-300" />
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold disabled:opacity-60"
            disabled={loading}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;

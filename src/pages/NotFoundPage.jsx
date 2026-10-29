import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Seo } from '../components/common/Seo';

export const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
      <Seo title="404 - Page Not Found" description="The requested route does not exist." />

      <div className="max-w-md p-8 sm:p-10 rounded-3xl bg-[#0D111C]/90 border border-white/10 space-y-6 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-1">
            ERROR // CODE 404
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-black uppercase text-white tracking-wider">
            Page Not Found
          </h1>
          <p className="mt-2 font-body text-xs sm:text-sm text-slate-400 leading-relaxed">
            The page you are looking for does not exist or has been moved to another route.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
};

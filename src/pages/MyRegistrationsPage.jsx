import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Trash2, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { FEST_INFO } from '../data/events';
import { getPasses, removePass } from '../lib/passStore';
import { downloadPassPdf } from '../lib/passPdf';

const Detail = ({ label, children }) => (
  <div>
    <span className="block text-xs text-gray-500">{label}</span>
    <span className="font-semibold text-gray-900 break-words">{children}</span>
  </div>
);

const PassCard = ({ pass, onRemove }) => {
  const [downloadState, setDownloadState] = useState('idle');

  const handleDownload = async () => {
    setDownloadState('working');
    try {
      await downloadPassPdf(pass);
      setDownloadState('idle');
    } catch (e) {
      console.error(e);
      setDownloadState('failed');
    }
  };

  return (
    <article className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 mb-4 border-b border-dashed border-gray-200">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-gray-900 tracking-tight">{pass.eventTitle}</h2>
          <span className="font-mono text-sm font-bold text-marigold-600">{pass.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={downloadState === 'working'}
            className="px-4 py-2.5 rounded-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            {downloadState === 'working' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => onRemove(pass.id)}
            className="p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 cursor-pointer transition-colors"
            title="Remove from this device"
            aria-label={`Remove ${pass.eventTitle} pass from this device`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {downloadState === 'failed' && (
        <p role="alert" className="mb-4 text-xs text-rose-600 font-medium">The PDF could not be created. Please try again.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {pass.teamName && <Detail label="Team">{pass.teamName}</Detail>}
        <Detail label={pass.teamName ? 'Team leader' : 'Participant'}>{pass.fullName}</Detail>
        <Detail label="Enrollment no.">{pass.enrollmentNumber}</Detail>
        <Detail label="College">{pass.college}</Detail>
        <Detail label="Course">{pass.course}</Detail>
        <Detail label="When">{FEST_INFO.dateString}</Detail>
      </div>

      {pass.teamMembers?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="block text-xs text-gray-500 mb-2">Teammates</span>
          <ul className="flex flex-wrap gap-2 text-xs text-gray-700">
            {pass.teamMembers.map((member) => (
              <li key={member.enrollment} className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200">
                {member.name} ({member.enrollment})
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export const MyRegistrationsPage = () => {
  const [passes, setPasses] = useState(getPasses);

  const handleRemove = (id) => {
    if (window.confirm('Remove this pass from this device? This does not cancel your registration.')) {
      setPasses(removePass(id));
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Seo
        title="My Passes"
        description="View and download your event passes for INNOVISION 2026."
      />

      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to home</span>
      </Link>

      <h1 className="mt-6 font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
        My Passes {passes.length > 0 && <span className="text-gray-400 font-bold">({passes.length})</span>}
      </h1>
      <p className="mt-2 mb-10 text-sm text-gray-600 leading-relaxed">
        Passes are kept on this device. Lost one, or on a new device? Register again with the same enrollment number and email to get your original pass back.
      </p>

      {passes.length === 0 ? (
        <div className="text-center py-16 px-8 rounded-3xl bg-white border border-gray-200">
          <Ticket className="w-10 h-10 mx-auto text-gray-400" />
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-gray-900">No passes on this device</h2>
          <p className="mt-2 text-sm text-gray-600">Choose an event and register to get your pass.</p>
          <Link
            to="/#events"
            className="mt-6 inline-flex px-6 py-3 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Browse events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {passes.map((pass) => <PassCard key={pass.id} pass={pass} onRemove={handleRemove} />)}
        </div>
      )}
    </div>
  );
};

export default MyRegistrationsPage;

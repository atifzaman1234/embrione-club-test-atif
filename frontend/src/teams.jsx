import { useEffect, useState } from 'react';
import Card from './components/Card';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function TeamCardSkeleton() {
  return <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><div className="flex items-center gap-4"><div className="h-16 w-16 rounded-full bg-slate-800" /><div className="flex-1 space-y-2"><div className="h-5 w-2/3 rounded bg-slate-800" /><div className="h-3 w-1/3 rounded bg-slate-800" /><div className="h-3 w-1/2 rounded bg-slate-800" /></div></div><div className="mt-5 h-6 w-28 rounded bg-slate-800" /><div className="mt-4 space-y-2"><div className="h-3 rounded bg-slate-800" /><div className="h-3 w-5/6 rounded bg-slate-800" /></div><div className="mt-6 border-t border-slate-800 pt-4"><div className="h-3 w-32 rounded bg-slate-800" /></div></div>;
}

export default function Teams() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    const loadMembers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/team-members`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to load team members.');
        if (isCurrent) setMembers(result.members);
      } catch (requestError) {
        if (isCurrent) setError(requestError.message || 'Unable to load team members.');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };
    void loadMembers();
    return () => { isCurrent = false; };
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">The Embrione</p><h1 className="mt-2 text-3xl font-bold text-white">Team Directory</h1><p className="mt-2 text-slate-400">Meet the approved members of our club.</p></div>
      {isLoading && <div aria-label="Loading team members" className="grid grid-cols-1 gap-6 md:grid-cols-2"><TeamCardSkeleton /><TeamCardSkeleton /></div>}
      {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
      {!isLoading && !error && members.length === 0 && <p className="rounded-2xl border border-dashed border-slate-800 py-10 text-center text-slate-500">No approved team members yet.</p>}
      {!isLoading && !error && members.length > 0 && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {members.map((member) => <Card key={member.id} name={member.name} role={member.position} department={member.branch} semester={`Semester ${member.semester}`} domain={member.domain} memberId={member.srn} bio={member.bio} imageUrl={member.photo_url} githubUrl={member.github_url} linkedinUrl={member.linkedin_url} />)}
      </div>}
    </section>
  );
}

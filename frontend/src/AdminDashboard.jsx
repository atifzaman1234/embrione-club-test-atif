import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Avatar({ member }) {
  if (member.photo_url) return <img src={member.photo_url} alt={`${member.name} profile`} className="h-16 w-16 shrink-0 rounded-full border-2 border-slate-700 bg-slate-800 object-cover" />;
  return <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-800 text-slate-400"><svg viewBox="0 0 24 24" className="h-9 w-9 fill-current"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.14 0-7.5 2.52-7.5 5.625 0 .62.505 1.125 1.125 1.125h12.75c.62 0 1.125-.505 1.125-1.125 0-3.105-3.36-5.625-7.5-5.625Z" /></svg></div>;
}

function MemberRowSkeleton() {
  return <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><div className="flex items-center gap-4"><div className="h-16 w-16 rounded-full bg-slate-800" /><div className="flex-1 space-y-2"><div className="h-5 w-40 rounded bg-slate-800" /><div className="h-3 w-64 max-w-full rounded bg-slate-800" /><div className="h-3 w-4/5 rounded bg-slate-800" /></div></div></div>;
}

export default function AdminDashboard({ isAuthenticated, onLogout }) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadMembers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBaseUrl}/api/members`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to load member profiles.');
      setMembers(result.members);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load member profiles.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    const loadInitialMembers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/members`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to load member profiles.');
        if (isCurrent) setMembers(result.members);
      } catch (requestError) {
        if (isCurrent) setError(requestError.message || 'Unable to load member profiles.');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };
    void loadInitialMembers();
    return () => { isCurrent = false; };
  }, []);

  const changeStatus = async (id, status) => {
    setUpdatingId(id);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`${apiBaseUrl}/api/members/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to update member.');
      setMembers((current) => current.map((member) => member.id === id ? result.member : member));
      if (status === 'approved') setNotice(`${result.member.name} has been approved and is now locked.`);
      if (status === 'rejected') setNotice(`${result.member.name} has been rejected and is now locked.`);
    } catch (requestError) {
      setError(requestError.message || 'Unable to update member.');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteMember = async (id) => {
    setUpdatingId(id);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`${apiBaseUrl}/api/members/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Unable to delete member.');
      }
      setMembers((current) => current.filter((member) => member.id !== id));
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete member.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const pendingCount = members.filter((member) => member.status === 'pending').length;
  const approvedCount = members.filter((member) => member.status === 'approved').length;

  return (
    <section className="min-h-full bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-3xl font-extrabold tracking-tight text-white">Admin <span className="text-cyan-400">Dashboard</span></h1><p className="mt-1 text-xs text-slate-400">Review, approve, reject, or remove team member requests.</p></div>
          <button type="button" onClick={onLogout} className="self-start rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 sm:self-auto">Logout</button>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total submissions</p><p className="mt-2 text-3xl font-extrabold text-white">{members.length}</p></div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Pending approval</p><p className="mt-2 text-3xl font-extrabold text-amber-400">{pendingCount}</p></div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Approved members</p><p className="mt-2 text-3xl font-extrabold text-emerald-400">{approvedCount}</p></div>
        </div>

        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold text-white">Member profiles <span className="text-sm font-normal text-slate-400">({members.length})</span></h2><button onClick={loadMembers} disabled={isLoading} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 disabled:opacity-50">Refresh</button></div>
        {error && <p role="alert" className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
        {notice && <p role="status" className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{notice}</p>}
        {isLoading ? <div aria-label="Loading member profiles" className="space-y-4"><MemberRowSkeleton /><MemberRowSkeleton /></div> : members.length === 0 ? <p className="rounded-2xl border border-dashed border-slate-800 py-10 text-center text-slate-500">No member profiles have been submitted yet.</p> : (
          <div className="space-y-4">
            {members.map((member) => {
              const isUpdating = updatingId === member.id;
              const isLocked = ['approved', 'rejected'].includes(member.status);
              return <article key={member.id} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-slate-700 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4 sm:items-center"><Avatar member={member} /><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-bold text-white">{member.name}</h3><span className="rounded border border-slate-700/50 bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400">{member.srn}</span><span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${member.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : member.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>{member.status}</span></div><p className="mt-0.5 text-xs text-slate-400">{member.position} • {member.domain} ({member.branch}, Sem {member.semester})</p>{member.bio && <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300">{member.bio}</p>}</div></div>
                <div className="flex w-full shrink-0 items-center justify-end gap-2 border-t border-slate-800/80 pt-4 lg:w-auto lg:border-none lg:pt-0">{isLocked && <span className={`mr-auto text-xs font-semibold lg:mr-2 ${member.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'}`}>Locked</span>}<button disabled={isUpdating || isLocked} onClick={() => changeStatus(member.id, 'approved')} className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">Approve</button><button disabled={isUpdating || isLocked} onClick={() => changeStatus(member.id, 'rejected')} className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50">Reject</button><button disabled={isUpdating || isLocked} onClick={() => deleteMember(member.id)} className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 disabled:cursor-not-allowed disabled:opacity-50">Delete</button></div>
              </article>;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

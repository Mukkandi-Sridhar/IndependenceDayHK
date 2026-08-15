import React, { useState, useEffect } from 'react';
import { fetchAllQuizSubmissionsAdmin, fetchAllTributesAdmin } from '../services/firebase';
import { jsPDF } from 'jspdf';
import {
  LayoutDashboard, Users, Flame, RefreshCw, Download,
  Trophy, Check, X, Clock, Star, Search, ChevronDown, ChevronUp
} from 'lucide-react';

/* ─── Palette ─────────────────────────────────────────────────────── */
const C = {
  bg: '#070B15',
  card: 'rgba(13,19,34,0.97)',
  border: 'rgba(245,158,11,0.25)',
  saffron: '#F59E0B',
  saffronBg: 'rgba(245,158,11,0.10)',
  green: '#22C55E',
  greenBg: 'rgba(34,197,94,0.10)',
  red: '#F87171',
  blue: '#60A5FA',
  text: '#F8FAFC',
  muted: '#94A3B8',
  dim: '#64748B',
};

/* ─── Tiny helpers ─────────────────────────────────────────────────── */
const Badge = ({ label, color = C.saffron, bg }) => (
  <span style={{
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '0.74rem',
    fontWeight: 700,
    background: bg || `${color}18`,
    color,
    border: `1px solid ${color}40`,
    whiteSpace: 'nowrap'
  }}>{label}</span>
);

const Stat = ({ icon, label, value, color = C.saffron }) => (
  <div style={{
    flex: '1 1 160px',
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 14,
    padding: '18px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    boxShadow: '0 2px 16px rgba(0,0,0,0.4)'
  }}>
    <div style={{
      width: 46, height: 46, borderRadius: 12,
      background: `${color}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <p style={{ color: C.muted, fontSize: '0.76rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
      <p style={{ color, fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.1 }}>{value}</p>
    </div>
  </div>
);

/* ─── Score colour helper ─────────────────────────────────────────── */
function scoreColor(score, total) {
  const pct = (score / (total * 10)) * 100;
  if (pct >= 80) return C.green;
  if (pct >= 50) return C.saffron;
  return C.red;
}

/* ─── PDF Export ──────────────────────────────────────────────────── */
function exportQuizPDF(rows) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginL = 36, marginR = 36;
  const colW = (pageW - marginL - marginR) / 8;

  // Header bar
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageW, 52, 'F');
  doc.setFontSize(15);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('GITA4YOUTH', marginL, 32);
  doc.setTextColor(255, 255, 255);
  doc.text('  |  Quiz Submissions Report', marginL + 90, 32);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}  •  Total Records: ${rows.length}`, marginL, 46);

  const headers = ['#', 'Name', 'Phone', 'Place', 'Gita4Youth', 'Score', 'Badge', 'Date'];
  const colWidths = [28, 110, 90, 100, 70, 48, 120, 90];
  let x = marginL;
  let y = 70;

  // Table header
  doc.setFillColor(217, 119, 6);
  doc.rect(marginL, y - 14, pageW - marginL - marginR, 18, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  headers.forEach((h, i) => {
    doc.text(h, x + 4, y);
    x += colWidths[i];
  });
  y += 8;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  rows.forEach((row, idx) => {
    if (y > pageH - 40) {
      doc.addPage();
      y = 50;
    }
    const bg = idx % 2 === 0 ? [20, 26, 44] : [13, 19, 34];
    doc.setFillColor(...bg);
    doc.rect(marginL, y - 11, pageW - marginL - marginR, 16, 'F');

    doc.setTextColor(248, 250, 252);
    x = marginL;
    const cells = [
      String(idx + 1),
      row.name,
      row.phone,
      row.place,
      row.isGita4YouthMember,
      `${row.score} / ${row.totalQuestions * 10}`,
      row.badge,
      row.dateStr || row.createdAt?.slice(0, 10) || ''
    ];
    cells.forEach((cell, ci) => {
      const maxW = colWidths[ci] - 8;
      const clipped = doc.getStringUnitWidth(cell) * 8 > maxW
        ? cell.slice(0, Math.floor(maxW / 4.5)) + '…'
        : cell;
      doc.text(clipped, x + 4, y);
      x += colWidths[ci];
    });

    // Score colour bar
    const pct = row.score / (row.totalQuestions * 10);
    const bx = marginL + colWidths.slice(0, 5).reduce((a, b) => a + b, 0) + 2;
    const barW = (colWidths[5] - 6) * pct;
    doc.setFillColor(pct >= 0.8 ? 34 : pct >= 0.5 ? 245 : 248,
      pct >= 0.8 ? 197 : pct >= 0.5 ? 158 : 113,
      pct >= 0.8 ? 94 : pct >= 0.5 ? 11 : 113);
    doc.rect(bx, y + 2, barW, 2, 'F');

    y += 16;
  });

  // Footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(11, 15, 25);
    doc.rect(0, pageH - 24, pageW, 24, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Gita4Youth • Azadi Quiz Admin Report  •  Page ${i} of ${totalPages}`, marginL, pageH - 9);
  }

  doc.save(`Gita4Youth_Quiz_Submissions_${new Date().toISOString().slice(0, 10)}.pdf`);
}

function exportTributesPDF(rows) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginL = 36;

  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageW, 52, 'F');
  doc.setFontSize(15);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('GITA4YOUTH', marginL, 32);
  doc.setTextColor(255, 255, 255);
  doc.text('  |  Diya Tributes Report', marginL + 90, 32);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}  •  Total Records: ${rows.length}`, marginL, 46);

  let y = 72;
  rows.forEach((row, idx) => {
    if (y > pageH - 80) { doc.addPage(); y = 50; }
    const bg = idx % 2 === 0 ? [20, 26, 44] : [13, 19, 34];
    doc.setFillColor(...bg);
    doc.rect(marginL - 4, y - 14, pageW - marginL * 2 + 8, 58, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(245, 158, 11);
    doc.text(`${idx + 1}. ${row.name}`, marginL, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`${row.location}  •  ${row.dateStr || ''}`, marginL, y + 13);
    doc.setFontSize(8);
    doc.setTextColor(226, 232, 240);
    const wrapped = doc.splitTextToSize(row.message, pageW - marginL * 2);
    doc.text(wrapped.slice(0, 2), marginL, y + 26);
    y += 65;
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(11, 15, 25);
    doc.rect(0, pageH - 24, pageW, 24, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Gita4Youth • Diya Tribute Wall Admin Report  •  Page ${i} of ${totalPages}`, marginL, pageH - 9);
  }

  doc.save(`Gita4Youth_Tributes_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/* ─── Section header ─────────────────────────────────────────────── */
const SectionHeader = ({ icon, title, count, onExport, onRefresh, loading, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', flexWrap: 'wrap',
    gap: 10, marginBottom: 14
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
      {icon}
      <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: C.text }}>{title}</h2>
      <Badge label={`${count} records`} color={C.saffron} />
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      {children}
      <button onClick={onRefresh} disabled={loading} title="Refresh" style={btnStyle('#3B4A6B', '#CBD5E1')}>
        <RefreshCw size={15} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
        <span>Refresh</span>
      </button>
      <button onClick={onExport} title="Export PDF" style={btnStyle('#D97706', '#FFF')}>
        <Download size={15} />
        <span>Export PDF</span>
      </button>
    </div>
  </div>
);

const btnStyle = (bg, color) => ({
  display: 'flex', alignItems: 'center', gap: 6,
  padding: '8px 14px', borderRadius: 8, border: 'none',
  background: bg, color, fontSize: '0.82rem', fontWeight: 600,
  cursor: 'pointer', whiteSpace: 'nowrap', minHeight: 36
});

/* ─── Table ───────────────────────────────────────────────────────── */
const Th = ({ children, onClick, sorted, asc, style = {} }) => (
  <th
    onClick={onClick}
    style={{
      padding: '10px 12px',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: 700,
      color: sorted ? C.saffron : C.muted,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      background: '#0D1322',
      borderBottom: `1px solid ${C.border}`,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      ...style
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {children}
      {onClick && (sorted ? (asc ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronDown size={12} color={C.dim} />)}
    </span>
  </th>
);

const Td = ({ children, style = {} }) => (
  <td style={{
    padding: '10px 12px',
    fontSize: '0.85rem',
    color: C.text,
    borderBottom: `1px solid rgba(255,255,255,0.05)`,
    verticalAlign: 'middle',
    ...style
  }}>{children}</td>
);

/* ─── Main AdminPage ──────────────────────────────────────────────── */
export default function AdminPage() {
  const [tab, setTab] = useState('quiz');
  const [quizRows, setQuizRows] = useState([]);
  const [tributeRows, setTributeRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizSearch, setQuizSearch] = useState('');
  const [tributeSearch, setTributeSearch] = useState('');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortAsc, setSortAsc] = useState(false);
  const [error, setError] = useState('');
  const [authPassed, setAuthPassed] = useState(false);
  const [pwInput, setPwInput] = useState('');

  // Simple admin password gate
  const ADMIN_PIN = 'gita4youth@admin';

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [qr, tr] = await Promise.all([
        fetchAllQuizSubmissionsAdmin(),
        fetchAllTributesAdmin()
      ]);
      setQuizRows(qr);
      setTributeRows(tr);
    } catch (e) {
      setError('Failed to load from Firebase. Check Firestore rules and API key.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authPassed) load();
  }, [authPassed]);

  /* ── Auth Gate ── */
  if (!authPassed) {
    return (
      <div style={{
        minHeight: '100vh', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, fontFamily: "'Poppins', sans-serif"
      }}>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 20, padding: '36px 32px', width: '100%', maxWidth: 400,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)', textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔐</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: C.saffron, marginBottom: 4 }}>Admin Access</h1>
          <p style={{ color: C.muted, fontSize: '0.88rem', marginBottom: 24 }}>Gita4Youth • Internal Dashboard</p>
          <input
            type="password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pwInput === ADMIN_PIN && setAuthPassed(true)}
            placeholder="Enter admin password"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 15,
              background: '#0A0E1A', border: `1px solid ${C.border}`, color: C.text,
              outline: 'none', marginBottom: 14, boxSizing: 'border-box'
            }}
            autoFocus
          />
          <button
            onClick={() => { if (pwInput === ADMIN_PIN) setAuthPassed(true); else setError('Incorrect password.'); }}
            style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg,#D97706,#B45309)',
              color: '#FFF', fontSize: '1rem', fontWeight: 700, cursor: 'pointer'
            }}
          >Unlock Dashboard</button>
          {error && <p style={{ color: C.red, marginTop: 10, fontSize: '0.85rem' }}>{error}</p>}
          <p style={{ color: C.dim, fontSize: '0.72rem', marginTop: 18 }}>
            This page is hidden. Not linked from the main app.
          </p>
        </div>
      </div>
    );
  }

  /* ── Sort helper ── */
  const applySort = (rows, key, asc) =>
    [...rows].sort((a, b) => {
      const av = a[key] ?? '';
      const bv = b[key] ?? '';
      if (typeof av === 'number') return asc ? av - bv : bv - av;
      return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const toggleSort = (key) => {
    if (sortKey === key) setSortAsc(p => !p);
    else { setSortKey(key); setSortAsc(false); }
  };

  const filteredQuiz = applySort(
    quizRows.filter(r =>
      [r.name, r.phone, r.place, r.badge, r.isGita4YouthMember]
        .join(' ').toLowerCase().includes(quizSearch.toLowerCase())
    ),
    sortKey, sortAsc
  );

  const filteredTributes = applySort(
    tributeRows.filter(r =>
      [r.name, r.location, r.message].join(' ').toLowerCase().includes(tributeSearch.toLowerCase())
    ),
    sortKey, sortAsc
  );

  // Stats
  const totalScore = quizRows.reduce((a, r) => a + (r.score || 0), 0);
  const avgScore = quizRows.length ? Math.round(totalScore / quizRows.length) : 0;
  const heroCount = quizRows.filter(r => r.score >= 160).length;
  const memberCount = quizRows.filter(r => r.isGita4YouthMember === 'Yes').length;

  /* ── Render ── */
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Poppins', sans-serif", color: C.text }}>
      {/* Top Bar */}
      <header style={{
        background: 'rgba(11,15,25,0.98)', borderBottom: `1px solid ${C.border}`,
        padding: '14px 28px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 20px rgba(0,0,0,0.6)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LayoutDashboard size={24} color={C.saffron} />
          <div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: C.saffron }}>GITA</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: C.text }}>4</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22C55E' }}>YOUTH</span>
            <span style={{ fontSize: '0.78rem', color: C.muted, marginLeft: 10 }}>Admin Dashboard</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Badge label="🔒 Internal Only" color={C.red} />
          <a href="/" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8,
            background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
            color: C.muted, fontSize: '0.82rem', fontWeight: 600,
            textDecoration: 'none', cursor: 'pointer'
          }}>← Back to App</a>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 20px 60px' }}>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: 10, padding: '12px 16px', color: C.red,
            marginBottom: 20, fontSize: '0.88rem'
          }}>{error}</div>
        )}

        {/* Stats Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 28 }}>
          <Stat icon={<Users size={22} color={C.saffron} />} label="Total Participants" value={quizRows.length} color={C.saffron} />
          <Stat icon={<Trophy size={22} color={C.green} />} label="Freedom Heroes (≥160)" value={heroCount} color={C.green} />
          <Stat icon={<Star size={22} color={C.blue} />} label="Avg Score" value={avgScore} color={C.blue} />
          <Stat icon={<Check size={22} color="#A78BFA" />} label="Gita4Youth Members" value={memberCount} color="#A78BFA" />
          <Stat icon={<Flame size={22} color={C.red} />} label="Diya Tributes" value={tributeRows.length} color={C.red} />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {[
            { key: 'quiz', label: 'Quiz Submissions', icon: <Trophy size={16} /> },
            { key: 'tributes', label: 'Diya Tributes', icon: <Flame size={16} /> }
          ].map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSortKey('createdAt'); setSortAsc(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 10, border: 'none',
                background: tab === t.key ? 'linear-gradient(135deg,#D97706,#B45309)' : 'rgba(255,255,255,0.05)',
                color: tab === t.key ? '#FFF' : C.muted,
                fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer'
              }}
            >{t.icon}{t.label}</button>
          ))}
        </div>

        {/* ── QUIZ TABLE ── */}
        {tab === 'quiz' && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px', borderBottom: `1px solid ${C.border}` }}>
              <SectionHeader
                icon={<Trophy size={18} color={C.saffron} />}
                title="Quiz Submissions"
                count={filteredQuiz.length}
                onExport={() => exportQuizPDF(filteredQuiz)}
                onRefresh={load}
                loading={loading}
              >
                {/* Search */}
                <div style={{ position: 'relative', minWidth: 220 }}>
                  <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted }} />
                  <input
                    value={quizSearch}
                    onChange={e => setQuizSearch(e.target.value)}
                    placeholder="Search name, place, badge…"
                    style={{
                      paddingLeft: 32, paddingRight: 12, height: 36,
                      borderRadius: 8, border: `1px solid ${C.border}`,
                      background: '#0A0E1A', color: C.text,
                      fontSize: '0.83rem', outline: 'none', width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </SectionHeader>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: C.muted }}>
                <RefreshCw size={28} color={C.saffron} style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: 10 }}>Loading from Firebase…</p>
              </div>
            ) : filteredQuiz.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: C.muted }}>
                <Trophy size={36} color={C.dim} />
                <p style={{ marginTop: 8 }}>No quiz submissions found.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                  <thead>
                    <tr>
                      <Th style={{ width: 44 }}>#</Th>
                      <Th onClick={() => toggleSort('name')} sorted={sortKey === 'name'} asc={sortAsc}>Name</Th>
                      <Th onClick={() => toggleSort('phone')} sorted={sortKey === 'phone'} asc={sortAsc}>Phone</Th>
                      <Th onClick={() => toggleSort('place')} sorted={sortKey === 'place'} asc={sortAsc}>Place</Th>
                      <Th onClick={() => toggleSort('isGita4YouthMember')} sorted={sortKey === 'isGita4YouthMember'} asc={sortAsc}>G4Y Member</Th>
                      <Th onClick={() => toggleSort('score')} sorted={sortKey === 'score'} asc={sortAsc}>Score</Th>
                      <Th onClick={() => toggleSort('badge')} sorted={sortKey === 'badge'} asc={sortAsc}>Badge</Th>
                      <Th onClick={() => toggleSort('dateStr')} sorted={sortKey === 'dateStr'} asc={sortAsc}>Date</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuiz.map((row, idx) => {
                      const pct = row.score / (row.totalQuestions * 10);
                      const sc = scoreColor(row.score, row.totalQuestions);
                      return (
                        <tr key={row.id} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                          <Td style={{ color: C.dim, fontSize: '0.78rem' }}>{idx + 1}</Td>
                          <Td><span style={{ fontWeight: 600 }}>{row.name}</span></Td>
                          <Td style={{ color: C.muted }}>{row.phone}</Td>
                          <Td>{row.place}</Td>
                          <Td>
                            {row.isGita4YouthMember === 'Yes'
                              ? <Badge label="✓ Yes" color={C.green} />
                              : <Badge label="No" color={C.muted} bg="rgba(148,163,184,0.08)" />
                            }
                          </Td>
                          <Td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ color: sc, fontWeight: 800, minWidth: 52 }}>
                                {row.score}<span style={{ color: C.dim, fontWeight: 500, fontSize: '0.75rem' }}>/{row.totalQuestions * 10}</span>
                              </span>
                              <div style={{ flex: 1, height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.08)', minWidth: 60 }}>
                                <div style={{ width: `${pct * 100}%`, height: '100%', borderRadius: 4, background: sc, transition: 'width 0.3s' }} />
                              </div>
                            </div>
                          </Td>
                          <Td>
                            <Badge
                              label={row.badge}
                              color={row.badge?.includes('Hero') ? C.green : row.badge?.includes('Knowledge') ? C.saffron : C.muted}
                            />
                          </Td>
                          <Td style={{ color: C.muted, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Clock size={11} color={C.dim} />
                              {row.dateStr || row.createdAt?.slice(0, 16) || 'N/A'}
                            </div>
                          </Td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table Footer */}
            <div style={{
              padding: '10px 18px',
              borderTop: `1px solid ${C.border}`,
              display: 'flex', justifyContent: 'space-between',
              color: C.dim, fontSize: '0.78rem', flexWrap: 'wrap', gap: 6
            }}>
              <span>Showing {filteredQuiz.length} of {quizRows.length} records</span>
              <span>Total Score: <strong style={{ color: C.saffron }}>{totalScore}</strong> • Avg: <strong style={{ color: C.saffron }}>{avgScore} pts</strong></span>
            </div>
          </div>
        )}

        {/* ── TRIBUTES TABLE ── */}
        {tab === 'tributes' && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px', borderBottom: `1px solid ${C.border}` }}>
              <SectionHeader
                icon={<Flame size={18} color={C.red} />}
                title="Diya Tributes"
                count={filteredTributes.length}
                onExport={() => exportTributesPDF(filteredTributes)}
                onRefresh={load}
                loading={loading}
              >
                <div style={{ position: 'relative', minWidth: 220 }}>
                  <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.muted }} />
                  <input
                    value={tributeSearch}
                    onChange={e => setTributeSearch(e.target.value)}
                    placeholder="Search name, location…"
                    style={{
                      paddingLeft: 32, paddingRight: 12, height: 36,
                      borderRadius: 8, border: `1px solid ${C.border}`,
                      background: '#0A0E1A', color: C.text,
                      fontSize: '0.83rem', outline: 'none', width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </SectionHeader>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: C.muted }}>
                <RefreshCw size={28} color={C.red} style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: 10 }}>Loading tributes…</p>
              </div>
            ) : filteredTributes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: C.muted }}>
                <Flame size={36} color={C.dim} />
                <p style={{ marginTop: 8 }}>No tributes found.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr>
                      <Th style={{ width: 44 }}>#</Th>
                      <Th onClick={() => toggleSort('name')} sorted={sortKey === 'name'} asc={sortAsc}>Name</Th>
                      <Th onClick={() => toggleSort('location')} sorted={sortKey === 'location'} asc={sortAsc}>Location</Th>
                      <Th>Message</Th>
                      <Th onClick={() => toggleSort('dateStr')} sorted={sortKey === 'dateStr'} asc={sortAsc}>Date</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTributes.map((row, idx) => (
                      <tr key={row.id} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                        <Td style={{ color: C.dim, fontSize: '0.78rem' }}>{idx + 1}</Td>
                        <Td><span style={{ fontWeight: 600 }}>{row.name}</span></Td>
                        <Td style={{ color: C.muted, whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            📍 {row.location}
                          </div>
                        </Td>
                        <Td>
                          <p style={{
                            maxWidth: 380, overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            color: '#CBD5E1',
                            fontSize: '0.82rem', lineHeight: 1.45,
                            margin: 0
                          }}>{row.message}</p>
                        </Td>
                        <Td style={{ color: C.muted, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Clock size={11} color={C.dim} />
                            {row.dateStr || row.createdAt?.slice(0, 16) || 'N/A'}
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{
              padding: '10px 18px', borderTop: `1px solid ${C.border}`,
              color: C.dim, fontSize: '0.78rem'
            }}>
              Showing {filteredTributes.length} of {tributeRows.length} tributes
            </div>
          </div>
        )}

      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

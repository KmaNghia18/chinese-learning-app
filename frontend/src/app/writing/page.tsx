'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface Word { id: number; hanzi: string; pinyin: string; meaning_vi: string; stroke_count: number; word_type: string; hsk_level?: string; }
interface Topic { topic: string; word_count: number; }

const LEVEL_COLOR: Record<string, string> = { HSK1:'#10b981', HSK2:'#3b82f6', HSK3:'#f59e0b', HSK4:'#8b5cf6' };
const TOPIC_LABEL: Record<string, string> = {
  noun:'🏠 Danh từ', verb:'⚡ Động từ', adjective:'🌈 Tính từ', adverb:'💨 Trạng từ',
  pronoun:'👤 Đại từ', measure_word:'📦 Lượng từ', conjunction:'🔗 Liên từ',
  preposition:'📍 Giới từ', particle:'✨ Trợ từ', numeral:'🔢 Số từ',
  time:'⏰ Thời gian', greeting:'👋 Chào hỏi', question:'❓ Câu hỏi',
  expression:'💬 Thành ngữ', other:'📚 Khác',
};

// ────── Canvas component — tách riêng để lifecycle độc lập ──────
function HanziCanvas({ char, mode, onReady, onError }: {
  char: string;
  mode: 'animate' | 'quiz';
  onReady: (writer: any) => void;
  onError: () => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  useEffect(() => {
    if (!divRef.current || !char) return;

    const el = divRef.current;
    el.innerHTML = ''; // clear trước

    let cancelled = false;

    (async () => {
      try {
        const mod = await import('hanzi-writer');
        if (cancelled || !el) return;

        const HW = (mod as any).default ?? mod;

        const w = HW.create(el, char, {
          width: 260,
          height: 260,
          padding: 16,
          showOutline: true,
          strokeColor: mode === 'quiz' ? '#818cf8' : '#f472b6',
          outlineColor: '#94a3b8',
          drawingColor: '#fbbf24',
          drawingWidth: 6,
          strokeAnimationSpeed: 0.8,
          delayBetweenStrokes: 300,
          radicalColor: '#fb923c',
          showCharacter: mode === 'animate',
          charDataLoader: (ch: string, resolve: (data: any) => void, reject: (err: any) => void) => {
            fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${ch}.json`)
              .then(r => { if (!r.ok) throw new Error('404'); return r.json(); })
              .then((data) => resolve(data))
              .catch((err) => reject(err));
          },
          onLoadCharDataSuccess: () => {
            if (cancelled) return;
            writerRef.current = w;
            onReady(w);
            if (mode === 'animate') w.animateCharacter();
          },
          onLoadCharDataError: () => {
            if (cancelled) return;
            onError();
          },
        });
      } catch (e) {
        if (!cancelled) onError();
      }
    })();

    return () => {
      cancelled = true;
      if (writerRef.current) {
        try { writerRef.current.cancelQuiz(); } catch {}
        writerRef.current = null;
      }
    };
  }, [char, mode]); // chỉ re-init khi char hoặc mode thay đổi

  return (
    <div
      ref={divRef}
      style={{
        width: 260, height: 260,
        background: 'var(--c-bg)',
        borderRadius: 10,
        cursor: mode === 'quiz' ? 'crosshair' : 'default',
      }}
    />
  );
}

// ────── Main Page ──────
export default function WritingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [phase, setPhase]         = useState<'setup' | 'practice'>('setup');
  const [hskLevel, setHskLevel]   = useState('HSK1');
  const [topics, setTopics]       = useState<Topic[]>([]);
  const [selTopic, setSelTopic]   = useState('all');
  const [words, setWords]         = useState<Word[]>([]);
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0); // chữ hiện tại trong từ nhiều chữ
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingWords, setLoadingWords]   = useState(false);
  const [showHint, setShowHint]   = useState(false);
  const [hwMode, setHwMode]       = useState<'animate' | 'quiz'>('animate');
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [correctStrokes, setCorrectStrokes] = useState(0);
  const [totalStrokes, setTotalStrokes]     = useState(0);
  const [canvasStatus, setCanvasStatus]     = useState<'loading' | 'ready' | 'error'>('loading');

  // Search state
  const [searchMode, setSearchMode]     = useState<'filter' | 'search'>('filter');
  const [searchQuery, setSearchQuery]   = useState('');
  const [searchResults, setSearchResults] = useState<Word[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [customWords, setCustomWords]   = useState<Word[]>([]);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const writerRef = useRef<any>(null);

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setLoadingTopics(true);
    api.getQuizTopics(hskLevel)
      .then(d => setTopics(d.data.topics))
      .catch(() => {})
      .finally(() => setLoadingTopics(false));
  }, [hskLevel, user]);

  const handleWriterReady = useCallback((w: any) => {
    writerRef.current = w;
    setCanvasStatus('ready');
    if (hwMode === 'quiz') {
      w.quiz({
        onMistake: () => setTotalStrokes(t => t + 1),
        onCorrectStroke: () => { setTotalStrokes(t => t + 1); setCorrectStrokes(c => c + 1); },
        onComplete: (s: any) => setQuizResult(s.totalMistakes === 0 ? 'correct' : 'wrong'),
      });
    }
  }, [hwMode]);

  const handleWriterError = useCallback(() => {
    setCanvasStatus('error');
  }, []);

  // Reset state khi đổi từ hoặc chữ hoặc mode
  useEffect(() => {
    if (phase !== 'practice') return;
    setCanvasStatus('loading');
    setQuizResult(null);
    setCorrectStrokes(0);
    setTotalStrokes(0);
    setShowHint(false);
    writerRef.current = null;
  }, [wordIdx, charIdx, hwMode, phase]);

  // #7 Auto-advance: khi viết đúng trong quiz mode → tự sang chữ tiếp theo sau 1.5s
  useEffect(() => {
    if (quizResult === 'correct' && hwMode === 'quiz') {
      const t = setTimeout(() => {
        const word = words[wordIdx];
        if (charIdx + 1 < word?.hanzi.length) {
          setCharIdx(i => i + 1);
        } else {
          setCharIdx(0);
          if (wordIdx + 1 < words.length) setWordIdx(i => i + 1);
          else setPhase('setup');
        }
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [quizResult, hwMode, charIdx, wordIdx, words]); // eslint-disable-line

  const replayAnimation = () => {
    if (!writerRef.current) return;
    try {
      if (hwMode === 'animate') {
        writerRef.current.animateCharacter();
      } else {
        writerRef.current.cancelQuiz();
        setQuizResult(null);
        setCorrectStrokes(0);
        setTotalStrokes(0);
        writerRef.current.quiz({
          onMistake: () => setTotalStrokes(t => t + 1),
          onCorrectStroke: () => { setTotalStrokes(t => t + 1); setCorrectStrokes(c => c + 1); },
          onComplete: (s: any) => setQuizResult(s.totalMistakes === 0 ? 'correct' : 'wrong'),
        });
      }
    } catch (e) { console.error(e); }
  };

  // Search handler with debounce 400ms
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (!q.trim()) { setSearchResults([]); return; }
    searchDebounceRef.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const d = await api.searchVocabulary(q.trim(), 12);
        setSearchResults(d.data || []);
      } catch { setSearchResults([]); }
      finally { setSearchLoading(false); }
    }, 400);
  };

  // Thêm/xoá từ khỏi danh sách luyện custom
  const toggleCustomWord = (w: Word) => {
    setCustomWords(prev =>
      prev.find(x => x.id === w.id) ? prev.filter(x => x.id !== w.id) : [...prev, w]
    );
  };

  // Luyện viết ngay 1 từ cụ thể
  const startPracticeOne = (w: Word) => {
    setWords([w]);
    setWordIdx(0);
    setCharIdx(0);
    setPhase('practice');
  };

  // Luyện danh sách custom
  const startPracticeCustom = () => {
    if (!customWords.length) return;
    setWords([...customWords]);
    setWordIdx(0);
    setCharIdx(0);
    setPhase('practice');
  };

  const startPractice = async () => {
    setLoadingWords(true);
    try {
      const d = await api.getWritingWords(hskLevel, selTopic, 20);
      if (d.data && d.data.length > 0) {
        setWords(d.data);
        setWordIdx(0);
        setCharIdx(0);
        setPhase('practice');
      }
    } catch (e) { console.error(e); }
    setLoadingWords(false);
  };

  // Chuyển sang chữ tiếp theo trong từ, hoặc từ tiếp theo
  const nextChar = () => {
    const word = words[wordIdx];
    if (charIdx + 1 < word.hanzi.length) {
      // Còn chữ tiếp theo trong từ hiện tại
      setCharIdx(i => i + 1);
    } else {
      // Chuyển sang từ tiếp theo, reset charIdx
      setCharIdx(0);
      if (wordIdx + 1 < words.length) setWordIdx(i => i + 1);
      else setPhase('setup');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--c-text-muted)' }}>Đang tải...</div>;

  // ══════════════════ SETUP ══════════════════
  if (phase === 'setup') return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '.4rem' }}>✍️</div>
          <h1 style={{
            fontSize: '2.1rem', fontWeight: 900, marginBottom: '.4rem',
            background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Luyện Viết Chữ Hán</h1>
          <p style={{ color: 'var(--c-text-muted)', fontSize: '.95rem' }}>
            Học thứ tự nét bút · Xem animation · Tự tập viết có chấm điểm
          </p>
        </div>

        {/* ─── Tab switcher ─── */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.25rem',
          background: 'var(--c-surface)', borderRadius: 12, padding: '.35rem', border: '1px solid var(--c-border)' }}>
          {[
            { k: 'filter' as const, icon: '🏷️', label: 'Luyện theo bộ lọc' },
            { k: 'search' as const, icon: '🔍', label: 'Tìm từ bất kỳ' },
          ].map(tab => (
            <button key={tab.k} onClick={() => setSearchMode(tab.k)}
              style={{
                flex: 1, padding: '.6rem', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: '.85rem', transition: 'all .2s',
                background: searchMode === tab.k ? 'linear-gradient(135deg,#f59e0b,#ec4899)' : 'transparent',
                color: searchMode === tab.k ? '#fff' : 'var(--c-text-muted)',
              }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB: Bộ lọc ─── */}
        {searchMode === 'filter' && (<>
          {/* Level */}
          <div style={{ background: 'var(--c-surface)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', border: '1px solid var(--c-border)' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--c-text)', fontSize: '1rem' }}>📊 Cấp độ HSK</h3>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              {['HSK1', 'HSK2', 'HSK3', 'HSK4'].map(lv => (
                <button key={lv} onClick={() => { setHskLevel(lv); setSelTopic('all'); }} id={`level-${lv}`}
                  style={{
                    padding: '.5rem 1.2rem', borderRadius: 50, border: '2px solid',
                    borderColor: hskLevel === lv ? LEVEL_COLOR[lv] : 'var(--c-border)',
                    background: hskLevel === lv ? LEVEL_COLOR[lv] : 'transparent',
                    color: hskLevel === lv ? '#fff' : 'var(--c-text-muted)',
                    fontWeight: 800, cursor: 'pointer', fontSize: '.85rem', transition: 'all .2s'
                  }}>{lv}</button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div style={{ background: 'var(--c-surface)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', border: '1px solid var(--c-border)' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '.75rem', color: 'var(--c-text)', fontSize: '1rem' }}>🏷️ Từ loại</h3>
            {loadingTopics ? <div style={{ color: 'var(--c-text-muted)', fontSize: '.85rem' }}>Đang tải...</div> : (
              <div style={{ display: 'flex', gap: '.45rem', flexWrap: 'wrap' }}>
                <button onClick={() => setSelTopic('all')} id="topic-all"
                  style={{
                    padding: '.4rem .9rem', borderRadius: 8, border: '1.5px solid',
                    borderColor: selTopic === 'all' ? '#6366f1' : 'var(--c-border)',
                    background: selTopic === 'all' ? '#6366f1' : 'transparent',
                    color: selTopic === 'all' ? '#fff' : 'var(--c-text-muted)',
                    fontWeight: 700, cursor: 'pointer', fontSize: '.78rem'
                  }}>
                  📚 Tất cả ({topics.reduce((s, t) => s + t.word_count, 0)})
                </button>
                {topics.map(t => (
                  <button key={t.topic} onClick={() => setSelTopic(t.topic)} id={`topic-${t.topic}`}
                    style={{
                      padding: '.4rem .9rem', borderRadius: 8, border: '1.5px solid',
                      borderColor: selTopic === t.topic ? '#6366f1' : 'var(--c-border)',
                      background: selTopic === t.topic ? '#6366f118' : 'transparent',
                      color: selTopic === t.topic ? '#6366f1' : 'var(--c-text-muted)',
                      fontWeight: selTopic === t.topic ? 700 : 500, cursor: 'pointer', fontSize: '.75rem'
                    }}>
                    {TOPIC_LABEL[t.topic] ?? t.topic} ({t.word_count})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mode */}
          <div style={{ background: 'var(--c-surface)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', border: '1px solid var(--c-border)' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--c-text)', fontSize: '1rem' }}>🎮 Chế độ</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
              {[
                { m: 'animate' as const, icon: '🎬', title: 'Xem animation nét chữ', desc: 'Quan sát thứ tự nét, lặp lại để nhớ', color: '#ec4899' },
                { m: 'quiz' as const, icon: '✍️', title: 'Tự viết (kéo chuột)', desc: 'Kéo chuột theo hướng nét — chấm điểm', color: '#6366f1' },
              ].map(({ m, icon, title, desc, color }) => (
                <button key={m} onClick={() => setHwMode(m)} id={`mode-${m}`}
                  style={{
                    padding: '1rem', borderRadius: 12, border: '2px solid',
                    borderColor: hwMode === m ? color : 'var(--c-border)',
                    background: hwMode === m ? color + '12' : 'var(--c-bg)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all .2s'
                  }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '.2rem' }}>{icon}</div>
                  <div style={{ fontWeight: 700, color: hwMode === m ? color : 'var(--c-text)', fontSize: '.85rem' }}>{title}</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--c-text-muted)', marginTop: '.15rem' }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={startPractice} disabled={loadingWords} id="btn-start-writing"
            style={{
              width: '100%', padding: '1rem', borderRadius: 14, border: 'none',
              background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
              color: '#fff', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
              opacity: loadingWords ? .6 : 1, boxShadow: '0 4px 20px #f59e0b40', transition: 'all .2s'
            }}>
            {loadingWords ? '⏳ Đang tải...' : '✍️ Bắt đầu luyện viết →'}
          </button>
        </>)}

        {/* ─── TAB: Tìm kiếm ─── */}
        {searchMode === 'search' && (<>
          {/* Search box */}
          <div style={{ background: 'var(--c-surface)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', border: '1px solid var(--c-border)' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '.75rem', color: 'var(--c-text)', fontSize: '1rem' }}>🔍 Tìm từ muốn luyện</h3>
            <div style={{ position: 'relative' }}>
              <input
                id="vocab-search-input"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Gõ chữ Hán (你), pinyin (ni), hoặc tiếng Việt (bạn)..."
                autoFocus
                style={{
                  width: '100%', boxSizing: 'border-box' as any,
                  padding: '.75rem 1rem .75rem 2.75rem',
                  borderRadius: 10, border: '2px solid',
                  borderColor: searchQuery ? '#f59e0b' : 'var(--c-border)',
                  background: 'var(--c-bg)', color: 'var(--c-text)',
                  fontSize: '1rem', outline: 'none', transition: 'border-color .2s',
                  fontFamily: 'inherit',
                }}
              />
              <span style={{ position: 'absolute', left: '.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none' }}>🔍</span>
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  style={{ position: 'absolute', right: '.75rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text-muted)', fontSize: '1rem' }}>✕</button>
              )}
            </div>

            {/* Results */}
            <div style={{ marginTop: '1rem' }}>
              {searchLoading && (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--c-text-muted)', fontSize: '.85rem' }}>⏳ Đang tìm...</div>
              )}
              {!searchLoading && searchQuery && searchResults.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--c-text-muted)', fontSize: '.85rem' }}>Không tìm thấy từ nào phù hợp</div>
              )}
              {searchResults.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', maxHeight: 350, overflowY: 'auto' }}>
                  {searchResults.map(w => {
                    const isCustom = customWords.find(x => x.id === w.id);
                    return (
                      <div key={w.id} style={{
                        display: 'flex', alignItems: 'center', gap: '.75rem',
                        padding: '.6rem .85rem', borderRadius: 10,
                        background: isCustom ? '#f59e0b10' : 'var(--c-bg)',
                        border: `1.5px solid ${isCustom ? '#f59e0b60' : 'var(--c-border)'}`,
                        transition: 'all .15s',
                      }}>
                        {/* Chữ lớn */}
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, minWidth: 44, textAlign: 'center',
                          fontFamily: '"Noto Serif CJK SC",serif',
                          background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          {w.hanzi}
                        </div>
                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '.82rem', color: '#6366f1', fontStyle: 'italic' }}>{w.pinyin}</span>
                            {w.hsk_level && (
                              <span style={{ fontSize: '.65rem', fontWeight: 700, padding: '.1rem .4rem',
                                borderRadius: 4, background: (LEVEL_COLOR as any)[w.hsk_level] + '20',
                                color: (LEVEL_COLOR as any)[w.hsk_level] || '#6366f1' }}>
                                {w.hsk_level}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '.8rem', color: 'var(--c-text)', marginTop: '.1rem',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            🇻🇳 {w.meaning_vi}
                          </div>
                        </div>
                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '.35rem', flexShrink: 0 }}>
                          <button onClick={() => startPracticeOne(w)}
                            title="Luyện ngay từ này"
                            style={{ padding: '.35rem .6rem', borderRadius: 6, border: 'none',
                              background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
                              color: '#fff', cursor: 'pointer', fontSize: '.72rem', fontWeight: 700 }}>
                            ▶ Luyện
                          </button>
                          <button onClick={() => toggleCustomWord(w)}
                            title={isCustom ? 'Bỏ khỏi danh sách' : 'Thêm vào danh sách luyện'}
                            style={{ padding: '.35rem .6rem', borderRadius: 6,
                              border: `1.5px solid ${isCustom ? '#f59e0b' : 'var(--c-border)'}`,
                              background: isCustom ? '#f59e0b20' : 'transparent',
                              color: isCustom ? '#f59e0b' : 'var(--c-text-muted)',
                              cursor: 'pointer', fontSize: '.75rem', fontWeight: 700 }}>
                            {isCustom ? '✓ Đã thêm' : '+ Thêm'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {!searchQuery && (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--c-text-muted)', fontSize: '.83rem', lineHeight: 1.8 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🔍</div>
                  Nhập từ bất kỳ để tìm kiếm<br/>
                  <span style={{ fontSize: '.75rem', opacity: .7 }}>Hỗ trợ tìm theo: chữ Hán, pinyin, hoặc nghĩa tiếng Việt</span>
                </div>
              )}
            </div>
          </div>

          {/* Custom list + mode + start */}
          {customWords.length > 0 && (
            <div style={{ background: 'var(--c-surface)', borderRadius: 16, padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid #f59e0b40' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
                <h3 style={{ fontWeight: 800, color: '#f59e0b', fontSize: '.95rem', margin: 0 }}>
                  📋 Danh sách luyện ({customWords.length} từ)
                </h3>
                <button onClick={() => setCustomWords([])}
                  style={{ fontSize: '.72rem', color: 'var(--c-text-muted)', border: 'none', background: 'none', cursor: 'pointer' }}>
                  Xóa tất cả
                </button>
              </div>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {customWords.map(w => (
                  <div key={w.id} style={{
                    display: 'flex', alignItems: 'center', gap: '.3rem',
                    padding: '.3rem .6rem', borderRadius: 8,
                    background: '#f59e0b15', border: '1px solid #f59e0b40',
                  }}>
                    <span style={{ fontWeight: 800, fontFamily: '"Noto Serif CJK SC",serif', fontSize: '1.1rem' }}>{w.hanzi}</span>
                    <span style={{ fontSize: '.7rem', color: '#6366f1' }}>{w.pinyin}</span>
                    <button onClick={() => toggleCustomWord(w)}
                      style={{ marginLeft: '.2rem', background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--c-text-muted)', fontSize: '.8rem', padding: '0 .1rem' }}>✕</button>
                  </div>
                ))}
              </div>
              {/* Mode chọn */}
              <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
                {[
                  { m: 'animate' as const, label: '🎬 Xem animation' },
                  { m: 'quiz' as const, label: '✍️ Tự viết' },
                ].map(({ m, label }) => (
                  <button key={m} onClick={() => setHwMode(m)}
                    style={{ flex: 1, padding: '.5rem', borderRadius: 8, border: '1.5px solid',
                      borderColor: hwMode === m ? '#f59e0b' : 'var(--c-border)',
                      background: hwMode === m ? '#f59e0b15' : 'transparent',
                      color: hwMode === m ? '#f59e0b' : 'var(--c-text-muted)',
                      fontWeight: 700, cursor: 'pointer', fontSize: '.8rem' }}>
                    {label}
                  </button>
                ))}
              </div>
              <button onClick={startPracticeCustom}
                style={{ width: '100%', padding: '.85rem', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
                  color: '#fff', fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
                  boxShadow: '0 4px 16px #f59e0b40' }}>
                ✍️ Luyện {customWords.length} từ đã chọn →
              </button>
            </div>
          )}

          {customWords.length === 0 && (
            <div style={{ padding: '.75rem 1rem', borderRadius: 12, background: '#6366f110', border: '1px solid #6366f130',
              fontSize: '.8rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              💡 <strong style={{ color: '#6366f1' }}>Cách dùng:</strong> Nhấn <strong>▶ Luyện</strong> để luyện ngay 1 từ,
              hoặc nhấn <strong>+ Thêm</strong> để gom nhiều từ rồi luyện cùng lúc
            </div>
          )}
        </>)}
      </div>
    </div>
  );

  // ══════════════════ PRACTICE ══════════════════
  const word = words[wordIdx];
  const lc = LEVEL_COLOR[hskLevel];
  const currentChar = word.hanzi[charIdx]; // chữ đang luyện
  const totalChars = word.hanzi.length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', padding: '1.5rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <button onClick={() => setPhase('setup')}
            style={{
              background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 8,
              padding: '.4rem .9rem', cursor: 'pointer', color: 'var(--c-text-muted)', fontSize: '.82rem'
            }}>← Quay lại</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{ background: lc + '20', color: lc, padding: '.25rem .7rem', borderRadius: 6, fontSize: '.75rem', fontWeight: 800 }}>{hskLevel}</span>
            <span style={{ color: 'var(--c-text-muted)', fontSize: '.85rem', fontWeight: 600 }}>
              Từ {wordIdx + 1}/{words.length}
              {totalChars > 1 && <span style={{ color: '#f59e0b', fontWeight: 800 }}> · Chữ {charIdx + 1}/{totalChars}</span>}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'var(--c-border)', borderRadius: 99, marginBottom: '1.5rem', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99, transition: 'width .4s',
            background: 'linear-gradient(90deg,#f59e0b,#ec4899)',
            width: `${(wordIdx / words.length) * 100}%`
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* ─ Left: Canvas ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'var(--c-surface)', borderRadius: 20,
              border: `2px solid ${canvasStatus === 'ready' ? lc + '60' : 'var(--c-border)'}`,
              padding: '1.25rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.85rem',
              position: 'relative', transition: 'border-color .4s'
            }}>
              {/* Mode badge */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: hwMode === 'animate' ? '#ec4899' : '#6366f1',
                color: '#fff', borderRadius: 6, padding: '.2rem .6rem', fontSize: '.68rem', fontWeight: 700
              }}>
                {hwMode === 'animate' ? '🎬 Xem' : '✍️ Viết'}
              </div>

              {/* Status */}
              <div style={{ fontSize: '.75rem', fontWeight: 600, color: canvasStatus === 'ready' ? '#10b981' : canvasStatus === 'error' ? '#ef4444' : 'var(--c-text-muted)' }}>
                {canvasStatus === 'loading' ? '⏳ Đang tải nét chữ...' : canvasStatus === 'ready' ? '✅ Sẵn sàng' : '⚠️ Không có dữ liệu nét'}
              </div>

              {/* HanziCanvas — key thay đổi khi char/mode/charIdx đổi để force re-mount */}
              <HanziCanvas
                key={`${word.hanzi}-${charIdx}-${hwMode}`}
                char={currentChar}
                mode={hwMode}
                onReady={handleWriterReady}
                onError={handleWriterError}
              />

              {/* Quiz result */}
              {quizResult && (
                <div style={{
                  textAlign: 'center', padding: '.6rem 1.2rem', borderRadius: 10, width: '100%',
                  background: quizResult === 'correct' ? '#10b98120' : '#ef444420',
                  border: `1.5px solid ${quizResult === 'correct' ? '#10b981' : '#ef4444'}`,
                  color: quizResult === 'correct' ? '#10b981' : '#ef4444',
                  fontWeight: 700, fontSize: '.88rem', boxSizing: 'border-box' as any
                }}>
                  {quizResult === 'correct' ? '🎉 Hoàn hảo! Đúng tất cả nét!' : '💪 Xong! Thử lại để nhuần nhuyễn hơn'}
                </div>
              )}

              {/* Controls */}
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button onClick={replayAnimation} id="btn-replay"
                  style={{
                    padding: '.45rem 1rem', borderRadius: 8, border: '1.5px solid var(--c-border)',
                    background: 'var(--c-bg)', color: 'var(--c-text)', cursor: 'pointer',
                    fontSize: '.82rem', fontWeight: 600,
                    opacity: canvasStatus !== 'ready' ? .5 : 1
                  }}>
                  🔄 {hwMode === 'animate' ? 'Xem lại' : 'Thử lại'}
                </button>
                <button onClick={() => setShowHint(h => !h)} id="btn-hint"
                  style={{
                    padding: '.45rem 1rem', borderRadius: 8,
                    border: `1.5px solid ${showHint ? '#f59e0b' : 'var(--c-border)'}`,
                    background: showHint ? '#f59e0b20' : 'var(--c-bg)',
                    color: showHint ? '#f59e0b' : 'var(--c-text-muted)',
                    cursor: 'pointer', fontSize: '.82rem', fontWeight: 600
                  }}>
                  💡 Gợi ý
                </button>
              </div>

              {/* Mode quick switch */}
              <div style={{ display: 'flex', gap: '.4rem', borderTop: '1px solid var(--c-border)', paddingTop: '.65rem', width: '100%', justifyContent: 'center' }}>
                <span style={{ fontSize: '.72rem', color: 'var(--c-text-muted)' }}>Đổi chế độ:</span>
                {hwMode === 'animate'
                  ? <button onClick={() => setHwMode('quiz')} style={{ fontSize: '.72rem', color: '#6366f1', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}>→ Tự viết ✍️</button>
                  : <button onClick={() => setHwMode('animate')} style={{ fontSize: '.72rem', color: '#ec4899', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}>→ Xem animation 🎬</button>
                }
              </div>
            </div>

            {/* Accuracy */}
            {hwMode === 'quiz' && totalStrokes > 0 && (
              <div style={{ background: 'var(--c-surface)', borderRadius: 12, padding: '1rem', border: '1px solid var(--c-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '.75rem', color: 'var(--c-text-muted)', marginBottom: '.25rem' }}>Độ chính xác nét</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: correctStrokes / totalStrokes >= 0.8 ? '#10b981' : '#f59e0b' }}>
                  {Math.round((correctStrokes / totalStrokes) * 100)}%
                </div>
                <div style={{ fontSize: '.73rem', color: 'var(--c-text-muted)' }}>{correctStrokes}/{totalStrokes} nét đúng</div>
              </div>
            )}
          </div>

          {/* ─ Right: Info ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div style={{ background: 'var(--c-surface)', borderRadius: 20, padding: '1.5rem', border: '2px solid var(--c-border)', textAlign: 'center' }}>
              <div style={{
                fontSize: '5rem', fontWeight: 900, lineHeight: 1, marginBottom: '.5rem',
                fontFamily: '"Noto Serif CJK SC","Source Han Serif",serif',
                background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>{word.hanzi}</div>
              <div style={{ fontSize: '1.3rem', color: '#6366f1', fontStyle: 'italic', fontWeight: 600, marginBottom: '.5rem' }}>{word.pinyin}</div>
              <div style={{ fontSize: '.95rem', color: 'var(--c-text)', fontWeight: 600, background: 'var(--c-bg)', padding: '.5rem 1rem', borderRadius: 8, marginBottom: '.5rem' }}>
                🇻🇳 {word.meaning_vi}
              </div>
              {word.word_type && (
                <span style={{ background: '#6366f118', color: '#6366f1', padding: '.25rem .7rem', borderRadius: 6, fontSize: '.75rem', fontWeight: 700 }}>
                  {TOPIC_LABEL[word.word_type] ?? word.word_type}
                </span>
              )}
              {totalChars > 1 && (
                <div style={{ marginTop: '.6rem', background: '#6366f110', padding: '.4rem .8rem', borderRadius: 8, display: 'flex', gap: '.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {word.hanzi.split('').map((ch, i) => (
                    <span key={i} style={{
                      fontSize: '1.3rem', fontWeight: 900,
                      fontFamily: '"Noto Serif CJK SC",serif',
                      color: i === charIdx ? '#6366f1' : 'var(--c-text-muted)',
                      borderBottom: i === charIdx ? '2px solid #6366f1' : '2px solid transparent',
                      paddingBottom: '.1rem', transition: 'all .2s'
                    }}>{ch}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Hint */}
            {showHint && (
              <div style={{ background: '#f59e0b10', border: '1.5px solid #f59e0b40', borderRadius: 14, padding: '1.1rem' }}>
                <div style={{ fontWeight: 800, color: '#f59e0b', marginBottom: '.65rem', fontSize: '.88rem' }}>💡 Nguyên tắc viết chữ</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', fontSize: '.8rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
                  <div>📐 Trái → phải · Trên → dưới</div>
                  <div>➡️ Nét ngang viết trước nét dọc</div>
                  <div>⬛ Bộ thủ ngoài viết trước phần trong</div>
                  <div>📦 Chữ bao: ngoài → trong → đóng đáy</div>
                  {word.stroke_count > 0 && <div style={{ color: '#f59e0b', fontWeight: 700 }}>✏️ Tổng số nét: {word.stroke_count}</div>}
                </div>
                {hwMode === 'quiz' && (
                  <div style={{ marginTop: '.75rem', padding: '.5rem .75rem', background: '#6366f110', borderRadius: 8, fontSize: '.75rem', color: '#6366f1', fontWeight: 600 }}>
                    ✍️ Nhấn giữ chuột và kéo theo hướng nét chữ
                  </div>
                )}
              </div>
            )}

            {/* Next words */}
            <div style={{ background: 'var(--c-surface)', borderRadius: 14, padding: '1rem', border: '1px solid var(--c-border)' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--c-text-muted)', fontWeight: 700, marginBottom: '.6rem' }}>📋 Từ tiếp theo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                {words.slice(wordIdx + 1, wordIdx + 4).map((w, i) => (
                  <div key={w.id} style={{
                    display: 'flex', alignItems: 'center', gap: '.6rem',
                    padding: '.3rem .5rem', borderRadius: 8,
                    background: i === 0 ? 'var(--c-bg)' : 'transparent', opacity: 1 - i * 0.22
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', fontFamily: '"Noto Serif CJK SC",serif', minWidth: 32 }}>{w.hanzi}</span>
                    <span style={{ fontSize: '.73rem', color: '#6366f1', fontStyle: 'italic' }}>{w.pinyin}</span>
                    <span style={{ fontSize: '.7rem', color: 'var(--c-text-muted)', marginLeft: 'auto' }}>{w.meaning_vi.split('/')[0].trim()}</span>
                  </div>
                ))}
                {wordIdx + 1 >= words.length && (
                  <div style={{ fontSize: '.8rem', color: '#10b981', textAlign: 'center', padding: '.4rem' }}>🎉 Từ cuối cùng!</div>
                )}
              </div>
            </div>

            <button onClick={nextChar} id="btn-next-word"
              style={{
                padding: '1rem', borderRadius: 14, border: 'none', fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
                color: '#fff', transition: 'all .2s',
                background: wordIdx + 1 >= words.length && charIdx + 1 >= totalChars
                  ? 'linear-gradient(135deg,#10b981,#3b82f6)'
                  : charIdx + 1 < totalChars
                    ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                    : 'linear-gradient(135deg,#f59e0b,#ec4899)',
                boxShadow: '0 4px 16px #f59e0b30'
              }}>
              {wordIdx + 1 >= words.length && charIdx + 1 >= totalChars
                ? '✅ Hoàn thành bài!'
                : charIdx + 1 < totalChars
                  ? `→ Chữ tiếp: ${word.hanzi[charIdx + 1]} (${charIdx + 2}/${totalChars})`
                  : '→ Từ tiếp theo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

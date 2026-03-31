'use client';
import { useCallback } from 'react';
import { pinyinToVietnamese } from '@/lib/pinyinToVietnamese';

/* ── Tone colors ── */
export const TONE_COLOR: Record<number, string> = {
  1: '#06b6d4',
  2: '#10b981',
  3: '#f59e0b',
  4: '#ef4444',
  5: '#8b5cf6',
};

const TONE_LABEL: Record<number, string> = {
  1: '1声 (bình)',
  2: '2声 (sắc)',
  3: '3声 (hỏi)',
  4: '4声 (nặng)',
  5: '轻声 (nhẹ)',
};

/* ── Extract tone from one syllable ── */
const TONE_MAP: Record<string, number> = {
  'ā':1,'á':2,'ǎ':3,'à':4,
  'ē':1,'é':2,'ě':3,'è':4,
  'ī':1,'í':2,'ǐ':3,'ì':4,
  'ō':1,'ó':2,'ǒ':3,'ò':4,
  'ū':1,'ú':2,'ǔ':3,'ù':4,
  'ǖ':1,'ǘ':2,'ǚ':3,'ǜ':4,
};

function getTone(syl: string): number {
  for (const [ch, t] of Object.entries(TONE_MAP)) {
    if (syl.includes(ch)) return t;
  }
  return 5;
}

function stripTone(syl: string): string {
  return syl
    .replace(/[āáǎà]/g,'a').replace(/[ēéěè]/g,'e')
    .replace(/[īíǐì]/g,'i').replace(/[ōóǒò]/g,'o')
    .replace(/[ūúǔù]/g,'u').replace(/[ǖǘǚǜ]/g,'ü');
}

/* ── Initial consonant pronunciation tips ── */
const INITIAL_TIPS: Record<string, { vn: string; mouth: string; emoji: string }> = {
  'b':  { vn:'giống "b" tiếng Việt', mouth:'Mím môi, bật hơi nhẹ', emoji:'👄' },
  'p':  { vn:'giống "ph" tiếng Việt', mouth:'Mím môi, bật hơi mạnh', emoji:'💨' },
  'm':  { vn:'giống "m" tiếng Việt', mouth:'Mím môi, thở ra mũi', emoji:'👃' },
  'f':  { vn:'giống "ph" tiếng Việt', mouth:'Môi dưới chạm răng trên, thổi hơi', emoji:'🦷' },
  'd':  { vn:'giống "đ" tiếng Việt', mouth:'Lưỡi chạm vòm miệng trước, bật nhẹ', emoji:'👅' },
  't':  { vn:'giống "t" tiếng Việt', mouth:'Lưỡi chạm vòm miệng trước, bật mạnh', emoji:'💨' },
  'n':  { vn:'giống "n" tiếng Việt', mouth:'Lưỡi chạm vòm miệng, thở mũi', emoji:'👃' },
  'l':  { vn:'giống "l" tiếng Việt', mouth:'Lưỡi chạm vòm miệng, hơi trôi hai bên', emoji:'👅' },
  'g':  { vn:'giống "g" tiếng Việt', mouth:'Gốc lưỡi chạm vòm họng, bật nhẹ', emoji:'👅' },
  'k':  { vn:'giống "kh" tiếng Việt', mouth:'Gốc lưỡi chạm vòm họng, bật mạnh', emoji:'💨' },
  'h':  { vn:'giống "h" tiếng Việt nhưng mạnh hơn', mouth:'Hơi từ cổ họng, ma sát nhẹ', emoji:'😤' },
  'j':  { vn:'⚠️ KHÔNG có trong tiếng Việt', mouth:'Đầu lưỡi PHẲNG, chạm vòm cứng, bật nhẹ', emoji:'⚠️' },
  'q':  { vn:'⚠️ KHÔNG có trong tiếng Việt', mouth:'Đầu lưỡi PHẲNG, chạm vòm cứng, bật mạnh', emoji:'⚠️' },
  'x':  { vn:'⚠️ Khác "x" tiếng Việt — lưỡi dẹt hơn', mouth:'Đầu lưỡi PHẲNG sát răng dưới, thổi hơi', emoji:'⚠️' },
  'zh': { vn:'⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth:'Đầu lưỡi CUỘN lên vòm, bật nhẹ', emoji:'🌀' },
  'ch': { vn:'⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth:'Đầu lưỡi CUỘN lên vòm, bật mạnh', emoji:'🌀' },
  'sh': { vn:'⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth:'Đầu lưỡi CUỘN lên vòm, thổi hơi', emoji:'🌀' },
  'r':  { vn:'⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth:'Đầu lưỡi CUỘN, rung nhẹ', emoji:'🌀' },
  'z':  { vn:'giống "d" tiếng Việt nhưng có ma sát', mouth:'Đầu lưỡi chạm răng, bật nhẹ + ma sát', emoji:'👅' },
  'c':  { vn:'⚠️ "ts" — không có trong tiếng Việt', mouth:'Đầu lưỡi chạm răng, bật mạnh + ma sát', emoji:'⚠️' },
  's':  { vn:'giống "x" tiếng Việt', mouth:'Đầu lưỡi gần răng dưới, thổi hơi', emoji:'👄' },
  'w':  { vn:'giống "u" tiếng Việt', mouth:'Môi tròn và đẩy ra trước', emoji:'👄' },
  'y':  { vn:'giống "i" tiếng Việt', mouth:'Môi kéo sang hai bên', emoji:'😀' },
};

function getInitial(pinyin: string): string | null {
  const noTone = stripTone(pinyin).toLowerCase();
  for (const init of ['zh','ch','sh']) {
    if (noTone.startsWith(init)) return init;
  }
  if (noTone.startsWith('qu')) return 'q';
  for (const init of ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','w','y']) {
    if (noTone.startsWith(init)) return init;
  }
  return null;
}

/* ── Tone pitch curve SVG ── */
function ToneCurve({ tone, size = 60, color }: { tone: number; size?: number; color: string }) {
  const w = size;
  const h = size * 0.7;
  const scaleY = (n: number) => h - (n / 5) * h;

  const paths: Record<number, string> = {
    1: `M 8,${h*0.2} L ${w-8},${h*0.2}`,
    2: `M 8,${h*0.75} L ${w-8},${h*0.1}`,
    3: `M 8,${h*0.4} Q ${w*0.35},${h*0.85} ${w*0.55},${h*0.8} L ${w-8},${h*0.2}`,
    4: `M 8,${h*0.1} L ${w-8},${h*0.85}`,
    5: `M 8,${h*0.6} L ${w*0.5},${h*0.6}`,
  };

  return (
    <svg width={w} height={h + 16} style={{ display: 'block' }}>
      {[1,2,3,4,5].map(n => (
        <line key={n} x1={4} y1={scaleY(n)+2} x2={w-4} y2={scaleY(n)+2}
          stroke="var(--c-border)" strokeWidth={0.5} strokeDasharray="2,3"/>
      ))}
      {[1,3,5].map(n => (
        <text key={n} x={2} y={scaleY(n)+5} fill="var(--c-text-muted)" fontSize={6}>{n}</text>
      ))}
      <path d={paths[tone] || paths[5]} fill="none" stroke={color}
        strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
      {tone === 2 && <polygon points={`${w-8},${h*0.1} ${w-14},${h*0.18} ${w-11},${h*0.22}`} fill={color}/>}
      {tone === 4 && <polygon points={`${w-8},${h*0.85} ${w-14},${h*0.72} ${w-11},${h*0.76}`} fill={color}/>}
    </svg>
  );
}

/* ── Single syllable card ── */
function SyllableCard({ syllable }: { syllable: string }) {
  const tone = getTone(syllable);
  const stripped = stripTone(syllable);
  const color = TONE_COLOR[tone];
  const initial = getInitial(syllable);
  const tip = initial ? INITIAL_TIPS[initial] : null;
  const vietPron = pinyinToVietnamese(syllable);

  return (
    <div style={{
      background: 'var(--c-bg)', borderRadius: 14, padding: '1rem',
      border: `2px solid ${color}40`, flex: 1, minWidth: 130,
      textAlign: 'center',
    }}>
      {/* Pinyin */}
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color, marginBottom: '.25rem', letterSpacing: 1 }}>
        {syllable}
      </div>

      {/* Phiên âm tiếng Việt — nổi bật */}
      <div style={{
        background: color+'18', border: `1.5px solid ${color}50`,
        borderRadius: 8, padding: '.3rem .6rem', marginBottom: '.4rem',
        display: 'inline-block',
      }}>
        <div style={{ fontSize: '.55rem', color: 'var(--c-text-muted)', fontWeight: 700,
          marginBottom: '.1rem', textTransform:'uppercase', letterSpacing:.5 }}>
          🇻🇳 Đọc giống
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 900, color, letterSpacing: 1 }}>
          {vietPron}
        </div>
      </div>

      <div style={{ fontSize: '.68rem', color: 'var(--c-text-muted)', marginBottom: '.5rem' }}>
        pinyin: <span style={{ color: 'var(--c-text)', fontWeight: 600, fontFamily:'monospace' }}>{stripped}</span>
      </div>

      {/* Tone curve */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.5rem' }}>
        <ToneCurve tone={tone} size={56} color={color}/>
      </div>

      {/* Tone label */}
      <div style={{
        display: 'inline-block', padding: '.15rem .55rem', borderRadius: 20,
        background: color + '20', color, fontSize: '.7rem', fontWeight: 800, marginBottom: '.5rem'
      }}>
        {TONE_LABEL[tone]}
      </div>

      {/* Initial tip */}
      {tip && (
        <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '.5rem', marginTop: '.5rem',
          textAlign: 'left' }}>
          <div style={{ fontSize: '.68rem', fontWeight: 800, color: 'var(--c-text)', marginBottom: '.2rem' }}>
            {tip.emoji} Âm đầu: <span style={{ color, fontFamily:'monospace' }}>{initial}</span>
          </div>
          <div style={{ fontSize: '.65rem', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
            <div>🇻🇳 {tip.vn}</div>
            <div>👄 {tip.mouth}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
interface PronunciationGuideProps {
  hanzi: string;
  pinyin: string;
  meaning_vi: string;
  onClose?: () => void;
  compact?: boolean;
}

export function PronunciationGuide({ hanzi, pinyin, meaning_vi, onClose, compact=false }: PronunciationGuideProps) {
  const syllables = pinyin.trim().split(/\s+/).filter(Boolean);
  const tones = syllables.map(getTone);
  const fullVietPron = pinyinToVietnamese(pinyin);

  const playAudio = useCallback(() => {
    new Audio(`http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`).play().catch(() => {});
  }, [hanzi]);

  return (
    <div style={{
      background: compact ? 'transparent' : 'var(--c-surface)',
      borderRadius: compact ? 0 : 20,
      padding: compact ? '1rem 0' : '1.5rem',
      border: compact ? 0 : '1px solid var(--c-border)',
      position: 'relative',
    }}>
      {/* Close button */}
      {onClose && (
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'var(--c-bg)', border: '1px solid var(--c-border)',
          borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
          color: 'var(--c-text-muted)', fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{
          fontSize: compact ? '2.5rem' : '3.5rem', fontWeight: 900,
          fontFamily: '"Noto Serif CJK SC",serif',
          background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>{hanzi}</div>

        <div style={{ flex: 1 }}>
          {/* Pinyin colored by tone */}
          <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.3rem' }}>
            {syllables.map((s, i) => (
              <span key={i} style={{ fontSize: '1.2rem', fontWeight: 700, fontStyle: 'italic', color: TONE_COLOR[tones[i]] }}>
                {s}
              </span>
            ))}
          </div>

          {/* Phiên âm tiếng Việt toàn từ */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.45rem',
            background: '#f59e0b12', border: '1.5px solid #f59e0b50',
            borderRadius: 10, padding: '.3rem .7rem', marginBottom: '.3rem',
          }}>
            <span style={{ fontSize: '.6rem', color: '#f59e0b', fontWeight: 800, textTransform:'uppercase', letterSpacing:.6 }}>
              🇻🇳 Phiên âm TV
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#f59e0b', letterSpacing: 1 }}>
              {fullVietPron}
            </span>
          </div>

          <div style={{ fontSize: '.88rem', color: 'var(--c-text)', fontWeight: 600 }}>🇻🇳 {meaning_vi}</div>
        </div>

        <button onClick={playAudio} style={{
          padding: '.5rem 1rem', borderRadius: 10, border: 'none',
          background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
          color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '.85rem', flexShrink: 0,
        }}>🔊 Nghe</button>
      </div>

      {/* Tone overview row */}
      <div style={{
        display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1rem',
        padding: '.6rem .75rem', borderRadius: 10, background: 'var(--c-bg)',
        border: '1px solid var(--c-border)',
      }}>
        <span style={{ fontSize: '.72rem', color: 'var(--c-text-muted)', fontWeight: 600, marginRight: '.3rem', alignSelf:'center' }}>Thanh điệu:</span>
        {syllables.map((s, i) => {
          const t = tones[i]; const c = TONE_COLOR[t];
          return (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: '.25rem',
              padding: '.15rem .5rem', borderRadius: 20, background: c+'15',
              fontSize: '.7rem', color: c, fontWeight: 800,
            }}>
              {s} → {TONE_LABEL[t]}
            </span>
          );
        })}
      </div>

      {/* Syllable breakdown cards */}
      <div style={{ fontSize: '.75rem', color: 'var(--c-text-muted)', fontWeight: 700, marginBottom: '.5rem',
        textTransform: 'uppercase', letterSpacing: 1 }}>
        Phân tích từng âm tiết
      </div>
      <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {syllables.map((s, i) => <SyllableCard key={i} syllable={s}/>)}
      </div>

      {/* Tone legend */}
      <div style={{ background: 'var(--c-bg)', borderRadius: 12, padding: '.85rem 1rem', border: '1px solid var(--c-border)' }}>
        <div style={{ fontSize: '.72rem', color: 'var(--c-text-muted)', fontWeight: 700, marginBottom: '.6rem',
          textTransform: 'uppercase', letterSpacing: 1 }}>
          📈 Đường nét cao độ 4 thanh điệu
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {[1,2,3,4,5].map(t => (
            <div key={t} style={{ textAlign: 'center' }}>
              <ToneCurve tone={t} size={44} color={TONE_COLOR[t]}/>
              <div style={{ fontSize: '.63rem', color: TONE_COLOR[t], fontWeight: 800, marginTop: '.15rem' }}>
                {['','ˉ','ˊ','ˇ','ˋ','·'][t]}
              </div>
              <div style={{ fontSize: '.58rem', color: 'var(--c-text-muted)', marginTop: '.05rem' }}>
                {['','55','35','214','51','nhẹ'][t]}
              </div>
            </div>
          ))}
          <div style={{ fontSize: '.68rem', color: 'var(--c-text-muted)', lineHeight: 1.7, flex: 1, minWidth: 160 }}>
            <strong style={{ color: 'var(--c-text)' }}>Tương đương tiếng Việt:</strong><br/>
            <strong style={{ color: TONE_COLOR[1] }}>1声 ˉ (bình)</strong>: không dấu — âm bằng cao<br/>
            <strong style={{ color: TONE_COLOR[2] }}>2声 ˊ (sắc)</strong>: dấu sắc — âm lên<br/>
            <strong style={{ color: TONE_COLOR[3] }}>3声 ˇ (hỏi)</strong>: dấu hỏi — xuống rồi lên<br/>
            <strong style={{ color: TONE_COLOR[4] }}>4声 ˋ (nặng)</strong>: dấu <u>huyền</u> — âm xuống mạnh
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Modal wrapper ── */
export function PronunciationModal({ hanzi, pinyin, meaning_vi, onClose }: {
  hanzi: string; pinyin: string; meaning_vi: string; onClose: () => void;
}) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: '#000a', zIndex: 9000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 700, width: '100%', maxHeight: '90vh', overflowY: 'auto',
        borderRadius: 20, boxShadow: '0 20px 60px #0008',
      }}>
        <PronunciationGuide hanzi={hanzi} pinyin={pinyin} meaning_vi={meaning_vi} onClose={onClose}/>
      </div>
    </div>
  );
}

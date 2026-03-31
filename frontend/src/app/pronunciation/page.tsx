'use client';
import { useState, useCallback } from 'react';
import { TONE_COLOR } from '@/components/PronunciationGuide';
import { PronunciationModal } from '@/components/PronunciationGuide';

/* ─── Data ─── */
const INITIALS_DATA = [
  { group: '双唇音 (âm 2 môi)', color: '#06b6d4', items: [
    { init: 'b', ex_hanzi: '爸', ex_pinyin: 'bà', ex_vi: 'bố', desc: 'Giống "b" tiếng Việt, bật hơi nhẹ', mouth: '👄 Mím 2 môi → bật nhẹ' },
    { init: 'p', ex_hanzi: '怕', ex_pinyin: 'pà', ex_vi: 'sợ', desc: 'Giống "ph" tiếng Việt, bật hơi mạnh', mouth: '💨 Mím 2 môi → bật mạnh' },
    { init: 'm', ex_hanzi: '妈', ex_pinyin: 'mā', ex_vi: 'mẹ', desc: 'Giống "m" tiếng Việt', mouth: '👃 Mím môi, thở ra mũi' },
  ]},
  { group: '唇齿音 (âm môi-răng)', color: '#8b5cf6', items: [
    { init: 'f', ex_hanzi: '法', ex_pinyin: 'fǎ', ex_vi: 'pháp', desc: 'Giống "ph" tiếng Việt', mouth: '🦷 Môi dưới chạm răng trên' },
  ]},
  { group: '舌尖音 (âm đầu lưỡi-răng)', color: '#10b981', items: [
    { init: 'd', ex_hanzi: '大', ex_pinyin: 'dà', ex_vi: 'lớn', desc: 'Giống "đ" tiếng Việt', mouth: '👅 Lưỡi chạm vòm trước → bật nhẹ' },
    { init: 't', ex_hanzi: '他', ex_pinyin: 'tā', ex_vi: 'anh ấy', desc: 'Giống "t" tiếng Việt', mouth: '💨 Lưỡi chạm vòm trước → bật mạnh' },
    { init: 'n', ex_hanzi: '你', ex_pinyin: 'nǐ', ex_vi: 'bạn', desc: 'Giống "n" tiếng Việt', mouth: '👃 Lưỡi chạm vòm, thở mũi' },
    { init: 'l', ex_hanzi: '来', ex_pinyin: 'lái', ex_vi: 'đến', desc: 'Giống "l" tiếng Việt', mouth: '👅 Hơi trôi hai bên lưỡi' },
  ]},
  { group: '舌根音 (âm gốc lưỡi)', color: '#f59e0b', items: [
    { init: 'g', ex_hanzi: '个', ex_pinyin: 'gè', ex_vi: '(lượng từ)', desc: 'Giống "g" tiếng Việt', mouth: '👅 Gốc lưỡi → vòm họng, bật nhẹ' },
    { init: 'k', ex_hanzi: '看', ex_pinyin: 'kàn', ex_vi: 'nhìn', desc: 'Giống "k/c" tiếng Việt', mouth: '💨 Gốc lưỡi → vòm họng, bật mạnh' },
    { init: 'h', ex_hanzi: '好', ex_pinyin: 'hǎo', ex_vi: 'tốt', desc: 'Giống "h" nhưng có ma sát', mouth: '😤 Hơi từ cổ họng, hơi khàn' },
  ]},
  { group: '⚠️ 舌面音 — ĐẶC BIỆT! (lưỡi dẹt)', color: '#ec4899', items: [
    { init: 'j', ex_hanzi: '家', ex_pinyin: 'jiā', ex_vi: 'nhà', desc: '⚠️ KHÁC tiếng Việt hoàn toàn!', mouth: '🔴 Đầu lưỡi PHẲNG sát răng dưới\n→ Lưng lưỡi chạm vòm cứng, bật nhẹ' },
    { init: 'q', ex_hanzi: '去', ex_pinyin: 'qù', ex_vi: 'đi', desc: '⚠️ KHÁC tiếng Việt hoàn toàn!', mouth: '🔴 Đầu lưỡi PHẲNG sát răng dưới\n→ Lưng lưỡi → vòm cứng, bật mạnh' },
    { init: 'x', ex_hanzi: '小', ex_pinyin: 'xiǎo', ex_vi: 'nhỏ', desc: '⚠️ KHÁC "x" tiếng Việt — lưỡi dẹt hơn', mouth: '🔴 Đầu lưỡi PHẲNG sát răng dưới\n→ Thổi hơi qua khe hẹp' },
  ]},
  { group: '⚠️ 翘舌音 — ĐẶC BIỆT! (cuộn lưỡi)', color: '#ef4444', items: [
    { init: 'zh', ex_hanzi: '中', ex_pinyin: 'zhōng', ex_vi: 'trung', desc: '⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth: '🌀 Đầu lưỡi CUỘN lên vòm cứng\n→ Bật nhẹ khi hạ xuống' },
    { init: 'ch', ex_hanzi: '吃', ex_pinyin: 'chī', ex_vi: 'ăn', desc: '⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth: '🌀 Đầu lưỡi CUỘN lên vòm cứng\n→ Bật mạnh khi hạ xuống' },
    { init: 'sh', ex_hanzi: '是', ex_pinyin: 'shì', ex_vi: 'là', desc: '⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth: '🌀 Đầu lưỡi CUỘN lên vòm cứng\n→ Thổi hơi qua khe hẹp' },
    { init: 'r', ex_hanzi: '人', ex_pinyin: 'rén', ex_vi: 'người', desc: '⚠️ Cuộn lưỡi — KHÔNG có trong tiếng Việt!', mouth: '🌀 Đầu lưỡi CUỘN, rung nhẹ\n→ Hơi rung như "r" Pháp' },
  ]},
  { group: '平舌音 (lưỡi phẳng)', color: '#84cc16', items: [
    { init: 'z', ex_hanzi: '字', ex_pinyin: 'zì', ex_vi: 'chữ', desc: 'Như "d" tiếng Việt + ma sát', mouth: '👅 Đầu lưỡi chạm răng + bật + ma sát' },
    { init: 'c', ex_hanzi: '次', ex_pinyin: 'cì', ex_vi: 'lần', desc: '⚠️ "ts" — KHÔNG có trong tiếng Việt!', mouth: '💨 Đầu lưỡi chạm răng → bật mạnh + ma sát' },
    { init: 's', ex_hanzi: '四', ex_pinyin: 'sì', ex_vi: 'bốn', desc: 'Giống "x" tiếng Việt', mouth: '😊 Đầu lưỡi gần răng dưới, thổi hơi' },
  ]},
];

const TONES_EXAMPLES = [
  { tone: 1, char: '妈', pinyin: 'mā', vi: 'mẹ',    svg: [[0,0.15],[1,0.15]], label:'Giữ cao đều — đọc giống hỏi "à?"' },
  { tone: 2, char: '麻', pinyin: 'má', vi: 'gai vừng', svg: [[0,0.7],[1,0.05]], label:'Lên nhanh — như hỏi "Hả?"' },
  { tone: 3, char: '马', pinyin: 'mǎ', vi: 'ngựa',  svg: [[0,0.4],[0.45,0.85],[0.6,0.8],[1,0.2]], label:'Xuống rồi lên — như "Máy" uốn giọng' },
  { tone: 4, char: '骂', pinyin: 'mà', vi: 'chửi',  svg: [[0,0.05],[1,0.9]], label:'Xuống dốc mạnh — như quát "Không!"' },
];

function ToneSVGPath({ points, color, w=80, h=50 }: { points:[number,number][]; color:string; w?:number; h?:number }) {
  const d = points.map((p,i) => `${i===0?'M':'L'} ${p[0]*w} ${p[1]*h}`).join(' ');
  return (
    <svg width={w} height={h+10} style={{display:'block'}}>
      {[0.15,0.5,0.85].map(y => <line key={y} x1={0} y1={y*h} x2={w} y2={y*h} stroke="var(--c-border)" strokeWidth={0.5} strokeDasharray="3,3"/>)}
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function PronunciationPage() {
  const [modal, setModal] = useState<{hanzi:string;pinyin:string;vi:string}|null>(null);
  const [activeSection, setActiveSection] = useState<'tones'|'initials'>('tones');

  const play = useCallback((hanzi: string) => {
    new Audio(`http://localhost:5000/api/tts?text=${encodeURIComponent(hanzi)}&lang=zh-CN`).play().catch(()=>{});
  }, []);

  return (
    <div style={{minHeight:'100vh',background:'var(--c-bg)',padding:'2rem 1.5rem'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <div style={{fontSize:'3.5rem',marginBottom:'.4rem'}}>🗣️</div>
          <h1 style={{fontSize:'2.2rem',fontWeight:900,marginBottom:'.4rem',
            background:'linear-gradient(135deg,#06b6d4,#8b5cf6)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Hướng dẫn Phát âm Tiếng Trung
          </h1>
          <p style={{color:'var(--c-text-muted)',maxWidth:600,margin:'0 auto',lineHeight:1.7}}>
            Học cách phát âm đúng — Đường cao độ 4 thanh điệu · Vị trí phát âm từng âm đầu · Mẹo cho người Việt
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{display:'flex',gap:'.5rem',marginBottom:'2rem',
          background:'var(--c-surface)',borderRadius:12,padding:'.4rem',border:'1px solid var(--c-border)'}}>
          {[
            {k:'tones' as const, label:'🎵 4 Thanh Điệu'},
            {k:'initials' as const, label:'👄 Âm Đầu (声母)'},
          ].map(tab => (
            <button key={tab.k} onClick={() => setActiveSection(tab.k)}
              style={{flex:1,padding:'.7rem',borderRadius:8,border:'none',cursor:'pointer',
                fontWeight:700,fontSize:'.9rem',transition:'all .2s',
                background:activeSection===tab.k?'linear-gradient(135deg,#06b6d4,#8b5cf6)':'transparent',
                color:activeSection===tab.k?'#fff':'var(--c-text-muted)'}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TONES ── */}
        {activeSection === 'tones' && (<>
          <div style={{background:'var(--c-surface)',borderRadius:20,padding:'1.5rem',
            border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
            <h2 style={{fontWeight:900,marginBottom:'1.25rem',color:'var(--c-text)',fontSize:'1.1rem'}}>
              📈 Biểu đồ cao độ 4 thanh điệu
            </h2>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem'}}>
              {TONES_EXAMPLES.map(t => {
                const c = TONE_COLOR[t.tone];
                return (
                  <div key={t.tone} style={{
                    background:'var(--c-bg)',borderRadius:14,padding:'1.25rem',
                    border:`2px solid ${c}40`,position:'relative',overflow:'hidden',
                  }}>
                    {/* Bgcolor decoration */}
                    <div style={{position:'absolute',top:0,right:0,width:60,height:60,
                      borderRadius:'50%',background:c+'08',transform:'translate(15px,-15px)'}}/>

                    {/* Tone number */}
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'.75rem'}}>
                      <div style={{display:'inline-flex',alignItems:'center',gap:'.4rem',
                        padding:'.2rem .6rem',borderRadius:20,background:c+'20'}}>
                        <span style={{fontSize:'1rem',fontWeight:900,color:c}}>{t.tone}声</span>
                        <span style={{fontSize:'1rem',color:c}}>{['','ˉ','ˊ','ˇ','ˋ'][t.tone]}</span>
                      </div>
                      <button onClick={() => play(t.char)}
                        style={{background:'none',border:`1px solid ${c}50`,borderRadius:7,
                          padding:'.2rem .5rem',cursor:'pointer',color:c,fontSize:'.75rem'}}>
                        🔊
                      </button>
                    </div>

                    {/* SVG curve */}
                    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-end',marginBottom:'.5rem',
                      background:c+'08',borderRadius:10,padding:'.5rem'}}>
                      <ToneSVGPath points={t.svg as any} color={c} w={90} h={55}/>
                      {/* Scale */}
                      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',
                        height:55,marginLeft:'.4rem',fontSize:'.58rem',color:'var(--c-text-muted)'}}>
                        <span>高5</span><span>中3</span><span>低1</span>
                      </div>
                    </div>

                    {/* Example word */}
                    <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'.6rem'}}>
                      <button onClick={() => setModal({hanzi:t.char,pinyin:t.pinyin,vi:t.vi})}
                        style={{background:'none',border:'none',cursor:'pointer',textAlign:'left',flex:1}}>
                        <div style={{fontSize:'2.5rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                          color:c,lineHeight:1}}>{t.char}</div>
                        <div style={{fontSize:.9+'rem',fontStyle:'italic',color:c+'cc'}}>{t.pinyin}</div>
                        <div style={{fontSize:'.78rem',color:'var(--c-text-muted)'}}>{t.vi}</div>
                      </button>
                    </div>

                    {/* Tip */}
                    <div style={{background:c+'10',borderRadius:8,padding:'.5rem .6rem',
                      fontSize:'.72rem',color:'var(--c-text)',lineHeight:1.6}}>
                      💡 {t.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Neutral tone */}
          <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',
            border:'1px solid var(--c-border)',marginBottom:'1.5rem'}}>
            <h3 style={{fontWeight:800,marginBottom:'.75rem',color:'var(--c-text)',fontSize:.95+'rem'}}>
              <span style={{color:TONE_COLOR[5]}}>·</span> 轻声 (Thanh nhẹ / Neutral Tone)
            </h3>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',alignItems:'center'}}>
              <div style={{flex:1,minWidth:200,fontSize:'.85rem',color:'var(--c-text-muted)',lineHeight:1.8}}>
                <div>📌 Không có ký hiệu thanh điệu — đọc nhanh và nhẹ</div>
                <div>📌 Thường ở âm tiết cuối của từ ghép</div>
                <div>📌 Ví dụ: 的 <span style={{fontStyle:'italic',color:TONE_COLOR[5]}}>de</span> (nhẹ) · 了 <span style={{fontStyle:'italic',color:TONE_COLOR[5]}}>le</span> (nhẹ)</div>
              </div>
              <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap'}}>
                {['的 de','了 le','吗 ma','呢 ne'].map(ex => {
                  const [ch, py] = ex.split(' ');
                  return (
                    <button key={ex} onClick={() => play(ch)}
                      style={{padding:'.5rem .75rem',borderRadius:10,border:`1.5px solid ${TONE_COLOR[5]}40`,
                        background:`${TONE_COLOR[5]}10`,cursor:'pointer',textAlign:'center'}}>
                      <div style={{fontSize:'1.6rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',
                        color:TONE_COLOR[5],lineHeight:1}}>{ch}</div>
                      <div style={{fontSize:'.7rem',color:TONE_COLOR[5],fontStyle:'italic'}}>{py}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tone sandhi rules */}
          <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',border:'1px solid var(--c-border)'}}>
            <h3 style={{fontWeight:800,marginBottom:'1rem',color:'var(--c-text)',fontSize:'.95rem'}}>
              🔄 Quy tắc biến thanh quan trọng
            </h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'.85rem'}}>
              {[
                { rule:'3声 + 3声 → 2声 + 3声', example:'你好 nǐhǎo → níhǎo', desc:'Khi 2 thanh 3 liền nhau, thanh đầu đổi thành thanh 2', color:'#f59e0b' },
                { rule:'"不" bù (4声) + 4声 → 2声', example:'不是 bùshì → búshì', desc:'不 trước thanh 4 thì đổi thành thanh 2', color:'#ef4444' },
                { rule:'"一" yī + 4声 → 2声', example:'一个 yīgè → yígè', desc:'一 trước thanh 4 thì đổi thành thanh 2', color:'#06b6d4' },
                { rule:'"一" yī + 非4声 → 4声', example:'一天 yītiān → yìtiān', desc:'一 trước thanh 1/2/3 thì đổi thành thanh 4', color:'#10b981' },
              ].map(r => (
                <div key={r.rule} style={{background:'var(--c-bg)',borderRadius:12,padding:'1rem',border:`1.5px solid ${r.color}30`}}>
                  <div style={{fontWeight:800,color:r.color,fontSize:'.82rem',marginBottom:'.3rem',fontFamily:'monospace'}}>{r.rule}</div>
                  <div style={{fontSize:'.88rem',fontStyle:'italic',color:'var(--c-text)',marginBottom:'.3rem',fontFamily:'"Noto Serif CJK SC",serif'}}>{r.example}</div>
                  <div style={{fontSize:'.72rem',color:'var(--c-text-muted)',lineHeight:1.5}}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {/* ── INITIALS ── */}
        {activeSection === 'initials' && (<>
          <div style={{background:'#f59e0b10',border:'1px solid #f59e0b30',borderRadius:12,
            padding:'.85rem 1rem',marginBottom:'1.5rem',fontSize:'.83rem',color:'var(--c-text-muted)',lineHeight:1.7}}>
            💡 <strong style={{color:'#f59e0b'}}>Mẹo cho người Việt:</strong> Những âm <strong style={{color:'#ec4899'}}>🌀 cuộn lưỡi</strong> và âm <strong style={{color:'#ec4899'}}>⚠️ lưỡi dẹt</strong> là khó nhất — không tồn tại trong tiếng Việt. Nhấn vào ví dụ để nghe.
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
            {INITIALS_DATA.map(group => (
              <div key={group.group} style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',border:'1px solid var(--c-border)'}}>
                <h3 style={{fontWeight:800,color:group.color,marginBottom:'1rem',fontSize:'.9rem'}}>
                  {group.group}
                </h3>
                <div style={{display:'flex',gap:.75+'rem',flexWrap:'wrap'}}>
                  {group.items.map(item => (
                    <div key={item.init} style={{
                      flex:'1 1 220px',background:'var(--c-bg)',borderRadius:12,padding:'1rem',
                      border:`2px solid ${group.color}30`,
                    }}>
                      {/* Initial + Example */}
                      <div style={{display:'flex',alignItems:'center',gap:.75+'rem',marginBottom:'.75rem'}}>
                        <div style={{
                          width:44,height:44,borderRadius:10,
                          background:`linear-gradient(135deg,${group.color},${group.color}99)`,
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:'1.2rem',fontWeight:900,color:'#fff',fontFamily:'monospace',
                          flexShrink:0,
                        }}>{item.init}</div>
                        <button onClick={() => {play(item.ex_hanzi); setModal({hanzi:item.ex_hanzi,pinyin:item.ex_pinyin,vi:item.ex_vi});}}
                          style={{background:'none',border:'none',cursor:'pointer',textAlign:'left'}}>
                          <div style={{display:'flex',gap:'.4rem',alignItems:'baseline'}}>
                            <span style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'"Noto Serif CJK SC",serif',color:group.color,lineHeight:1}}>
                              {item.ex_hanzi}
                            </span>
                            <span style={{fontSize:'.85rem',color:group.color+'cc',fontStyle:'italic'}}>{item.ex_pinyin}</span>
                          </div>
                          <div style={{fontSize:'.72rem',color:'var(--c-text-muted)'}}>{item.ex_vi}</div>
                        </button>
                        <button onClick={() => play(item.ex_hanzi)}
                          style={{marginLeft:'auto',background:group.color+'15',border:`1px solid ${group.color}40`,
                            borderRadius:7,padding:'.3rem .5rem',cursor:'pointer',color:group.color,fontSize:'.75rem',flexShrink:0}}>
                          🔊
                        </button>
                      </div>

                      {/* Description */}
                      <div style={{fontSize:'.77rem',color:'var(--c-text)',fontWeight:600,marginBottom:'.3rem'}}>{item.desc}</div>

                      {/* Mouth position */}
                      <div style={{
                        background:group.color+'10',borderRadius:8,padding:'.45rem .6rem',
                        fontSize:'.7rem',color:'var(--c-text-muted)',lineHeight:1.6,whiteSpace:'pre-line',
                      }}>
                        {item.mouth}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>)}
      </div>

      {/* Pronunciation Detail Modal */}
      {modal && (
        <PronunciationModal
          hanzi={modal.hanzi} pinyin={modal.pinyin} meaning_vi={modal.vi}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

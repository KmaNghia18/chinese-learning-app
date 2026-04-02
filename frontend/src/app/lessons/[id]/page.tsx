'use client';
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSpeech } from "@/lib/useSpeech";
import Link from "next/link";

// Ghi chú ngữ pháp theo cấp HSK
const GRAMMAR_NOTES: Record<string, { title: string; pattern: string; example: string; vi: string }[]> = {
  HSK1: [
    { title: 'Câu khẳng định cơ bản', pattern: '主语 + 是 + 名词', example: '我是学生。', vi: 'Tôi là học sinh.' },
    { title: 'Câu phủ định với 不', pattern: '主语 + 不 + 动词/形容词', example: '我不是老师。', vi: 'Tôi không phải giáo viên.' },
    { title: 'Câu hỏi với 吗', pattern: '句子 + 吗？', example: '你好吗？', vi: 'Bạn có khỏe không?' },
    { title: 'Có/không có — 有/没有', pattern: '主语 + 有/没有 + 名词', example: '我有一本书。', vi: 'Tôi có một quyển sách.' },
  ],
  HSK2: [
    { title: 'So sánh với 比', pattern: 'A + 比 + B + 形容词', example: '我比他高。', vi: 'Tôi cao hơn anh ấy.' },
    { title: 'Đang làm — 在', pattern: '主语 + 在 + 动词', example: '他在看书。', vi: 'Anh ấy đang đọc sách.' },
    { title: 'Đã làm — 了', pattern: '主语 + 动词 + 了', example: '我吃了。', vi: 'Tôi đã ăn rồi.' },
    { title: 'Muốn — 想', pattern: '主语 + 想 + 动词', example: '我想去中国。', vi: 'Tôi muốn đi Trung Quốc.' },
  ],
  HSK3: [
    { title: 'Vừa… vừa — 一边…一边', pattern: '一边 + 动词1 + 一边 + 动词2', example: '他一边唱歌一边跳舞。', vi: 'Anh ấy vừa hát vừa nhảy.' },
    { title: 'Mỗi khi — 每次', pattern: '每次 + 条件, 主语 + 结果', example: '每次下雨，我就待在家。', vi: 'Mỗi khi trời mưa, tôi ở nhà.' },
    { title: 'Trước khi — 以前', pattern: '动词 + 以前', example: '吃饭以前要洗手。', vi: 'Trước khi ăn phải rửa tay.' },
    { title: 'Sau khi — 以后', pattern: '动词 + 以后', example: '吃饭以后去散步。', vi: 'Sau khi ăn đi dạo.' },
  ],
  HSK4: [
    { title: 'Ngày càng — 越来越', pattern: '主语 + 越来越 + 形容词', example: '她的汉语越来越好。', vi: 'Tiếng Trung của cô ấy ngày càng tốt.' },
    { title: 'Dù… nhưng — 虽然…但是', pattern: '虽然 + 句1 + 但是 + 句2', example: '虽然很累，但是很开心。', vi: 'Dù mệt nhưng rất vui.' },
    { title: 'Chỉ cần — 只要', pattern: '只要 + 条件, 就 + 结果', example: '只要努力，就能成功。', vi: 'Chỉ cần cố gắng, sẽ thành công.' },
    { title: 'Không chỉ… mà còn — 不但…而且', pattern: '不但 + 句1 + 而且 + 句2', example: '他不但聪明而且努力。', vi: 'Anh ấy không chỉ thông minh mà còn chăm chỉ.' },
  ],
};

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { speak } = useSpeech();
  const [lesson, setLesson] = useState<any>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [showGrammar, setShowGrammar] = useState(true);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => { if (id) api.getLesson(Number(id)).then(r => setLesson(r.data)).catch(() => {}); }, [id]);

  const markDone = async () => {
    await api.updateLessonProgress(Number(id), "completed").catch(() => {});
    setDone(true);
  };

  if (loading || !lesson) return <div className="spinner" />;

  const grammarNotes = GRAMMAR_NOTES[lesson.hsk_level] || [];

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <Link href="/lessons" style={{color:"var(--c-text-muted)",fontSize:"0.9rem"}}>← Quay lại danh sách</Link>
      </div>

      <div className="page-header">
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <span className="badge badge-gold">{lesson.hsk_level}</span>
          <span style={{color:"var(--c-text-dim)",fontSize:"0.85rem"}}>Bài {lesson.order_index}</span>
        </div>
        <h1 className="page-title">{lesson.title}</h1>
        <div style={{fontFamily:"var(--font-zh)",fontSize:"1.2rem",color:"var(--c-text-muted)",marginTop:4}}>{lesson.title_zh}</div>
        {lesson.description && <p style={{color:"var(--c-text-muted)",marginTop:8}}>{lesson.description}</p>}
      </div>

      {/* Grammar Notes */}
      {grammarNotes.length > 0 && (
        <div style={{background:'var(--c-surface)',borderRadius:16,padding:'1.25rem',
          marginBottom:24,border:'1px solid var(--c-border)'}}>
          <button
            onClick={() => setShowGrammar(g => !g)}
            style={{display:'flex',justifyContent:'space-between',alignItems:'center',
              width:'100%',background:'none',border:'none',cursor:'pointer',padding:0}}>
            <h2 style={{fontWeight:800,fontSize:'1rem',color:'var(--c-text)',display:'flex',alignItems:'center',gap:'.5rem'}}>
              📝 Ghi chú ngữ pháp
              <span style={{fontSize:'.75rem',background:'#6366f120',color:'#6366f1',
                padding:'.15rem .5rem',borderRadius:6,fontWeight:700}}>
                {grammarNotes.length} mẫu câu
              </span>
            </h2>
            <span style={{color:'var(--c-text-muted)',fontSize:'1.1rem'}}>{showGrammar ? '▲' : '▼'}</span>
          </button>

          {showGrammar && (
            <div style={{marginTop:'1rem',display:'flex',flexDirection:'column',gap:'.75rem'}}>
              {grammarNotes.map((note, i) => (
                <div key={i} style={{background:'var(--c-bg)',borderRadius:12,padding:'.9rem 1.1rem',
                  borderLeft:'3px solid #6366f1'}}>
                  <div style={{fontWeight:800,color:'var(--c-text)',fontSize:'.88rem',marginBottom:'.3rem'}}>
                    {i+1}. {note.title}
                  </div>
                  <div style={{fontFamily:'monospace',color:'#6366f1',fontSize:'.82rem',
                    background:'#6366f110',padding:'.25rem .6rem',borderRadius:6,
                    display:'inline-block',marginBottom:'.4rem'}}>
                    {note.pattern}
                  </div>
                  <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'.35rem'}}>
                    <span style={{fontSize:'.9rem',fontWeight:700,color:'var(--c-text)',
                      fontFamily:'"Noto Serif CJK SC",serif'}}>
                      {note.example}
                    </span>
                    <span style={{fontSize:'.82rem',color:'var(--c-text-muted)'}}>→ {note.vi}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{fontWeight:700}}>Từ vựng trong bài ({lesson.vocabulary?.length || 0} từ)</h2>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => lesson.vocabulary?.forEach((v: any, i: number) => setTimeout(() => speak(v.hanzi), i * 1500))}
        >▶ Nghe tất cả</button>
      </div>

      <div className="grid-3" style={{marginBottom:32}}>
        {lesson.vocabulary?.map((v: any) => (
          <div key={v.id} className="card" style={{cursor:"pointer",textAlign:"center",position:"relative"}} onClick={() => setFlipped(flipped === v.id ? null : v.id)}>
            <button
              onClick={e => { e.stopPropagation(); speak(v.hanzi); }}
              style={{
                position:"absolute",top:12,right:12,background:"var(--c-primary-soft)",
                border:"none",borderRadius:"var(--r-md)",padding:"4px 10px",
                cursor:"pointer",fontSize:"0.8rem",color:"var(--c-primary)"
              }}
            >🔊</button>
            <div className="zh" style={{fontSize:"2.5rem",fontWeight:700,marginBottom:4}}>{v.hanzi}</div>
            <div style={{color:"var(--c-primary)",marginBottom:8,fontStyle:"italic",fontSize:"1rem"}}>{v.pinyin}</div>
            {flipped === v.id ? (
              <div className="fade-in">
                <div style={{fontWeight:600,marginBottom:4,fontSize:"1rem"}}>{v.meaning_vi}</div>
                {v.meaning_en && <div style={{color:"var(--c-text-muted)",fontSize:"0.82rem",marginBottom:8}}>{v.meaning_en}</div>}
                {v.word_type && <span className="badge badge-blue">{v.word_type}</span>}
                {v.example_sentence_zh && (
                  <div style={{fontSize:"0.8rem",color:"var(--c-text-muted)",marginTop:10,borderTop:"1px solid var(--c-border)",paddingTop:8}}>
                    <div className="zh">{v.example_sentence_zh}</div>
                    <div style={{marginTop:3}}>{v.example_sentence_vi}</div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{color:"var(--c-text-dim)",fontSize:"0.82rem"}}>Nhấn để xem nghĩa</div>
            )}
          </div>
        ))}
      </div>

      <div style={{textAlign:"center"}}>
        {done
          ? <div style={{color:"var(--c-green)",fontWeight:700,fontSize:"1.1rem"}}>✅ Đã hoàn thành bài học!</div>
          : <button className="btn btn-primary btn-lg" onClick={markDone}>Đánh dấu hoàn thành ✓</button>
        }
      </div>
    </div>
  );
}

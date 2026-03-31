/**
 * Phiên âm tiếng Việt — chuyển pinyin sang cách đọc gần giống tiếng Việt
 * Dựa theo chuẩn của các sách học tiếng Trung dành cho người Việt.
 *
 * Ánh xạ thanh điệu:
 *   1声 (bình, 55)  → KHÔNG DẤU   — âm bằng phẳng, cao
 *   2声 (sắc, 35)   → dấu SẮC (') — âm lên
 *   3声 (hỏi, 214)  → dấu HỎI (?) — xuống rồi lên
 *   4声 (nặng, 51)  → dấu HUYỀN ` — âm xuống mạnh (người Việt nghe giống huyền)
 *   轻声 (neutral)   → KHÔNG DẤU
 */

/* ─────────────────────────────────────────────
   1.  Strip tone marks & detect tone number
   ───────────────────────────────────────────── */
const STRIP_MAP: [string, string, number][] = [
  ['ā','a',1],['á','a',2],['ǎ','a',3],['à','a',4],
  ['ē','e',1],['é','e',2],['ě','e',3],['è','e',4],
  ['ī','i',1],['í','i',2],['ǐ','i',3],['ì','i',4],
  ['ō','o',1],['ó','o',2],['ǒ','o',3],['ò','o',4],
  ['ū','u',1],['ú','u',2],['ǔ','u',3],['ù','u',4],
  ['ǖ','u',1],['ǘ','u',2],['ǚ','u',3],['ǜ','u',4],
];

function stripSyllable(syl: string): [string, number] {
  let tone = 5;
  let s = syl.toLowerCase();
  for (const [m, r, t] of STRIP_MAP) {
    if (s.includes(m)) { s = s.replace(m, r); tone = t; break; }
  }
  return [s.replace(/ü/g, 'u').replace(/v/g, 'u'), tone];
}

/* ─────────────────────────────────────────────
   2.  Apply Vietnamese tone mark
   ───────────────────────────────────────────── */
const VN_TONE: Record<string, Record<number, string>> = {
  'a': { 1:'a',  2:'á', 3:'ả', 4:'à', 5:'a'  },
  'ă': { 1:'ă',  2:'ắ', 3:'ẳ', 4:'ằ', 5:'ă'  },
  'â': { 1:'â',  2:'ấ', 3:'ẩ', 4:'ầ', 5:'â'  },
  'e': { 1:'e',  2:'é', 3:'ẻ', 4:'è', 5:'e'  },
  'ê': { 1:'ê',  2:'ế', 3:'ể', 4:'ề', 5:'ê'  },
  'i': { 1:'i',  2:'í', 3:'ỉ', 4:'ì', 5:'i'  },
  'o': { 1:'o',  2:'ó', 3:'ỏ', 4:'ò', 5:'o'  },
  'ô': { 1:'ô',  2:'ố', 3:'ổ', 4:'ồ', 5:'ô'  },
  'ơ': { 1:'ơ',  2:'ớ', 3:'ở', 4:'ờ', 5:'ơ'  },
  'u': { 1:'u',  2:'ú', 3:'ủ', 4:'ù', 5:'u'  },
  'ư': { 1:'ư',  2:'ứ', 3:'ử', 4:'ừ', 5:'ư'  },
  'y': { 1:'y',  2:'ý', 3:'ỷ', 4:'ỳ', 5:'y'  },
};

// Tìm nguyên âm chính để đặt dấu (ưu tiên từ dài nhất)
const VOWEL_CLUSTERS = [
  'uây','uâ','iêu','iên','iê','uôn','uôi','uô',
  'ươn','ươi','ươ','uyê','uyên',
  'ây','ơi','ôi','âu','ui','oa','oe',
  'â','ê','ô','ơ','ư',
  'a','e','i','o','u','y',
];

function applyVnTone(vn: string, tone: number): string {
  if (tone === 5) return vn;
  for (const cluster of VOWEL_CLUSTERS) {
    const idx = vn.indexOf(cluster);
    if (idx === -1) continue;
    // Đặt dấu vào ký tự cuối của cluster
    const lastCh = cluster[cluster.length - 1];
    const toned = VN_TONE[lastCh]?.[tone];
    if (!toned) continue;
    const before = vn.slice(0, idx + cluster.length - 1);
    const after  = vn.slice(idx + cluster.length);
    return before + toned + after;
  }
  return vn; // không tìm thấy nguyên âm → trả nguyên
}

/* ─────────────────────────────────────────────
   3.  Bảng tra cứu đầy đủ (OVERRIDE)
       Ghi theo dạng không dấu; applyVnTone sẽ thêm dấu sau.
       
       Nguyên tắc ánh xạ phụ âm đầu (theo sách VN):
         b  → b      p  → ph     m  → m      f  → ph
         d  → đ      t  → th     n  → n      l  → l
         g  → g/c    k  → kh     h  → h
         j  → ch     q  → ch     x  → x
         zh → tr     ch → tr     sh → x      r  → r
         z  → d      c  → x      s  → x
   ───────────────────────────────────────────── */
const OVERRIDE: Record<string, string> = {
  /* ── Retroflex + i (chứa nguyên âm để dấu hoạt động) ── */
  'zhi':'trư', 'chi':'trư', 'shi':'xư',  'ri' :'rư',
  'zi' :'dư',  'ci' :'xư',  'si' :'xư',

  /* ── Syllable bắt đầu bằng y ── */
  'yi'  :'i',   'ya'  :'ia',  'yan' :'iên',  'yang':'iêng',
  'yao' :'iêu', 'ye'  :'iê',  'yin' :'in',   'ying':'inh',
  'yo'  :'iô',  'yong':'iung','you'  :'iêu',  'yu'  :'y',
  'yue' :'yuê', 'yun' :'yun', 'yuan':'yuân',

  /* ── Syllable bắt đầu bằng w ── */
  'wu'  :'u',   'wa'  :'ua',  'wai' :'uai',  'wan' :'uân',
  'wang':'uâng','wei' :'uây', 'wen' :'uân',  'weng':'uâng',
  'wo'  :'uô',

  /* ── er ── */
  'er':'ơ',

  /* ── Một số âm tiết đặc biệt của j/q/x + ü ── */
  'ju'  :'chu',  'qu'  :'chu',  'xu'  :'xu',
  'jun' :'chun', 'qun' :'chun', 'xun' :'xun',
  'jue' :'chuê', 'que' :'chuê', 'xue' :'xuê',
  'juan':'chuân','quan':'chuân','xuan':'xuân',

  /* ── Một số âm tiết g/k/h + uo (g→c trước u theo sách VN) ── */
  'guo':'cuô', 'kuo':'khuô', 'huo':'huô',
  'gui':'cuây','kui':'khuây','hui':'huây',
  'gua':'cua', 'kua':'khua', 'hua':'hua',
  'guai':'cuai','kuai':'khuai','huai':'huai',
  'guan':'cuân','kuan':'khuân','huan':'huân',
  'guang':'cuâng','kuang':'khuâng','huang':'huâng',
};

/* ─────────────────────────────────────────────
   4.  Ánh xạ phụ âm đầu → tiếng Việt
   ───────────────────────────────────────────── */
const INIT_MAP: [string, string][] = [
  // Kiểm tra 2 ký tự TRƯỚC 1 ký tự
  ['zh','tr'], ['ch','tr'], ['sh','x'],
  ['r','r'],
  ['z','d'],   ['c','x'],   ['s','x'],
  ['j','ch'],  ['q','ch'],  ['x','x'],
  ['b','b'],   ['p','ph'],  ['m','m'],  ['f','ph'],
  ['d','đ'],   ['t','th'],  ['n','n'],  ['l','l'],
  ['g','g'],   ['k','kh'],  ['h','h'],
  ['w',''],    ['y',''],
];

function getInitialVn(syl: string): [string, string] {
  for (const [init, vn] of INIT_MAP) {
    if (syl.startsWith(init)) return [init, vn];
  }
  return ['', ''];
}

/* ─────────────────────────────────────────────
   5.  Ánh xạ âm cuối → tiếng Việt
   ───────────────────────────────────────────── */
const FINAL_MAP: [string, string][] = [
  // Dài → ngắn (ưu tiên khớp dài nhất)
  ['uang','uâng'], ['iang','iêng'], ['iong','iung'], ['ueng','uâng'],
  ['ang','ang'],   ['eng','âng'],   ['ing','inh'],   ['ong','ung'],
  ['ian','iên'],   ['uan','uân'],   ['van','uân'],
  ['an','an'],     ['en','ân'],     ['in','in'],
  ['un','uân'],    ['vn','uân'],
  ['iao','iêu'],   ['uai','uai'],
  ['ia','ia'],     ['ie','iê'],     ['ve','uê'],     ['uo','uô'],  ['ua','ua'],
  ['ai','ai'],     ['ei','ây'],     ['ui','uây'],
  ['ao','ao'],     ['ou','âu'],     ['iu','iêu'],
  ['er','ơ'],
  ['a','a'],       ['o','ô'],       ['e','ơ'],
  ['i','i'],       ['u','u'],       ['v','y'],
];

function getFinalVn(fin: string): string {
  const f = fin.replace(/ü/g, 'v');
  for (const [k, vn] of FINAL_MAP) {
    if (f === k || f.startsWith(k)) return vn;
  }
  return fin;
}

/* ─────────────────────────────────────────────
   6.  Hàm chính
   ───────────────────────────────────────────── */
export function pinyinToVietnamese(pinyin: string): string {
  return pinyin.trim().split(/\s+/).map(convertSyllable).join(' ');
}

function convertSyllable(rawSyl: string): string {
  const [base, tone] = stripSyllable(rawSyl);

  // Tra bảng OVERRIDE trước
  if (OVERRIDE[base]) {
    return applyVnTone(OVERRIDE[base], tone);
  }

  // Lấy phụ âm đầu
  const [init, vnInit] = getInitialVn(base);
  let fin = base.slice(init.length);

  // j/q/x + u (ü) → bỏ glide u
  if (['j','q','x'].includes(init) && fin.startsWith('u') && fin !== 'u') {
    fin = fin.slice(1); // bỏ ü, lấy phần còn lại
  }

  const vnFin = getFinalVn(fin);
  return applyVnTone(vnInit + vnFin, tone);
}

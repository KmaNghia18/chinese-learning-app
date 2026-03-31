/**
 * Hook phát âm tiếng Trung
 * - Ưu tiên 1: Google Translate TTS (qua proxy backend nếu có)
 * - Ưu tiên 2: Direct Google TTS audio element (không cần backend)
 * - Fallback: Web Speech API
 */

let currentAudio: HTMLAudioElement | null = null;
const audioCache = new Map<string, string>(); // text -> objectURL

function buildGoogleTtsUrl(text: string, lang = 'zh-CN'): string {
  // Dùng gtts client=gtx (không cần API key, miễn phí)
  return `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=gtx&ttsspeed=0.85`;
}

function playAudio(url: string, onError?: () => void) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const audio = new Audio(url);
  audio.volume = 1;
  currentAudio = audio;
  audio.play().catch(() => onError?.());
}

export function useSpeech() {
  const speak = (text: string, lang = 'zh-CN') => {
    if (typeof window === 'undefined' || !text.trim()) return;

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const backendUrl = `${API_BASE}/tts?text=${encodeURIComponent(text)}&lang=${lang}`;
    const googleUrl = buildGoogleTtsUrl(text, lang);

    // Thử backend proxy trước (nếu backend đang chạy)
    fetch(backendUrl, { signal: AbortSignal.timeout(2000) })
      .then(res => {
        if (!res.ok) throw new Error('backend tts failed');
        return res.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        playAudio(url);
      })
      .catch(() => {
        // Fallback: dùng trực tiếp Google Translate TTS URL
        // Audio elements có thể load cross-origin mà không bị CORS block
        playAudio(googleUrl, () => {
          // Fallback cuối: Web Speech API
          webSpeechFallback(text, lang);
        });
      });
  };

  const preload = (text: string, lang = 'zh-CN') => {
    if (typeof window === 'undefined' || !text.trim()) return;
    // Preload audio vào cache
    const url = buildGoogleTtsUrl(text, lang);
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
  };

  const stop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel();
    }
  };

  return { speak, preload, stop };
}

function webSpeechFallback(text: string, lang: string) {
  if (typeof window === 'undefined') return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  // Warmup trick: giải quyết lag lần đầu trên Windows
  setTimeout(() => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.82;
    utter.pitch = 1;
    // Ưu tiên giọng Google nếu có
    const voices = synth.getVoices();
    const googleVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('zh'));
    const anyZh = voices.find(v => v.lang.startsWith('zh'));
    if (googleVoice) utter.voice = googleVoice;
    else if (anyZh) utter.voice = anyZh;
    synth.speak(utter);
  }, 50);
}

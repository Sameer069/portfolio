// Speech synthesis utility
export class SpeechHandler {
  private synthesis: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis;
    }
  }

  // Initialize speech with text
  init(text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice;
  }) {
    if (!this.synthesis) return;

    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    if (options) {
      if (options.rate) this.utterance.rate = options.rate;
      if (options.pitch) this.utterance.pitch = options.pitch;
      if (options.volume) this.utterance.volume = options.volume;
      if (options.voice) this.utterance.voice = options.voice;
    }
  }

  // Get available voices
  getVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  // Speak the text
  speak(
    onStart?: () => void,
    onEnd?: () => void,
    onBoundary?: (event: SpeechSynthesisEvent) => void
  ) {
    if (!this.synthesis || !this.utterance) return;

    // Event listeners
    if (onStart) {
      this.utterance.onstart = onStart;
    }
    
    if (onEnd) {
      this.utterance.onend = onEnd;
      this.utterance.onerror = () => {
        if (onEnd) onEnd();
      };
    }

    if (onBoundary) {
      this.utterance.onboundary = onBoundary;
    }

    try {
      this.synthesis.cancel();
      this.synthesis.speak(this.utterance);
    } catch (err) {
      if (onEnd) onEnd();
    }
  }

  // Stop speaking
  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  // Pause speaking
  pause() {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  // Resume speaking
  resume() {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  // Check if speaking
  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }

  // Initialize audio context for amplitude analysis
  initAudioAnalysis() {
    if (typeof window === "undefined") return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
    } catch (error) {
      console.warn("Audio analysis not available:", error);
    }
  }

  // Get current amplitude (0-1) for mouth animation
  getAmplitude(): number {
    if (!this.analyser || !this.dataArray) return 0;

    this.analyser.getByteFrequencyData(this.dataArray as Uint8Array<ArrayBuffer>);
    
    // Calculate average amplitude
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    const average = sum / this.dataArray.length;
    
    // Normalize to 0-1
    return average / 255;
  }

  // Cleanup
  dispose() {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Simple typewriter effect utility
export class TypewriterEffect {
  private text: string = "";
  private currentIndex: number = 0;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(text: string) {
    this.text = text;
  }

  // Start typing animation
  start(
    callback: (currentText: string, isDone: boolean) => void,
    speed: number = 50
  ) {
    this.currentIndex = 0;
    
    this.intervalId = setInterval(() => {
      if (this.currentIndex <= this.text.length) {
        const currentText = this.text.substring(0, this.currentIndex);
        const isDone = this.currentIndex === this.text.length;
        callback(currentText, isDone);
        this.currentIndex++;
        
        if (isDone && this.intervalId) {
          clearInterval(this.intervalId);
        }
      }
    }, speed);
  }

  // Stop typing animation
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Reset
  reset() {
    this.stop();
    this.currentIndex = 0;
  }
}

// Utility to get a preferred voice
export const getPreferredVoice = (
  voices: SpeechSynthesisVoice[],
  preferredLang: string = "en-US"
): SpeechSynthesisVoice | undefined => {
  // Try to find Google voice first (usually higher quality)
  const googleVoice = voices.find(
    (voice) => voice.lang === preferredLang && voice.name.includes("Google")
  );
  if (googleVoice) return googleVoice;

  // Fall back to any voice with preferred language
  const langVoice = voices.find((voice) => voice.lang === preferredLang);
  if (langVoice) return langVoice;

  // Return first available voice
  return voices[0];
};

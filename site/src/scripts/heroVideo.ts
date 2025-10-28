/**
 * iPhone Safari-safe autoplay utility for hero/background videos
 * Handles autoplay blocking, Low Power Mode, and other iOS restrictions
 */

export function initHeroVideo(selector: string = '#heroVid'): void {
  const v = document.querySelector<HTMLVideoElement>(selector);
  if (!v) {
    console.warn(`Hero video not found with selector: ${selector}`);
    return;
  }

  // Ensure required attributes for iOS autoplay
  v.muted = true;
  (v as any).playsInline = true; // iOS camelCase property
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');

  let tried = false;

  const tryPlay = async (): Promise<void> => {
    if (tried) return;
    tried = true;

    try {
      await v.play();
      v.classList.add('is-ready');
      console.log(`Hero video ${selector} started playing successfully`);
    } catch (error) {
      console.log(`Hero video ${selector} autoplay blocked, waiting for user gesture`);
      
      // Attach one-time user gesture handlers
      const once = () => {
        v.play()
          .then(() => {
            v.classList.add('is-ready');
            console.log(`Hero video ${selector} started playing after user interaction`);
          })
          .catch((err) => {
            console.warn(`Hero video ${selector} play failed after interaction:`, err);
          });
      };

      // Listen for both touch and click events for maximum compatibility
      window.addEventListener('touchend', once, { once: true, passive: true });
      window.addEventListener('click', once, { once: true, passive: true });
    }
  };

  // Primary: Listen for canplay event
  v.addEventListener('canplay', tryPlay, { once: true });

  // Fallback: Listen for loadedmetadata
  v.addEventListener('loadedmetadata', () => {
    setTimeout(tryPlay, 150);
  }, { once: true });

  // Retry when page becomes visible (e.g., returning from background)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !tried) {
      tryPlay();
    }
  });

  // Final fallback timeout
  setTimeout(() => {
    if (!tried) {
      tryPlay();
    }
  }, 800);
}


import confetti from 'canvas-confetti';

/**
 * Fires a golden star burst celebration
 */
export function fireStarCelebration() {
  try {
    // Left burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7, x: 0.3 },
      colors: ['#F59E0B', '#FBBF24', '#FDE047', '#C084FC', '#FFFFFF'],
      shapes: ['star', 'circle'],
      scalar: 1.2
    });

    // Right burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7, x: 0.7 },
      colors: ['#F59E0B', '#FBBF24', '#FDE047', '#C084FC', '#FFFFFF'],
      shapes: ['star', 'circle'],
      scalar: 1.2
    });
  } catch (e) {
    console.log('Confetti trigger skipped', e);
  }
}

/**
 * Super celebratory fireworks for milestones
 */
export function fireMilestoneCelebration() {
  try {
    const end = Date.now() + 1500;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F59E0B', '#EAB308', '#A855F7', '#38BDF8']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F59E0B', '#EAB308', '#A855F7', '#38BDF8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } catch (e) {
    console.log('Milestone celebration skipped', e);
  }
}

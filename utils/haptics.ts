/**
 * Triggers a haptic feedback vibration on supported devices.
 * @param pattern A number or an array of numbers representing the vibration pattern in milliseconds.
 */
export const triggerHapticFeedback = (pattern: number | number[] = 10): void => {
  if (window.navigator && 'vibrate' in window.navigator) {
    try {
      // A short, subtle vibration for a tap-like sensation.
      window.navigator.vibrate(pattern);
    } catch (e) {
      // Vibration may fail on some devices/browsers for various reasons.
      // We can safely ignore these errors.
      console.warn("Haptic feedback failed.", e);
    }
  }
};

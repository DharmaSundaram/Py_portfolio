import { REAL_NOTEBOOK_ACHIEVEMENTS, DHARMA_PROFILE, NOTEBOOK_PYTHON_TOPICS } from './realNotebookData';

const STORAGE_KEYS = {
  ACHIEVEMENTS: 'py_portfolio_real_achievements',
  PROFILE: 'py_portfolio_dharma_profile',
  TOPICS: 'py_portfolio_notebook_topics',
  EVIDENCE: 'py_portfolio_evidence_photos'
};

/**
 * Safe LocalStorage getter with JSON parsing
 */
function safeGetItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[Storage] Failed to read or parse key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safe LocalStorage setter with QuotaExceededError handling
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return { success: true };
  } catch (error) {
    console.error(`[Storage] Failed to write key "${key}" to localStorage:`, error);
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      return {
        success: false,
        error: 'Browser storage quota exceeded. Try deleting large uploaded images or export your data.'
      };
    }
    return { success: false, error: error.message || 'Storage error' };
  }
}

/**
 * Achievements Storage Management (Initializes with real notebook entries)
 */
export function getStoredAchievements() {
  const saved = safeGetItem(STORAGE_KEYS.ACHIEVEMENTS, null);
  if (saved !== null && Array.isArray(saved) && saved.length > 0) {
    // Automatically migrate any stored entries from Faculty / Faculty JSh to Sharmila Banu Mam
    let hasChanged = false;
    const migrated = saved.map(item => {
      let updated = { ...item };
      if (updated.facultyName === 'Faculty JSh' || updated.facultyName === 'Course Faculty' || !updated.facultyName) {
        updated.facultyName = 'Sharmila Banu Mam';
        hasChanged = true;
      }
      if (updated.title && updated.title.includes('Faculty Commendation')) {
        updated.title = updated.title.replace('Faculty Commendation', 'Sharmila Banu Mam');
        hasChanged = true;
      }
      if (updated.facultyReason && (updated.facultyReason.includes('faculty') || updated.facultyReason.includes('Faculty'))) {
        updated.facultyReason = updated.facultyReason
          .replace(/by faculty/gi, 'by Sharmila Banu Mam')
          .replace(/Special faculty commendation/gi, 'Special commendation from Sharmila Banu Mam');
        hasChanged = true;
      }
      return updated;
    });

    // Ensure all standard records (e.g. nb-quiz-01 First Quiz Event, nb-story-01 Storytelling Event) are present
    REAL_NOTEBOOK_ACHIEVEMENTS.forEach(defaultItem => {
      const exists = migrated.some(m => m.id === defaultItem.id);
      if (!exists) {
        migrated.push(defaultItem);
        hasChanged = true;
      }
    });

    if (hasChanged) {
      migrated.sort((a, b) => new Date(a.date) - new Date(b.date));
      safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, migrated);
    }
    return migrated;
  }
  // Initialize with the real notebook achievements
  safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, REAL_NOTEBOOK_ACHIEVEMENTS);
  return REAL_NOTEBOOK_ACHIEVEMENTS;
}

export function saveAchievements(achievements) {
  return safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, achievements);
}

export function resetToNotebookDefaults() {
  safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, REAL_NOTEBOOK_ACHIEVEMENTS);
  safeSetItem(STORAGE_KEYS.PROFILE, DHARMA_PROFILE);
  safeSetItem(STORAGE_KEYS.TOPICS, NOTEBOOK_PYTHON_TOPICS);
  return {
    achievements: REAL_NOTEBOOK_ACHIEVEMENTS,
    profile: DHARMA_PROFILE,
    topics: NOTEBOOK_PYTHON_TOPICS
  };
}

/**
 * Profile Storage Management
 */
export function getStoredProfile() {
  const saved = safeGetItem(STORAGE_KEYS.PROFILE, null);
  if (saved && typeof saved === 'object') {
    const updated = { 
      ...DHARMA_PROFILE, 
      ...saved,
      avatarUrl: saved.avatarUrl || DHARMA_PROFILE.avatarUrl || '/evidence/profile_picture.jpg'
    };
    if (!saved.avatarUrl) {
      safeSetItem(STORAGE_KEYS.PROFILE, updated);
    }
    return updated;
  }
  safeSetItem(STORAGE_KEYS.PROFILE, DHARMA_PROFILE);
  return DHARMA_PROFILE;
}

export function saveProfile(profile) {
  return safeSetItem(STORAGE_KEYS.PROFILE, profile);
}

/**
 * Learning Topics Storage Management
 */
export function getStoredTopics() {
  const saved = safeGetItem(STORAGE_KEYS.TOPICS, null);
  if (saved && Array.isArray(saved) && saved.length > 0) {
    return saved;
  }
  return NOTEBOOK_PYTHON_TOPICS;
}

export function saveTopics(topics) {
  return safeSetItem(STORAGE_KEYS.TOPICS, topics);
}

/**
 * Clear All Local Storage
 */
export function resetAllStorage() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TOPICS);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

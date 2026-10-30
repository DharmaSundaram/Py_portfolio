/**
 * Export and Import Utilities
 */

/**
 * Trigger browser file download
 */
function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export Full Portfolio Data as JSON
 */
export function exportToJSON(achievements, profile, topics) {
  const exportPayload = {
    appName: 'Python Course Star Achievement Portfolio',
    exportedAt: new Date().toISOString(),
    version: '1.0',
    profile: profile || {},
    achievements: achievements || [],
    topics: topics || [],
    statistics: {
      totalAchievements: achievements ? achievements.length : 0,
      totalStars: achievements ? achievements.reduce((sum, item) => sum + (Number(item.stars) || 0), 0) : 0
    }
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(jsonString, `python-achievements-${dateStr}.json`, 'application/json');
}

/**
 * Export Achievements as CSV
 */
export function exportToCSV(achievements) {
  if (!achievements || achievements.length === 0) {
    throw new Error('No achievement records available to export.');
  }

  const headers = [
    'ID',
    'Title',
    'Date Received',
    'Stars Earned',
    'Faculty Reason',
    'Faculty Name',
    'Category',
    'Related Python Task',
    'Python Concepts',
    'Skills Demonstrated',
    'Learning Reflection'
  ];

  const escapeCSV = (field) => {
    if (field === null || field === undefined) return '""';
    const stringField = Array.isArray(field) ? field.join('; ') : String(field);
    // Double quotes escape inside CSV
    const escaped = stringField.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = achievements.map(item => [
    escapeCSV(item.id),
    escapeCSV(item.title),
    escapeCSV(item.date || 'Unspecified'),
    escapeCSV(item.stars),
    escapeCSV(item.facultyReason),
    escapeCSV(item.facultyName || ''),
    escapeCSV(item.category || 'Other'),
    escapeCSV(item.relatedTask || ''),
    escapeCSV(item.pythonConcepts || []),
    escapeCSV(item.skillsDemonstrated || ''),
    escapeCSV(item.learningReflection || '')
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(csvContent, `python-achievements-${dateStr}.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Validate imported JSON payload
 */
export function validateImportData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'File content must be a valid JSON object.' };
    }

    let importedAchievements = [];

    // Support both full portfolio export format or direct array of achievements
    if (Array.isArray(parsed)) {
      importedAchievements = parsed;
    } else if (Array.isArray(parsed.achievements)) {
      importedAchievements = parsed.achievements;
    } else {
      return { valid: false, error: 'JSON does not contain a recognizable list of achievements.' };
    }

    // Validate entries
    const validatedAchievements = [];
    for (let i = 0; i < importedAchievements.length; i++) {
      const item = importedAchievements[i];
      if (!item.title || typeof item.title !== 'string') {
        return { valid: false, error: `Achievement at index ${i} is missing a required title.` };
      }
      const stars = Number(item.stars);
      if (isNaN(stars) || stars <= 0) {
        return { valid: false, error: `Achievement "${item.title}" has an invalid star count (${item.stars}). Must be a positive integer.` };
      }
      if (!item.facultyReason && !item.reason) {
        return { valid: false, error: `Achievement "${item.title}" is missing the faculty reason.` };
      }

      validatedAchievements.push({
        id: item.id || `imported-${Date.now()}-${i}`,
        title: item.title,
        date: item.date || '',
        stars: Math.floor(stars),
        facultyReason: item.facultyReason || item.reason || '',
        facultyName: item.facultyName || '',
        facultyFeedback: item.facultyFeedback || '',
        relatedTask: item.relatedTask || '',
        pythonConcepts: Array.isArray(item.pythonConcepts) 
          ? item.pythonConcepts 
          : (typeof item.pythonConcepts === 'string' ? item.pythonConcepts.split(',').map(s => s.trim()).filter(Boolean) : []),
        category: item.category || 'Other',
        skillsDemonstrated: item.skillsDemonstrated || '',
        learningReflection: item.learningReflection || '',
        imageUrl: item.imageUrl || '',
        isDemo: Boolean(item.isDemo)
      });
    }

    return {
      valid: true,
      achievements: validatedAchievements,
      profile: parsed.profile && typeof parsed.profile === 'object' ? parsed.profile : null,
      topics: Array.isArray(parsed.topics) ? parsed.topics : null,
      summary: {
        totalRecords: validatedAchievements.length,
        totalStars: validatedAchievements.reduce((acc, curr) => acc + curr.stars, 0)
      }
    };
  } catch (err) {
    return { valid: false, error: `Invalid JSON syntax: ${err.message}` };
  }
}

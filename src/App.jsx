import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/common/ParticleBackground';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import PhotoEvidenceGallery from './components/evidence/PhotoEvidenceGallery';
import ProjectVideoSection from './components/video/ProjectVideoSection';
import AchievementGallery from './components/achievements/AchievementGallery';
import AchievementModal from './components/achievements/AchievementModal';
import AchievementDetailModal from './components/achievements/AchievementDetailModal';
import StarTimeline from './components/timeline/StarTimeline';
import WhyStarsSection from './components/why-stars/WhyStarsSection';
import LearningJourneySection from './components/learning/LearningJourneySection';
import TopicModal from './components/learning/TopicModal';
import FacultyRecognitionSection from './components/faculty/FacultyRecognitionSection';
import AnalyticsSection from './components/analytics/AnalyticsSection';
import AboutMeSection from './components/about/AboutMeSection';
import ProfileModal from './components/about/ProfileModal';
import ExportImportModal from './components/reports/ExportImportModal';
import PrintableReport from './components/reports/PrintableReport';
import ConfirmDialog from './components/common/ConfirmDialog';
import Footer from './components/layout/Footer';

import {
  getStoredAchievements,
  saveAchievements,
  getStoredProfile,
  saveProfile,
  getStoredTopics,
  saveTopics,
  resetToNotebookDefaults,
  resetAllStorage
} from './utils/storage';
import { fireStarCelebration, fireMilestoneCelebration } from './utils/confetti';

export default function App() {
  // Main Data States
  const [achievements, setAchievements] = useState([]);
  const [profile, setProfile] = useState(getStoredProfile());
  const [topics, setTopics] = useState(getStoredTopics());

  // Modal States
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [viewingAchievement, setViewingAchievement] = useState(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);

  const [isExportImportOpen, setIsExportImportOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    isDestructive: false,
    onConfirm: () => {}
  });

  // Load Initial Stored Data on Mount
  useEffect(() => {
    const loadedAchievements = getStoredAchievements();
    const loadedProfile = getStoredProfile();
    const loadedTopics = getStoredTopics();

    setAchievements(loadedAchievements);
    setProfile(loadedProfile);
    setTopics(loadedTopics);
  }, []);

  const totalStars = achievements
    .filter(a => a.isVerified !== false)
    .reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0);
  const achievementCount = achievements.length;

  // --- Handlers: Achievement Management ---

  const handleOpenAddAchievement = () => {
    setEditingAchievement(null);
    setIsAchievementModalOpen(true);
  };

  const handleOpenEditAchievement = (item) => {
    setEditingAchievement(item);
    setIsAchievementModalOpen(true);
  };

  const handleSaveAchievement = (achievementData) => {
    let updated;
    const isNew = !editingAchievement;

    if (isNew) {
      updated = [achievementData, ...achievements];
      fireStarCelebration();
    } else {
      updated = achievements.map(item =>
        item.id === achievementData.id ? achievementData : item
      );
    }

    setAchievements(updated);
    saveAchievements(updated);
    setIsAchievementModalOpen(false);
    setEditingAchievement(null);

    if (viewingAchievement && viewingAchievement.id === achievementData.id) {
      setViewingAchievement(achievementData);
    }
  };

  const handleDeleteAchievement = (achievement) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Achievement Record?',
      message: `Are you sure you want to delete "${achievement.title}"? This will remove ${achievement.stars} star(s) from your confirmed total. This action cannot be undone.`,
      confirmText: 'Delete Record',
      isDestructive: true,
      onConfirm: () => {
        const updated = achievements.filter(item => item.id !== achievement.id);
        setAchievements(updated);
        saveAchievements(updated);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        if (viewingAchievement && viewingAchievement.id === achievement.id) {
          setViewingAchievement(null);
        }
      }
    });
  };

  const handleToggleVerify = (achievement) => {
    const updated = achievements.map(item => {
      if (item.id === achievement.id) {
        return { ...item, isVerified: !item.isVerified };
      }
      return item;
    });
    setAchievements(updated);
    saveAchievements(updated);
    if (viewingAchievement && viewingAchievement.id === achievement.id) {
      setViewingAchievement(prev => ({ ...prev, isVerified: !prev.isVerified }));
    }
  };

  // --- Handlers: Profile Management ---

  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    setIsProfileModalOpen(false);
  };

  // --- Handlers: Learning Topics Management ---

  const handleOpenAddTopic = () => {
    setEditingTopic(null);
    setIsTopicModalOpen(true);
  };

  const handleOpenEditTopic = (topic) => {
    setEditingTopic(topic);
    setIsTopicModalOpen(true);
  };

  const handleSaveTopic = (topicData) => {
    let updated;
    const exists = topics.some(t => t.id === topicData.id);

    if (exists) {
      updated = topics.map(t => (t.id === topicData.id ? topicData : t));
    } else {
      updated = [...topics, topicData];
    }

    setTopics(updated);
    saveTopics(updated);
    setIsTopicModalOpen(false);
    setEditingTopic(null);
  };

  // --- Handlers: Reset Controls ---

  const handleResetToDefaults = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Restore Notebook Records?',
      message: 'This will restore the 8 authentic notebook achievement records and topics extracted from your photographs.',
      confirmText: 'Restore Defaults',
      isDestructive: false,
      onConfirm: () => {
        const defaults = resetToNotebookDefaults();
        setAchievements(defaults.achievements);
        setProfile(defaults.profile);
        setTopics(defaults.topics);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        fireStarCelebration();
      }
    });
  };

  const handleResetAllData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reset All Local Portfolio Data?',
      message: 'WARNING: This will erase all achievements, profile changes, and topic statuses stored in your browser. Ensure you export a backup first if you need your records.',
      confirmText: 'Erase Everything',
      isDestructive: true,
      onConfirm: () => {
        resetAllStorage();
        setAchievements([]);
        const resetProf = getStoredProfile();
        const resetTop = getStoredTopics();
        setProfile(resetProf);
        setTopics(resetTop);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // --- Handlers: Import ---

  const handleImportSuccess = (importedData, mode) => {
    let newAchievements;
    if (mode === 'replace') {
      newAchievements = importedData.achievements;
    } else {
      const existingIds = new Set(achievements.map(a => a.id));
      const incoming = importedData.achievements.filter(a => !existingIds.has(a.id));
      newAchievements = [...achievements, ...incoming];
    }

    setAchievements(newAchievements);
    saveAchievements(newAchievements);

    if (importedData.profile) {
      setProfile(importedData.profile);
      saveProfile(importedData.profile);
    }
    if (importedData.topics && importedData.topics.length > 0) {
      setTopics(importedData.topics);
      saveTopics(importedData.topics);
    }

    fireMilestoneCelebration();
  };

  const handleExploreClick = () => {
    const el = document.getElementById('achievements');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewEvidence = () => {
    const el = document.getElementById('evidence');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewVideo = () => {
    const el = document.getElementById('project-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-slate-100 relative isolate selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Full-Screen Fixed Background Image (Profile Picture) */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-no-repeat pointer-events-none -z-20 transition-all duration-700"
        style={{
          backgroundImage: `url('${profile?.avatarUrl || '/evidence/profile_picture.jpg'}')`,
          backgroundPosition: 'center 20%',
          backgroundAttachment: 'fixed'
        }}
        aria-hidden="true"
      />

      {/* 2. Atmospheric Dark Scrim & Gradient Overlay (ensures content legibility while letting the photo glow through) */}
      <div 
        className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#070913]/85 via-[#070913]/70 to-[#070913]/90 backdrop-blur-[1.5px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 3. Background Interactive Star Canvas (Twinkling Animation preserved) */}
      <ParticleBackground />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          onAddStar={handleOpenAddAchievement}
          onOpenExportImport={() => setIsExportImportOpen(true)}
          onOpenReport={() => setIsReportOpen(true)}
          totalStars={totalStars}
          achievementCount={achievementCount}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero / Dashboard */}
          <Hero
            profile={profile}
            achievements={achievements}
            topics={topics}
            onOpenEditProfile={() => setIsProfileModalOpen(true)}
            onAddStar={handleOpenAddAchievement}
            onExploreClick={handleExploreClick}
            onViewEvidence={handleViewEvidence}
            onViewVideo={handleViewVideo}
          />

          {/* 2. Course Photographs & Notebook Records */}
          <PhotoEvidenceGallery />

          {/* 3. Project Video Demo Showcase */}
          <ProjectVideoSection />

          {/* 4. Star Achievement Gallery */}
          <AchievementGallery
            achievements={achievements}
            onAddStar={handleOpenAddAchievement}
            onViewAchievement={(item) => setViewingAchievement(item)}
            onEditAchievement={handleOpenEditAchievement}
            onDeleteAchievement={handleDeleteAchievement}
            onToggleVerify={handleToggleVerify}
            onViewEvidence={handleViewEvidence}
          />

          {/* 4. Notebook-Inspired Chronological Timeline */}
          <StarTimeline
            achievements={achievements}
            onViewAchievement={(item) => setViewingAchievement(item)}
          />

          {/* 5. Why Faculty Awarded Me These Stars */}
          <WhyStarsSection
            achievements={achievements}
            onViewAchievement={(item) => setViewingAchievement(item)}
          />

          {/* 6. Python Learning Notes & Concepts */}
          <LearningJourneySection
            topics={topics}
            onEditTopic={handleOpenEditTopic}
            onAddTopic={handleOpenAddTopic}
          />

          {/* 7. Dedicated Faculty Recognition ("Good Job DHARMA!") */}
          <FacultyRecognitionSection
            onViewEvidence={handleViewEvidence}
          />

          {/* 8. Quantitative Analytics & Trends */}
          <AnalyticsSection
            achievements={achievements}
            topics={topics}
          />

          {/* 9. About Me & Self-Reflection */}
          <AboutMeSection
            profile={profile}
            onEditProfile={() => setIsProfileModalOpen(true)}
          />
        </main>

        {/* Footer */}
        <Footer
          profile={profile}
          totalStars={totalStars}
          onOpenExportImport={() => setIsExportImportOpen(true)}
          onOpenReport={() => setIsReportOpen(true)}
          onResetToDefaults={handleResetToDefaults}
          onResetAll={handleResetAllData}
        />
      </div>

      {/* --- Modals & Overlays --- */}

      {/* Add / Edit Star Achievement Modal */}
      <AchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => {
          setIsAchievementModalOpen(false);
          setEditingAchievement(null);
        }}
        onSave={handleSaveAchievement}
        initialData={editingAchievement}
      />

      {/* Full Achievement Detail Modal */}
      <AchievementDetailModal
        isOpen={Boolean(viewingAchievement)}
        onClose={() => setViewingAchievement(null)}
        achievement={viewingAchievement}
        onEdit={handleOpenEditAchievement}
      />

      {/* Student Profile & Bio Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Learning Topic Edit Modal */}
      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={() => {
          setIsTopicModalOpen(false);
          setEditingTopic(null);
        }}
        topic={editingTopic}
        initialTopic={editingTopic}
        onSave={handleSaveTopic}
      />

      {/* Export / Import Modal */}
      <ExportImportModal
        isOpen={isExportImportOpen}
        onClose={() => setIsExportImportOpen(false)}
        achievements={achievements}
        profile={profile}
        topics={topics}
        onImportSuccess={handleImportSuccess}
      />

      {/* Printable Report Dossier */}
      <PrintableReport
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        profile={profile}
        achievements={achievements}
        topics={topics}
      />

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        isDestructive={confirmDialog.isDestructive}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

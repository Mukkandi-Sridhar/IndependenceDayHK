// Database Service connecting directly to Firebase Cloud Firestore (gita4youth-25579)
import { 
  submitQuizToFirebase, 
  submitTributeToFirebase, 
  incrementDiyaInFirebase, 
  fetchQuizSubmissionsFromFirebase 
} from './firebase';

const STORAGE_KEYS = {
  TRIBUTES: 'g4y_db_tributes_v1',
  TOTAL_DIYAS: 'g4y_db_total_diyas_v1',
  QUIZ_SUBMISSIONS: 'g4y_db_quiz_submissions_v1',
  HIGH_SCORE: 'g4y_db_high_score_v1'
};

const DEFAULT_TRIBUTES = [
  {
    id: "1",
    name: "Aarav Sharma",
    location: "Bengaluru, Karnataka",
    message: "Salute to all our martyrs who sacrificed everything for our freedom today. Jai Hind! 🇮🇳",
    timestamp: "10 minutes ago",
    diyasLit: 1
  },
  {
    id: "2",
    name: "Priya Patel",
    location: "Ahmedabad, Gujarat",
    message: "Gita4Youth inspired me to understand Bhagavad Gita's message of Nishkama Karma for national unity! Vande Mataram!",
    timestamp: "25 minutes ago",
    diyasLit: 1
  }
];

export const dbService = {
  // Tributes DB Operations
  getTributes: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRIBUTES);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(DEFAULT_TRIBUTES));
      return DEFAULT_TRIBUTES;
    } catch (e) {
      return DEFAULT_TRIBUTES;
    }
  },

  addTribute: (tribute) => {
    try {
      // 1. Send to Firebase Cloud Firestore
      submitTributeToFirebase(tribute);

      // 2. Update local storage cache
      const current = dbService.getTributes();
      const updated = [tribute, ...current];
      localStorage.setItem(STORAGE_KEYS.TRIBUTES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  getTotalDiyas: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TOTAL_DIYAS);
      return stored ? parseInt(stored, 10) : 1947;
    } catch (e) {
      return 1947;
    }
  },

  incrementDiyas: () => {
    try {
      // 1. Send increment to Firebase Cloud Firestore
      incrementDiyaInFirebase();

      // 2. Update local cache
      const current = dbService.getTotalDiyas();
      const updated = current + 1;
      localStorage.setItem(STORAGE_KEYS.TOTAL_DIYAS, updated.toString());
      return updated;
    } catch (e) {
      return 1948;
    }
  },

  // Quiz Submissions DB Operations -> Direct Firebase Cloud Firestore Integration
  getQuizSubmissions: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_SUBMISSIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveQuizSubmission: async (userData) => {
    try {
      // 1. Submit document directly to Firebase Cloud Firestore (gita4youth-25579)
      const firebaseDocId = await submitQuizToFirebase(userData);
      console.log("Firebase Firestore record created with ID:", firebaseDocId);

      // 2. Save locally for instant offline UI update
      const submissions = dbService.getQuizSubmissions();
      const record = {
        id: firebaseDocId || Date.now().toString(),
        ...userData,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        firebaseSynced: true
      };
      const updated = [record, ...submissions];
      localStorage.setItem(STORAGE_KEYS.QUIZ_SUBMISSIONS, JSON.stringify(updated));

      // Update High Score in DB
      const currentHigh = dbService.getHighScore();
      if (userData.score > currentHigh) {
        localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, userData.score.toString());
      }

      return updated;
    } catch (e) {
      console.error('Quiz Submission Save Error:', e);
      return [];
    }
  },

  getHighScore: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
      return stored ? parseInt(stored, 10) : 0;
    } catch (e) {
      return 0;
    }
  }
};

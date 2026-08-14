// Firebase Cloud Firestore Service for Project: gita4youth-25579
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc, 
  increment, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit 
} from "firebase/firestore";

// Firebase Configuration reading from Vercel Environment Variables with fallback
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gita4youth-25579",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gita4youth-25579.firebaseapp.com",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gita4youth-25579.appspot.com",
};

// Initialize Firebase App & Cloud Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Firestore Collection Names
export const COLLECTIONS = {
  QUIZ_SUBMISSIONS: "quizSubmissions",
  TRIBUTES: "tributes",
  COUNTERS: "counters"
};

// 1. Submit Quiz Results directly to Firebase Firestore
export async function submitQuizToFirebase(userData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.QUIZ_SUBMISSIONS), {
      name: userData.name,
      phone: userData.phone,
      place: userData.place,
      isGita4YouthMember: userData.isGita4YouthMember,
      score: userData.score,
      totalQuestions: userData.totalQuestions,
      badge: userData.badge,
      createdAt: serverTimestamp(),
      dateStr: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    console.log("Firebase Quiz Submission Saved! Document ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Firebase Quiz Submission Error:", error);
    return null;
  }
}

// 2. Submit Tribute Message directly to Firebase Firestore
export async function submitTributeToFirebase(tributeData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.TRIBUTES), {
      name: tributeData.name,
      location: tributeData.location,
      message: tributeData.message,
      createdAt: serverTimestamp(),
      dateStr: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    console.log("Firebase Tribute Saved! Document ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Firebase Tribute Error:", error);
    return null;
  }
}

// 3. Increment Diya Counter in Firebase Firestore
export async function incrementDiyaInFirebase() {
  try {
    const counterRef = doc(db, COLLECTIONS.COUNTERS, "diyaCounter");
    await setDoc(counterRef, { count: increment(1) }, { merge: true });
    console.log("Firebase Diya Count Incremented!");
  } catch (error) {
    console.error("Firebase Diya Increment Error:", error);
  }
}

// 4. Fetch All Quiz Submissions from Firebase Firestore
export async function fetchQuizSubmissionsFromFirebase() {
  try {
    const q = query(collection(db, COLLECTIONS.QUIZ_SUBMISSIONS), orderBy("createdAt", "desc"), limit(20));
    const snapshot = await getDocs(q);
    const results = [];
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    console.error("Fetch Firebase Quiz Submissions Error:", error);
    return [];
  }
}

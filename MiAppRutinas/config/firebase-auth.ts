// config/firebase-auth.ts
import { auth } from './firebase-config'; // Importa la configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

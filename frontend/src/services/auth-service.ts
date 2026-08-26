import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signOut,
  deleteUser
} from 'firebase/auth';
import { firebaseAuth } from './firebase';
import type { LoginFormData, RegisterFormData } from '../utils/auth-schemas';

export const authService = {
  async login(data: LoginFormData) {
    const response = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
    return response.user;
  },

  async register(data: RegisterFormData) {
    const response = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
    if (response.user) {
      await updateProfile(response.user, { displayName: data.name });
    }
    return response.user;
  },

  async logout() {
    await signOut(firebaseAuth);
  },

  async deleteAccount() {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error("No user logged in");
    await deleteUser(user);
  }
};
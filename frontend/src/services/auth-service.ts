import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signOut,
  deleteUser
} from 'firebase/auth';
import { firebaseAuth } from './firebase';
import type { LoginFormData, RegisterFormData } from '../utils/auth-schemas';
import { api } from './api';

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

  async updateProfile({ name, photoFile, removePhoto }: { name: string; photoFile: File | null; removePhoto?: boolean }) {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error("No user logged in");

    const formData = new FormData();
    formData.append('name', name);
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    if (removePhoto) {
      formData.append('removePhoto', 'true');
    }

    const response = await api.put('/api/profile', formData);
    const { photoUrl } = response.data;

    const updatedPhotoURL = removePhoto ? "" : (photoUrl || user.photoURL);

    await updateProfile(user, { 
      displayName: name, 
      photoURL: updatedPhotoURL 
    });
    
    await user.reload(); 
    return firebaseAuth.currentUser;
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
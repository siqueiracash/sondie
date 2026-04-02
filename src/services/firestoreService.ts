import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Business, Service, Employee, Appointment, Client } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}

// Business Services
export const getBusinesses = async () => {
  const path = 'businesses';
  try {
    const q = query(collection(db, path), where('ownerId', '==', auth.currentUser?.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Business));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

export const createBusiness = async (business: Omit<Business, 'id' | 'createdAt'>) => {
  const path = 'businesses';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...business,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

// Appointment Services
export const getAppointments = (businessId: string, callback: (appointments: Appointment[]) => void) => {
  const path = `businesses/${businessId}/appointments`;
  const q = query(collection(db, path));
  
  return onSnapshot(q, (snapshot) => {
    const appointments = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      startTime: (doc.data().startTime as any).toDate(),
      endTime: (doc.data().endTime as any).toDate(),
      createdAt: (doc.data().createdAt as any).toDate()
    } as Appointment));
    callback(appointments);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
};

export const createAppointment = async (businessId: string, appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
  const path = `businesses/${businessId}/appointments`;
  try {
    const docRef = await addDoc(collection(db, path), {
      ...appointment,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

// Service Services
export const getServices = async (businessId: string) => {
  const path = `businesses/${businessId}/services`;
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

// Employee Services
export const getEmployees = async (businessId: string) => {
  const path = `businesses/${businessId}/employees`;
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

export const getBusinessBySlug = async (slug: string) => {
  const path = 'businesses';
  try {
    const q = query(collection(db, path), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Business;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

export const createClient = async (businessId: string, client: Omit<Client, 'id' | 'createdAt'>) => {
  const path = `businesses/${businessId}/clients`;
  try {
    const docRef = await addDoc(collection(db, path), {
      ...client,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

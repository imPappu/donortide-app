
// This file would connect to your real backend API in production

export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  donationsCount: number;
  lastDonationDate?: string;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  location: string;
  contactNumber: string;
  urgency: 'Standard' | 'High' | 'Urgent';
  notes?: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  userId: string;
  createdAt: string;
  updatedAt: string;
  latitude?: number;
  longitude?: number;
}

export interface Donation {
  id: string;
  userId: string;
  requestId?: string;
  bloodType: string;
  amount: string;
  location: string;
  date: string;
  isVerified: boolean;
  verificationCode?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt: string;
  status: 'Draft' | 'Published';
}

// Mock API calls with promise-based responses
const mockApiResponse = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// User related API calls
export const fetchUsers = async (): Promise<User[]> => {
  // This would be a fetch call to your backend API
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      bloodType: 'O+',
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isVerified: true,
      donationsCount: 5,
      lastDonationDate: '2023-01-15',
      createdAt: '2022-05-10T14:30:00Z',
    },
    // More mock users would be here
  ];
  
  return mockApiResponse(mockUsers);
};

export const fetchUserById = async (userId: string): Promise<User | null> => {
  const users = await fetchUsers();
  const user = users.find(u => u.id === userId);
  return mockApiResponse(user || null);
};

// Blood Request related API calls
export const fetchBloodRequests = async (): Promise<BloodRequest[]> => {
  const mockRequests: BloodRequest[] = [
    {
      id: '1',
      patientName: 'Emily Johnson',
      bloodType: 'O-',
      units: 2,
      hospital: 'Memorial Hospital',
      location: 'New York, NY',
      contactNumber: '+1 (555) 987-6543',
      urgency: 'Urgent',
      notes: 'Needed for emergency surgery, any donors welcome.',
      status: 'Pending',
      userId: '2',
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z',
    },
    // More mock requests would be here
  ];
  
  return mockApiResponse(mockRequests);
};

export const createBloodRequest = async (requestData: Omit<BloodRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<BloodRequest> => {
  const newRequest: BloodRequest = {
    ...requestData,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  console.log('Creating blood request:', newRequest);
  return mockApiResponse(newRequest, 800);
};

// Donation related API calls
export const fetchDonations = async (userId?: string): Promise<Donation[]> => {
  const mockDonations: Donation[] = [
    {
      id: '1',
      userId: '1',
      requestId: '1',
      bloodType: 'O+',
      amount: '450ml',
      location: 'Central Blood Bank',
      date: '2023-05-15T10:30:00Z',
      isVerified: true,
    },
    // More mock donations would be here
  ];
  
  if (userId) {
    return mockApiResponse(mockDonations.filter(d => d.userId === userId));
  }
  
  return mockApiResponse(mockDonations);
};

// Blog related API calls
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Importance of Blood Donation',
      content: '...',
      excerpt: 'Why donating blood regularly can save lives and improve your health.',
      author: 'Dr. Sarah Johnson',
      category: 'Education',
      tags: ['donation', 'health', 'benefits'],
      publishedAt: '2023-05-01T10:00:00Z',
      status: 'Published',
    },
    // More mock posts would be here
  ];
  
  return mockApiResponse(mockPosts);
};

// News related API calls
export const fetchHealthNews = async (): Promise<any[]> => {
  // In production, this would connect to a news API like NewsAPI.org
  const mockNews = [
    {
      title: 'New Blood Donation Guidelines Released',
      description: 'The American Red Cross has released new guidelines for blood donation eligibility.',
      url: '#',
      urlToImage: 'https://placehold.co/600x400/red/white?text=Blood+Donation',
      publishedAt: '2023-05-15T10:30:00Z',
      source: { name: 'Health News Today' }
    },
    // More mock news would be here
  ];
  
  return mockApiResponse(mockNews, 1000);
};

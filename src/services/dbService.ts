
// This service file defines how your frontend communicates with your PostgreSQL backend
// You'll need to replace the base URL with your actual API endpoint once deployed

const API_BASE_URL = 'https://your-cpanel-domain.com/api'; // Replace with your actual API endpoint

// Types
export interface BloodRequest {
  id?: string;
  patientName: string;
  bloodType: string;
  hospital: string;
  location: string;
  contactNumber: string;
  urgency: 'Standard' | 'High' | 'Urgent';
  notes?: string;
  createdAt?: string;
}

export interface Donor {
  id?: string;
  name: string;
  bloodType: string;
  location: string;
  lastDonation?: string;
  contactNumber: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Banner {
  id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  active?: boolean;
  displayOrder?: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppSetting {
  settingKey: string;
  settingValue: string;
  description?: string;
  updatedAt?: string;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  targetType: 'all' | 'donors' | 'specific_users';
  targetData?: object;
  status?: 'pending' | 'sent' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  createdAt?: string;
}

export interface Payment {
  id?: string;
  userId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'paypal' | 'stripe' | 'esewa' | 'ime' | 'upi';
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentDetails?: object;
  createdAt?: string;
  updatedAt?: string;
}

// Blood Request API functions
export const getBloodRequests = async (): Promise<BloodRequest[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`);
    if (!response.ok) throw new Error('Failed to fetch blood requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    return [];
  }
};

export const createBloodRequest = async (request: BloodRequest): Promise<BloodRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Failed to create blood request');
    return await response.json();
  } catch (error) {
    console.error('Error creating blood request:', error);
    return null;
  }
};

export const updateBloodRequest = async (id: string, request: Partial<BloodRequest>): Promise<BloodRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Failed to update blood request');
    return await response.json();
  } catch (error) {
    console.error('Error updating blood request:', error);
    return null;
  }
};

export const deleteBloodRequest = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete blood request');
    return true;
  } catch (error) {
    console.error('Error deleting blood request:', error);
    return false;
  }
};

// Donor API functions
export const getDonors = async (): Promise<Donor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`);
    if (!response.ok) throw new Error('Failed to fetch donors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donors:', error);
    return [];
  }
};

export const registerDonor = async (donor: Donor): Promise<Donor | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donor),
    });
    
    if (!response.ok) throw new Error('Failed to register donor');
    return await response.json();
  } catch (error) {
    console.error('Error registering donor:', error);
    return null;
  }
};

export const updateDonor = async (id: string, donor: Partial<Donor>): Promise<Donor | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donor),
    });
    
    if (!response.ok) throw new Error('Failed to update donor');
    return await response.json();
  } catch (error) {
    console.error('Error updating donor:', error);
    return null;
  }
};

export const deleteDonor = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donors/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete donor');
    return true;
  } catch (error) {
    console.error('Error deleting donor:', error);
    return false;
  }
};

// Blog Post API functions
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`);
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog post');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const createBlogPost = async (post: BlogPost): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) throw new Error('Failed to create blog post');
    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) throw new Error('Failed to update blog post');
    return await response.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete blog post');
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// Banner API functions
export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners`);
    if (!response.ok) throw new Error('Failed to fetch banners');
    return await response.json();
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};

export const createBanner = async (banner: Banner): Promise<Banner | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banner),
    });
    
    if (!response.ok) throw new Error('Failed to create banner');
    return await response.json();
  } catch (error) {
    console.error('Error creating banner:', error);
    return null;
  }
};

export const updateBanner = async (id: string, banner: Partial<Banner>): Promise<Banner | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banner),
    });
    
    if (!response.ok) throw new Error('Failed to update banner');
    return await response.json();
  } catch (error) {
    console.error('Error updating banner:', error);
    return null;
  }
};

export const deleteBanner = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete banner');
    return true;
  } catch (error) {
    console.error('Error deleting banner:', error);
    return false;
  }
};

// App Settings API functions
export const getAppSettings = async (): Promise<AppSetting[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`);
    if (!response.ok) throw new Error('Failed to fetch app settings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching app settings:', error);
    return [];
  }
};

export const updateAppSetting = async (key: string, value: string): Promise<AppSetting | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settingValue: value }),
    });
    
    if (!response.ok) throw new Error('Failed to update app setting');
    return await response.json();
  } catch (error) {
    console.error('Error updating app setting:', error);
    return null;
  }
};

// Notification API functions
export const sendNotification = async (notification: Notification): Promise<Notification | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });
    
    if (!response.ok) throw new Error('Failed to send notification');
    return await response.json();
  } catch (error) {
    console.error('Error sending notification:', error);
    return null;
  }
};

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

// Payment API functions
export const processPayment = async (payment: Payment): Promise<Payment | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    
    if (!response.ok) throw new Error('Failed to process payment');
    return await response.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    return null;
  }
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`);
    if (!response.ok) throw new Error('Failed to fetch payments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
};

// Dashboard Statistics API
export const getDashboardStats = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch dashboard statistics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    return {
      totalUsers: 0,
      totalDonations: 0,
      totalRequests: 0,
      totalLocations: 0,
      recentRequests: [],
    };
  }
};

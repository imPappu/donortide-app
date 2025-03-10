
export const DEMO_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password',
    avatar: '',
    isVerified: true,
    role: 'user' as const,
    roles: ['user'] as const
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: '',
    isVerified: true,
    role: 'admin' as const,
    roles: ['admin', 'user'] as const
  },
  {
    id: '3',
    name: 'Sarah Donor',
    email: 'donor@example.com',
    password: 'password',
    avatar: '',
    isVerified: true,
    role: 'donor' as const,
    roles: ['donor', 'user'] as const
  },
  {
    id: '4',
    name: 'Michael Provider',
    email: 'provider@example.com',
    password: 'password',
    avatar: '',
    isVerified: true,
    role: 'service_provider' as const,
    roles: ['service_provider', 'user'] as const
  }
];

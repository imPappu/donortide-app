
export const DEMO_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password',
    avatar: '',
    isVerified: true,
    role: 'user' as const
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: '',
    isVerified: true,
    role: 'admin' as const
  }
];

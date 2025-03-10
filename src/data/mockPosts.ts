
import { Post } from "@/types/community";

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userName: 'Sarah Williams',
    content: 'Just donated blood today at Memorial Hospital. The staff was amazing and the process was quick and painless. If you\'ve been considering donating, please do it - you can save a life! #DonorHero',
    likes: 24,
    comments: 5,
    shares: 2,
    timestamp: '2 hours ago',
    liked: false,
    type: 'text',
    tags: ['BloodDonation', 'DonorHero', 'MemorialHospital'],
    commentData: [
      {
        id: '1',
        userName: 'John Smith',
        content: 'Thank you for your donation! You\'re making a huge difference.',
        timestamp: '1 hour ago'
      },
      {
        id: '2',
        userName: 'Emily Davis',
        content: 'You\'re inspiring me to donate as well!',
        timestamp: '30 minutes ago'
      }
    ]
  },
  {
    id: '2',
    userName: 'Michael Chen',
    content: 'My grandmother needed blood last month and I was so grateful for the donors who helped her. Today I paid it forward and donated for the first time!',
    imageUrl: 'https://placehold.co/600x400/red/white?text=First+Time+Donor',
    likes: 35,
    comments: 8,
    shares: 4,
    timestamp: '5 hours ago',
    liked: true,
    type: 'image',
    tags: ['FirstTimeDonor', 'PayItForward', 'BloodDonation']
  },
  {
    id: '3',
    userName: 'Emma Johnson',
    content: 'URGENT: O- blood needed at City Medical Center. My brother is undergoing emergency surgery. Please help if you can!',
    likes: 42,
    comments: 12,
    shares: 15,
    timestamp: '1 day ago',
    liked: false,
    type: 'text',
    tags: ['BloodUrgent', 'ONegative', 'CityMedical']
  }
];

// Mock trending tags data
export const TRENDING_TAGS: Tag[] = [
  { id: '1', name: 'BloodUrgent', count: 58, trending: true },
  { id: '2', name: 'ONegative', count: 42, trending: true },
  { id: '3', name: 'BloodDonation', count: 127, trending: true },
  { id: '4', name: 'DonorHero', count: 89, trending: true },
  { id: '5', name: 'FirstTimeDonor', count: 63, trending: true },
];

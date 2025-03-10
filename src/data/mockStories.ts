
import { Story } from "@/types/stories";

export const MOCK_STORIES: Story[] = [
  {
    id: '1',
    userName: 'James Wilson',
    title: 'My Journey as a Regular Donor',
    content: 'I\'ve been donating blood every 3 months for the past 5 years. It started when my sister needed a transfusion after a car accident. Seeing how blood donation saved her life motivated me to become a regular donor. Over the years, I\'ve donated more than 20 times, potentially helping dozens of patients.',
    imageUrl: 'https://placehold.co/600x400/red/white?text=Blood+Donor',
    category: 'donor',
    badges: ['Hero Donor', 'Lifetime Saver'],
    likes: 56,
    comments: 12,
    shares: 8,
    timestamp: '3 days ago',
    isVerified: true
  },
  {
    id: '2',
    userName: 'Maria Rodriguez',
    title: 'How Blood Donation Saved My Life',
    content: 'Six months ago, I was in a serious accident and lost a lot of blood. I needed multiple transfusions to survive. Thanks to generous donors, I\'m alive today. This experience changed my perspective on blood donation forever. As soon as I\'m eligible, I plan to donate regularly to help others like me.',
    category: 'recipient',
    likes: 78,
    comments: 15,
    shares: 23,
    timestamp: '1 week ago'
  },
  {
    id: '3',
    userName: 'David Chen',
    title: 'Volunteering at Donation Drives',
    content: 'I\'ve been volunteering at blood donation drives for the past 2 years. While I can\'t donate blood myself due to medical reasons, I found this way to contribute. Seeing the impact of these drives and helping to organize them has been incredibly rewarding. We\'re always looking for more volunteers!',
    imageUrl: 'https://placehold.co/600x400/blue/white?text=Volunteer+Work',
    category: 'volunteer',
    badges: ['Community Star'],
    likes: 42,
    comments: 9,
    shares: 5,
    timestamp: '2 weeks ago',
    isVerified: true
  }
];

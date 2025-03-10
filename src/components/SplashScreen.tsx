
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAppSettings } from '@/services/dbService';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [settings, setSettings] = useState({
    backgroundColor: '#ef4444',
    logo: '/logo.png',
    title: 'DonorTide',
    subtitle: 'Connecting donors with those in need',
    duration: 2000
  });

  useEffect(() => {
    const fetchSplashSettings = async () => {
      try {
        const appSettings = await getAppSettings();
        const splashSettings = appSettings.filter(setting => 
          setting.settingKey.startsWith('splash_')
        );
        
        if (splashSettings.length > 0) {
          const newSettings = { ...settings };
          
          splashSettings.forEach(setting => {
            const key = setting.settingKey.replace('splash_', '');
            if (key in newSettings) {
              // @ts-ignore - Dynamic assignment
              newSettings[key] = setting.settingValue;
            }
          });
          
          setSettings(newSettings);
        }
      } catch (error) {
        console.error('Failed to fetch splash screen settings:', error);
      }
    };
    
    fetchSplashSettings();
    
    // Auto-hide splash screen after duration
    const timer = setTimeout(() => {
      onFinish();
    }, parseInt(settings.duration.toString()) || 2000);
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: settings.backgroundColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="text-center"
      >
        <img 
          src={settings.logo} 
          alt="Logo"
          className="w-32 h-32 mx-auto mb-6 rounded-full bg-white p-2 shadow-lg"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg'; // Fallback image
          }}
        />
        <h1 className="text-3xl font-bold text-white mb-2">{settings.title}</h1>
        <p className="text-white text-lg opacity-90">{settings.subtitle}</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;

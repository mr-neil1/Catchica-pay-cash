import { Tabs } from 'expo-router';
import { Chrome as Home, Trophy, Users, Wallet, User } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';

export default function TabLayout() {
  const { theme } = useThemeStore();
  
  const colors = {
    gold: '#FFD700',
    black: '#121212',
    green: '#16A34A',
    white: '#FFFFFF',
    gray: '#8B8B8B',
  };

  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: isDark ? colors.black : colors.white,
          borderTopWidth: 1,
          borderTopColor: isDark ? '#333333' : '#E5E5E5',
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Jeux',
          tabBarIcon: ({ size, color }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Portefeuille',
          tabBarIcon: ({ size, color }) => (
            <Wallet size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
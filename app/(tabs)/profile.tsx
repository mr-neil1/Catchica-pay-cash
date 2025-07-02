import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Crown, Trophy, Target, Share, Settings, Moon, Sun, Bell, Shield, CircleHelp as HelpCircle, LogOut, Gift, Star, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { theme, setTheme } = useThemeStore();
  const { user } = useAuthStore();
  
  const colors = {
    gold: '#FFD700',
    black: '#121212',
    green: '#16A34A',
    white: '#FFFFFF',
    gray: '#8B8B8B',
    blue: '#3B82F6',
    purple: '#A855F7',
  };

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? colors.black : colors.white;
  const textColor = isDark ? colors.white : colors.black;
  const cardColor = isDark ? '#1a1a1a' : '#f8f9fa';

  const achievements = [
    { id: 1, name: 'Premier Sang', description: 'Première victoire', icon: '🩸', unlocked: true },
    { id: 2, name: 'Série Dorée', description: '5 victoires d\'affilée', icon: '🏆', unlocked: true },
    { id: 3, name: 'Millionnaire', description: 'Atteindre 10,000 CC', icon: '💰', unlocked: false },
    { id: 4, name: 'Maître du Bluff', description: 'Gagner 50 parties de poker', icon: '🃏', unlocked: false },
  ];

  const menuItems = [
    { id: 'referral', title: 'Programme de parrainage', icon: Gift, color: colors.green },
    { id: 'notifications', title: 'Notifications', icon: Bell, color: colors.blue },
    { id: 'privacy', title: 'Confidentialité', icon: Shield, color: colors.purple },
    { id: 'help', title: 'Aide & Support', icon: HelpCircle, color: colors.gray },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings color={colors.gray} size={24} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={[colors.gold, '#e6c200']}
          style={styles.profileCard}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User color={colors.black} size={32} />
            </View>
            <TouchableOpacity style={styles.shareButton}>
              <Share color={colors.black} size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.username}>{user?.username || 'Champion'}</Text>
          
          <View style={styles.rankInfo}>
            <Crown color={colors.black} size={16} />
            <Text style={styles.rank}>{user?.rank || 'Bronze'}</Text>
            <Text style={styles.level}>Niveau {user?.level || 1}</Text>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>156</Text>
              <Text style={styles.profileStatLabel}>Parties</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>68%</Text>
              <Text style={styles.profileStatLabel}>Victoires</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>2.8k</Text>
              <Text style={styles.profileStatLabel}>Gains</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Achievements
          </Text>
          
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  { backgroundColor: cardColor },
                  !achievement.unlocked && styles.achievementLocked,
                ]}
              >
                <Text style={[
                  styles.achievementIcon,
                  !achievement.unlocked && { opacity: 0.3 }
                ]}>
                  {achievement.icon}
                </Text>
                <Text style={[
                  styles.achievementName,
                  { color: achievement.unlocked ? textColor : colors.gray }
                ]}>
                  {achievement.name}
                </Text>
                <Text style={[styles.achievementDesc, { color: colors.gray }]}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Star color={colors.gold} size={12} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Theme Toggle */}
        <View style={[styles.themeCard, { backgroundColor: cardColor }]}>
          <View style={styles.themeInfo}>
            <View style={styles.themeIcon}>
              {isDark ? (
                <Moon color={colors.gold} size={20} />
              ) : (
                <Sun color={colors.gold} size={20} />
              )}
            </View>
            <View>
              <Text style={[styles.themeTitle, { color: textColor }]}>
                Thème {isDark ? 'Sombre' : 'Clair'}
              </Text>
              <Text style={[styles.themeSubtitle, { color: colors.gray }]}>
                Personnalise ton expérience
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={() => setTheme(isDark ? 'light' : 'dark')}
          >
            <View style={[
              styles.themeToggleTrack,
              { backgroundColor: isDark ? colors.gold : colors.gray }
            ]}>
              <View style={[
                styles.themeToggleThumb,
                { 
                  backgroundColor: colors.white,
                  transform: [{ translateX: isDark ? 20 : 0 }]
                }
              ]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, { backgroundColor: cardColor }]}
              >
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                  <Icon color={item.color} size={20} />
                </View>
                <Text style={[styles.menuTitle, { color: textColor }]}>
                  {item.title}
                </Text>
                <Text style={[styles.menuArrow, { color: colors.gray }]}>
                  →
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Referral Code */}
        <View style={[styles.referralCard, { backgroundColor: cardColor }]}>
          <View style={styles.referralHeader}>
            <View style={styles.referralIcon}>
              <Gift color={colors.green} size={20} />
            </View>
            <View style={styles.referralInfo}>
              <Text style={[styles.referralTitle, { color: textColor }]}>
                Code de parrainage
              </Text>
              <Text style={[styles.referralSubtitle, { color: colors.gray }]}>
                Partage et gagne des bonus
              </Text>
            </View>
          </View>
          
          <View style={styles.referralCode}>
            <Text style={[styles.referralCodeText, { color: colors.green }]}>
              CATCH{user?.id?.slice(-4) || '1234'}
            </Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copier</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut color={colors.red} size={20} />
          <Text style={[styles.logoutText, { color: colors.red }]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#121212',
    marginBottom: 8,
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  rank: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#121212',
  },
  level: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#121212',
    opacity: 0.7,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#121212',
    marginBottom: 4,
  },
  profileStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#121212',
    opacity: 0.7,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  themeCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  themeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  themeSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  themeToggle: {
    marginLeft: 16,
  },
  themeToggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  themeToggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  menu: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  menuArrow: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  referralCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  referralIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  referralInfo: {
    flex: 1,
  },
  referralTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  referralSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  referralCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  referralCodeText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  copyButton: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 40,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});
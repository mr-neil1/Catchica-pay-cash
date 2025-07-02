import React, { useState } from 'react';
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
import { 
  MessageCircle, 
  Heart, 
  Trophy, 
  Flame,
  Share,
  Crown,
  Target,
  Users,
  TrendingUp
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SocialScreen() {
  const { theme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('feed');
  
  const colors = {
    gold: '#FFD700',
    black: '#121212',
    green: '#16A34A',
    white: '#FFFFFF',
    gray: '#8B8B8B',
    red: '#EF4444',
    blue: '#3B82F6',
  };

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? colors.black : colors.white;
  const textColor = isDark ? colors.white : colors.black;
  const cardColor = isDark ? '#1a1a1a' : '#f8f9fa';

  const feedPosts = [
    {
      id: 1,
      type: 'victory',
      user: 'GamerPro99',
      avatar: '👑',
      content: 'Vient de remporter 850 CC aux échecs !',
      game: 'Échecs Blitz',
      amount: 850,
      timestamp: '2 min',
      likes: 24,
      comments: 8,
      reactions: ['🔥', '💰', '👏'],
    },
    {
      id: 2,
      type: 'challenge',
      user: 'CryptoKing',
      avatar: '⚡',
      content: 'Qui ose me défier au poker ? Mise minimum 200 CC',
      game: 'Poker Texas',
      participants: 2,
      maxParticipants: 6,
      timestamp: '5 min',
      likes: 12,
      comments: 3,
      isHot: true,
    },
    {
      id: 3,
      type: 'bet',
      user: 'LuckyShark',
      avatar: '🦈',
      content: 'Paris ouvert: PSG vs Real Madrid. Qui parie avec moi ?',
      game: 'Football',
      odds: '2.5x',
      timestamp: '12 min',
      likes: 35,
      comments: 15,
      participants: 8,
    },
    {
      id: 4,
      type: 'achievement',
      user: 'NinjaBet',
      avatar: '🥷',
      content: 'Nouveau rang atteint: Maître ! 🏆',
      rank: 'Maître',
      streak: 15,
      timestamp: '1h',
      likes: 67,
      comments: 22,
    },
  ];

  const tabs = [
    { id: 'feed', name: 'Fil', icon: TrendingUp },
    { id: 'challenges', name: 'Défis', icon: Target },
    { id: 'leaderboard', name: 'Classement', icon: Trophy },
  ];

  const renderPost = (post: any) => (
    <View key={post.id} style={[styles.postCard, { backgroundColor: cardColor }]}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.avatar}</Text>
          </View>
          <View>
            <Text style={[styles.username, { color: textColor }]}>
              {post.user}
            </Text>
            <Text style={[styles.timestamp, { color: colors.gray }]}>
              {post.timestamp}
            </Text>
          </View>
        </View>
        {post.isHot && (
          <View style={styles.hotBadge}>
            <Flame color={colors.red} size={16} />
          </View>
        )}
      </View>

      <Text style={[styles.postContent, { color: textColor }]}>
        {post.content}
      </Text>

      {post.type === 'victory' && (
        <LinearGradient
          colors={[colors.green, '#15803d']}
          style={styles.victoryBadge}
        >
          <Trophy color={colors.white} size={16} />
          <Text style={styles.victoryText}>
            +{post.amount} CC • {post.game}
          </Text>
        </LinearGradient>
      )}

      {post.type === 'challenge' && (
        <View style={[styles.challengeInfo, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]}>
          <View style={styles.challengeDetails}>
            <Text style={[styles.challengeGame, { color: textColor }]}>
              {post.game}
            </Text>
            <Text style={[styles.challengeParticipants, { color: colors.gray }]}>
              {post.participants}/{post.maxParticipants} joueurs
            </Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <LinearGradient
              colors={[colors.gold, '#e6c200']}
              style={styles.joinButtonGradient}
            >
              <Text style={styles.joinButtonText}>Rejoindre</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {post.type === 'bet' && (
        <View style={[styles.betInfo, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]}>
          <View style={styles.betDetails}>
            <Text style={[styles.betGame, { color: textColor }]}>
              {post.game}
            </Text>
            <Text style={[styles.betOdds, { color: colors.green }]}>
              Cote: {post.odds}
            </Text>
          </View>
          <Text style={[styles.betParticipants, { color: colors.gray }]}>
            {post.participants} parieurs
          </Text>
        </View>
      )}

      {post.type === 'achievement' && (
        <LinearGradient
          colors={[colors.gold, '#e6c200']}
          style={styles.achievementBadge}
        >
          <Crown color={colors.black} size={16} />
          <Text style={styles.achievementText}>
            {post.rank} • {post.streak} victoires d'affilée
          </Text>
        </LinearGradient>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart color={colors.gray} size={18} />
          <Text style={[styles.actionText, { color: colors.gray }]}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle color={colors.gray} size={18} />
          <Text style={[styles.actionText, { color: colors.gray }]}>
            {post.comments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share color={colors.gray} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          Community
        </Text>
        <Text style={[styles.subtitle, { color: colors.gray }]}>
          Suis les meilleurs joueurs
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon 
                color={isActive ? colors.gold : colors.gray} 
                size={20} 
              />
              <Text style={[
                styles.tabText,
                { color: isActive ? colors.gold : colors.gray }
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'feed' && (
          <View style={styles.feed}>
            {feedPosts.map(renderPost)}
          </View>
        )}

        {activeTab === 'challenges' && (
          <View style={styles.challenges}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Défis ouverts
            </Text>
            {feedPosts.filter(post => post.type === 'challenge').map(renderPost)}
          </View>
        )}

        {activeTab === 'leaderboard' && (
          <View style={styles.leaderboard}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Classement hebdomadaire
            </Text>
            {/* Leaderboard content would go here */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
  },
  feed: {
    paddingHorizontal: 20,
  },
  challenges: {
    paddingHorizontal: 20,
  },
  leaderboard: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  postCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  hotBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 6,
  },
  postContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  victoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 12,
  },
  victoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  challengeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  challengeDetails: {
    flex: 1,
  },
  challengeGame: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  challengeParticipants: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  joinButton: {
    marginLeft: 12,
  },
  joinButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  joinButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  betInfo: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  betDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  betGame: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  betOdds: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  betParticipants: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 12,
  },
  achievementText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});
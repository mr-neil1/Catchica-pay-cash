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
import { 
  Crown, 
  Flame, 
  TrendingUp, 
  Plus, 
  Zap,
  DollarSign,
  Trophy,
  Target
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  
  const colors = {
    gold: '#FFD700',
    black: '#121212',
    green: '#16A34A',
    white: '#FFFFFF',
    gray: '#8B8B8B',
    red: '#EF4444',
  };

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? colors.black : colors.white;
  const textColor = isDark ? colors.white : colors.black;
  const cardColor = isDark ? '#1a1a1a' : '#f8f9fa';

  const todayBets = [
    { id: 1, title: 'PSG vs Real Madrid', odds: '2.5x', category: 'Football', hot: true },
    { id: 2, title: 'Échecs Blitz 5min', odds: '1.8x', category: 'Jeux', participants: 12 },
    { id: 3, title: 'Lakers vs Warriors', odds: '3.2x', category: 'Basketball', hot: true },
  ];

  const topWinners = [
    { id: 1, username: 'CryptoKing', amount: 2500, streak: 7 },
    { id: 2, username: 'GamerPro99', amount: 1800, streak: 4 },
    { id: 3, username: 'LuckyShark', amount: 1200, streak: 3 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.gray }]}>
              Salut, {user?.username || 'Champion'}
            </Text>
            <Text style={[styles.welcomeBack, { color: textColor }]}>
              Prêt à tout rafler ?
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationBadge}>
            <Zap color={colors.gold} size={24} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={[colors.gold, '#e6c200']}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Solde disponible</Text>
            <Crown color={colors.black} size={20} />
          </View>
          <Text style={styles.balanceAmount}>{user?.balance || 0} CC</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceAction}>
              <Plus color={colors.black} size={16} />
              <Text style={styles.balanceActionText}>Recharger</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceAction}>
              <TrendingUp color={colors.black} size={16} />
              <Text style={styles.balanceActionText}>Historique</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: cardColor }]}>
            <LinearGradient
              colors={[colors.green, '#15803d']}
              style={styles.quickActionIcon}
            >
              <Target color={colors.white} size={20} />
            </LinearGradient>
            <Text style={[styles.quickActionText, { color: textColor }]}>
              Proposer un pari
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickAction, { backgroundColor: cardColor }]}>
            <LinearGradient
              colors={[colors.red, '#dc2626']}
              style={styles.quickActionIcon}
            >
              <Trophy color={colors.white} size={20} />
            </LinearGradient>
            <Text style={[styles.quickActionText, { color: textColor }]}>
              Lancer un défi
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Hot Bets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Paris du jour
            </Text>
            <Flame color={colors.red} size={20} />
          </View>
          
          {todayBets.map((bet) => (
            <TouchableOpacity
              key={bet.id}
              style={[styles.betCard, { backgroundColor: cardColor }]}
            >
              <View style={styles.betCardHeader}>
                <View style={styles.betInfo}>
                  <Text style={[styles.betTitle, { color: textColor }]}>
                    {bet.title}
                  </Text>
                  <Text style={[styles.betCategory, { color: colors.gray }]}>
                    {bet.category}
                    {bet.participants && ` • ${bet.participants} joueurs`}
                  </Text>
                </View>
                <View style={styles.betOdds}>
                  <Text style={[styles.oddsText, { color: colors.green }]}>
                    {bet.odds}
                  </Text>
                  {bet.hot && (
                    <View style={styles.hotBadge}>
                      <Flame color={colors.red} size={12} />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Winners */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Top Gagnants
            </Text>
            <Trophy color={colors.gold} size={20} />
          </View>
          
          {topWinners.map((winner, index) => (
            <View
              key={winner.id}
              style={[styles.winnerCard, { backgroundColor: cardColor }]}
            >
              <View style={[styles.winnerRank, { backgroundColor: colors.gold }]}>
                <Text style={styles.winnerRankText}>{index + 1}</Text>
              </View>
              <View style={styles.winnerInfo}>
                <Text style={[styles.winnerName, { color: textColor }]}>
                  {winner.username}
                </Text>
                <Text style={[styles.winnerStreak, { color: colors.gray }]}>
                  {winner.streak} victoires d'affilée
                </Text>
              </View>
              <View style={styles.winnerAmount}>
                <DollarSign color={colors.green} size={16} />
                <Text style={[styles.winnerAmountText, { color: colors.green }]}>
                  {winner.amount} CC
                </Text>
              </View>
            </View>
          ))}
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  welcomeBack: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#121212',
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#121212',
    marginVertical: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  balanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  balanceActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#121212',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  quickAction: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  betCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  betCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betInfo: {
    flex: 1,
  },
  betTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  betCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  betOdds: {
    alignItems: 'center',
    gap: 4,
  },
  oddsText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  hotBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 2,
  },
  winnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  winnerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  winnerRankText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  winnerInfo: {
    flex: 1,
  },
  winnerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  winnerStreak: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  winnerAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  winnerAmountText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});
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
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  Crown,
  Trophy,
  Target,
  DollarSign,
  Calendar
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WalletScreen() {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  
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

  const periods = [
    { id: '7d', name: '7j' },
    { id: '30d', name: '30j' },
    { id: 'all', name: 'Total' },
  ];

  const stats = {
    '7d': { profit: 450, winRate: 68, gamesPlayed: 23 },
    '30d': { profit: 1200, winRate: 72, gamesPlayed: 85 },
    'all': { profit: 2800, winRate: 65, gamesPlayed: 156 },
  };

  const transactions = [
    {
      id: 1,
      type: 'win',
      amount: 250,
      game: 'Échecs Blitz',
      opponent: 'CryptoKing',
      timestamp: '2h',
      icon: Trophy,
    },
    {
      id: 2,
      type: 'loss',
      amount: -100,
      game: 'Poker Texas',
      opponent: 'GamerPro99',
      timestamp: '4h',
      icon: Target,
    },
    {
      id: 3,
      type: 'deposit',
      amount: 500,
      game: 'Rechargement',
      timestamp: '1j',
      icon: Plus,
    },
    {
      id: 4,
      type: 'win',
      amount: 180,
      game: 'Dés Rapides',
      opponent: 'LuckyShark',
      timestamp: '1j',
      icon: Trophy,
    },
    {
      id: 5,
      type: 'loss',
      amount: -75,
      game: 'Pierre Papier Ciseaux',
      opponent: 'NinjaBet',
      timestamp: '2j',
      icon: Target,
    },
  ];

  const currentStats = stats[selectedPeriod];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            Portefeuille
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray }]}>
            Gère ton capital gaming
          </Text>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={[colors.gold, '#e6c200']}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Solde total</Text>
              <Text style={styles.balanceAmount}>
                {user?.balance || 0} CC
              </Text>
            </View>
            <Wallet color={colors.black} size={24} />
          </View>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceAction}>
              <Plus color={colors.black} size={16} />
              <Text style={styles.balanceActionText}>Recharger</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceAction}>
              <Minus color={colors.black} size={16} />
              <Text style={styles.balanceActionText}>Retirer</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                { backgroundColor: cardColor },
                selectedPeriod === period.id && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                { color: selectedPeriod === period.id ? colors.gold : colors.gray }
              ]}>
                {period.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: cardColor }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statLabel, { color: colors.gray }]}>
                Profit
              </Text>
              {currentStats.profit >= 0 ? (
                <TrendingUp color={colors.green} size={16} />
              ) : (
                <TrendingDown color={colors.red} size={16} />
              )}
            </View>
            <Text style={[
              styles.statValue,
              { color: currentStats.profit >= 0 ? colors.green : colors.red }
            ]}>
              {currentStats.profit >= 0 ? '+' : ''}{currentStats.profit} CC
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: cardColor }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statLabel, { color: colors.gray }]}>
                Taux de victoire
              </Text>
              <Trophy color={colors.gold} size={16} />
            </View>
            <Text style={[styles.statValue, { color: colors.gold }]}>
              {currentStats.winRate}%
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: cardColor }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statLabel, { color: colors.gray }]}>
                Parties jouées
              </Text>
              <Target color={colors.gray} size={16} />
            </View>
            <Text style={[styles.statValue, { color: textColor }]}>
              {currentStats.gamesPlayed}
            </Text>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.transactions}>
          <View style={styles.transactionsHeader}>
            <Text style={[styles.transactionsTitle, { color: textColor }]}>
              Historique
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.gold }]}>
                Voir tout
              </Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            const isWin = transaction.type === 'win';
            const isDeposit = transaction.type === 'deposit';
            const amount = Math.abs(transaction.amount);
            
            return (
              <View
                key={transaction.id}
                style={[styles.transactionCard, { backgroundColor: cardColor }]}
              >
                <View style={[
                  styles.transactionIcon,
                  { 
                    backgroundColor: isWin ? 'rgba(22, 163, 74, 0.1)' : 
                                     isDeposit ? 'rgba(255, 215, 0, 0.1)' : 
                                     'rgba(239, 68, 68, 0.1)'
                  }
                ]}>
                  <Icon 
                    color={isWin ? colors.green : isDeposit ? colors.gold : colors.red} 
                    size={20} 
                  />
                </View>

                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionGame, { color: textColor }]}>
                    {transaction.game}
                  </Text>
                  <Text style={[styles.transactionDetails, { color: colors.gray }]}>
                    {transaction.opponent ? `vs ${transaction.opponent}` : transaction.timestamp}
                  </Text>
                </View>

                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.transactionAmountText,
                    { 
                      color: isWin ? colors.green : 
                             isDeposit ? colors.gold : 
                             colors.red 
                    }
                  ]}>
                    {isWin || isDeposit ? '+' : ''}{amount} CC
                  </Text>
                  <Text style={[styles.transactionTime, { color: colors.gray }]}>
                    {transaction.timestamp}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Performance Chart Placeholder */}
        <View style={[styles.chartCard, { backgroundColor: cardColor }]}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: textColor }]}>
              Performance ({selectedPeriod})
            </Text>
            <Calendar color={colors.gray} size={16} />
          </View>
          <View style={styles.chartPlaceholder}>
            <TrendingUp color={colors.green} size={32} />
            <Text style={[styles.chartPlaceholderText, { color: colors.gray }]}>
              Graphique de performance
            </Text>
          </View>
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
  balanceCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#121212',
    opacity: 0.8,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  balanceActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#121212',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  transactions: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionGame: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  transactionDetails: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  chartCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  chartPlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
  },
});
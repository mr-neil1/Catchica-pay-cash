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
  Gamepad2, 
  Crown, 
  Dices, 
  Zap,
  Users,
  Clock,
  Trophy,
  Target
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function GamesScreen() {
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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

  const categories = [
    { id: 'all', name: 'Tous', icon: Gamepad2 },
    { id: 'classic', name: 'Classiques', icon: Crown },
    { id: 'quick', name: 'Rapides', icon: Zap },
    { id: 'multiplayer', name: 'Multi', icon: Users },
  ];

  const games = [
    {
      id: 1,
      name: 'Échecs Blitz',
      category: 'classic',
      players: '2',
      duration: '5-10 min',
      minBet: 50,
      maxBet: 500,
      difficulty: 'Moyen',
      online: 156,
      icon: Crown,
      gradient: [colors.purple, '#9333ea'],
    },
    {
      id: 2,
      name: 'Dés Rapides',
      category: 'quick',
      players: '2-6',
      duration: '1-3 min',
      minBet: 10,
      maxBet: 100,
      difficulty: 'Facile',
      online: 89,
      icon: Dices,
      gradient: [colors.blue, '#2563eb'],
    },
    {
      id: 3,
      name: 'Pierre Papier Ciseaux',
      category: 'quick',
      players: '2',
      duration: '30 sec',
      minBet: 5,
      maxBet: 50,
      difficulty: 'Facile',
      online: 234,
      icon: Target,
      gradient: [colors.green, '#15803d'],
    },
    {
      id: 4,
      name: 'Poker Texas Hold\'em',
      category: 'classic',
      players: '2-8',
      duration: '15-30 min',
      minBet: 100,
      maxBet: 1000,
      difficulty: 'Expert',
      online: 67,
      icon: Trophy,
      gradient: [colors.gold, '#e6c200'],
    },
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            Centre de Jeux
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray }]}>
            Choisis ton terrain de bataille
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    { backgroundColor: cardColor },
                    isSelected && styles.categoryItemSelected,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Icon 
                    color={isSelected ? colors.gold : colors.gray} 
                    size={20} 
                  />
                  <Text style={[
                    styles.categoryText,
                    { color: isSelected ? colors.gold : colors.gray }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Games Grid */}
        <View style={styles.gamesGrid}>
          {filteredGames.map((game) => {
            const Icon = game.icon;
            
            return (
              <TouchableOpacity
                key={game.id}
                style={[styles.gameCard, { backgroundColor: cardColor }]}
              >
                <LinearGradient
                  colors={game.gradient}
                  style={styles.gameIcon}
                >
                  <Icon color={colors.white} size={24} />
                </LinearGradient>

                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, { color: textColor }]}>
                    {game.name}
                  </Text>
                  
                  <View style={styles.gameStats}>
                    <View style={styles.gameStat}>
                      <Users color={colors.gray} size={12} />
                      <Text style={[styles.gameStatText, { color: colors.gray }]}>
                        {game.players}
                      </Text>
                    </View>
                    <View style={styles.gameStat}>
                      <Clock color={colors.gray} size={12} />
                      <Text style={[styles.gameStatText, { color: colors.gray }]}>
                        {game.duration}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.gameBetting}>
                    <Text style={[styles.betRange, { color: colors.green }]}>
                      {game.minBet} - {game.maxBet} CC
                    </Text>
                    <Text style={[styles.difficulty, { color: colors.gray }]}>
                      {game.difficulty}
                    </Text>
                  </View>

                  <View style={styles.gameOnline}>
                    <View style={styles.onlineIndicator} />
                    <Text style={[styles.onlineText, { color: colors.gray }]}>
                      {game.online} en ligne
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.playButton}>
                  <LinearGradient
                    colors={[colors.gold, '#e6c200']}
                    style={styles.playButtonGradient}
                  >
                    <Text style={styles.playButtonText}>Jouer</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Create Custom Game */}
        <TouchableOpacity style={[styles.customGameCard, { backgroundColor: cardColor }]}>
          <LinearGradient
            colors={[colors.green, '#15803d']}
            style={styles.customGameIcon}
          >
            <Target color={colors.white} size={24} />
          </LinearGradient>
          <View style={styles.customGameInfo}>
            <Text style={[styles.customGameTitle, { color: textColor }]}>
              Créer un défi personnalisé
            </Text>
            <Text style={[styles.customGameSubtitle, { color: colors.gray }]}>
              Défie tes amis sur n'importe quoi
            </Text>
          </View>
          <View style={styles.customGameArrow}>
            <Text style={[styles.arrowText, { color: colors.green }]}>→</Text>
          </View>
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
  categories: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  categoryItemSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  gamesGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  gameCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  gameStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 6,
  },
  gameStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gameStatText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  gameBetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  betRange: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  difficulty: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  gameOnline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  onlineText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  playButton: {
    marginLeft: 16,
  },
  playButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  playButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  customGameCard: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customGameIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  customGameInfo: {
    flex: 1,
  },
  customGameTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  customGameSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  customGameArrow: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
});
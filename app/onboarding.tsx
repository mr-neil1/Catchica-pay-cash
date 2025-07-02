import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Crown, DollarSign, Gamepad2 } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0));
  const [username, setUsername] = useState('');
  const { theme, setTheme } = useThemeStore();
  const { setUser } = useAuthStore();

  const colors = {
    gold: '#FFD700',
    black: '#121212',
    green: '#16A34A',
    white: '#FFFFFF',
    gray: '#8B8B8B',
  };

  useEffect(() => {
    // Animate logo entrance
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeAnimations: false,
      }),
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 800,
        useNativeAnimations: false,
      }),
    ]).start();
  }, []);

  const handleContinue = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      setUser({
        id: Date.now().toString(),
        username,
        balance: 1000,
        rank: 'Bronze',
        level: 1,
      });
      router.replace('/(tabs)');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <Animated.View
                style={[
                  styles.coinAnimation,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Crown color={colors.gold} size={80} />
              </Animated.View>
            </View>
            <Text style={styles.title}>Catchica Pay Cash</Text>
            <Text style={styles.subtitle}>Parie. Joue. Encaisse.</Text>
            <Text style={styles.description}>
              Rejoins la communauté gaming la plus exclusive. Défie tes amis,
              parie sur tes talents et encaisse tes gains !
            </Text>
          </Animated.View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Choisis ton style</Text>
            <Text style={styles.description}>
              Préfères-tu jouer dans l'ombre ou la lumière ?
            </Text>
            
            <View style={styles.themeSelector}>
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  theme === 'light' && styles.themeOptionSelected,
                ]}
                onPress={() => setTheme('light')}
              >
                <View style={[styles.themePreview, { backgroundColor: colors.white }]}>
                  <View style={[styles.themeDot, { backgroundColor: colors.gold }]} />
                  <View style={[styles.themeDot, { backgroundColor: colors.green }]} />
                </View>
                <Text style={styles.themeLabel}>Lumière</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOption,
                  theme === 'dark' && styles.themeOptionSelected,
                ]}
                onPress={() => setTheme('dark')}
              >
                <View style={[styles.themePreview, { backgroundColor: colors.black }]}>
                  <View style={[styles.themeDot, { backgroundColor: colors.gold }]} />
                  <View style={[styles.themeDot, { backgroundColor: colors.green }]} />
                </View>
                <Text style={styles.themeLabel}>Ombre</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Ton identité de joueur</Text>
            <Text style={styles.description}>
              Choisis un pseudo unique qui impressionnera tes adversaires
            </Text>
            
            <TextInput
              style={styles.usernameInput}
              placeholder="Ton pseudo de légende"
              placeholderTextColor={colors.gray}
              value={username}
              onChangeText={setUsername}
              maxLength={20}
            />
            
            <View style={styles.features}>
              <View style={styles.feature}>
                <DollarSign color={colors.gold} size={24} />
                <Text style={styles.featureText}>1000 crédits offerts</Text>
              </View>
              <View style={styles.feature}>
                <Gamepad2 color={colors.green} size={24} />
                <Text style={styles.featureText}>Accès à tous les jeux</Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={
        theme === 'dark'
          ? [colors.black, '#1a1a1a']
          : [colors.white, '#f8f9fa']
      }
      style={styles.container}
    >
      {renderStep()}

      <View style={styles.bottomContainer}>
        <View style={styles.stepIndicator}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                step >= index && styles.stepDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            step === 2 && !username.trim() && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={step === 2 && !username.trim()}
        >
          <LinearGradient
            colors={[colors.gold, '#e6c200']}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>
              {step === 2 ? 'Commencer à jouer' : 'Continuer'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    marginBottom: 40,
  },
  coinAnimation: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#16A34A',
    textAlign: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8B8B8B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  themeSelector: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  themeOption: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#FFD700',
  },
  themePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  themeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  themeLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#8B8B8B',
  },
  usernameInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 30,
  },
  features: {
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#8B8B8B',
  },
  bottomContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
  },
  stepDotActive: {
    backgroundColor: '#FFD700',
  },
  continueButton: {
    width: width - 40,
    height: 56,
    borderRadius: 12,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
});
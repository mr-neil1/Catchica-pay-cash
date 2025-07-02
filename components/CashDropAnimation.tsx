import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { DollarSign } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface CashDropAnimationProps {
  isVisible: boolean;
  amount?: number;
}

export default function CashDropAnimation({ isVisible, amount = 0 }: CashDropAnimationProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeAnimations: false,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 8,
            useNativeAnimations: false,
          }),
        ]),
        Animated.timing(translateYAnim, {
          toValue: height * 0.6,
          duration: 1000,
          useNativeAnimations: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeAnimations: false,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      translateYAnim.setValue(-50);
      scaleAnim.setValue(0.5);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.cashIcon,
            {
              left: Math.random() * width,
              opacity: fadeAnim,
              transform: [
                { translateY: translateYAnim },
                { scale: scaleAnim },
                { rotate: `${Math.random() * 360}deg` },
              ],
            },
          ]}
        >
          <DollarSign color="#FFD700" size={24} />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1000,
  },
  cashIcon: {
    position: 'absolute',
  },
});
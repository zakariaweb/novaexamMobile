import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const APP_NAME = 'zicoexam';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const logoTranslateY = useRef(new Animated.Value(-100)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const appNameText = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [displayedText, setDisplayedText] = useState('');
  const [tapEnabled, setTapEnabled] = useState(false);
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  // Animate logo slide in + fade in
  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => startTypewriter());
  }, []);

  // Typewriter effect for app name
  const startTypewriter = () => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(APP_NAME.slice(0, i + 1));
      i++;
      if (i === APP_NAME.length) {
        clearInterval(interval);
        startPulse();
        setTapEnabled(true);
      }
    }, 150);
  };

  // Pulse animation for "Tap to Start"
  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // Handle tap to finish splash
  const onTap = () => {
    if (!tapEnabled) return;
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeOutAnim }]}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslateY }],
          },
        ]}
      >
        <View style={styles.logoCircle}>
          {/* Replace this View with your logo image */}
          <Text style={styles.logoText}>🚀</Text>
        </View>
      </Animated.View>
      <Text style={styles.appName}>{displayedText}</Text>
      {tapEnabled && (
        <TouchableOpacity activeOpacity={0.7} onPress={onTap}>
          <Animated.Text
            style={[
              styles.tapText,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            Tap to Start
          </Animated.Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    backgroundColor: '#fff',
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logoText: {
    fontSize: width * 0.15,
  },
  appName: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 40,
  },
  tapText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
});

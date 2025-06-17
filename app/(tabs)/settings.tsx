import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Linking,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATIONS_KEY = '@notifications_enabled';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [language, setLanguage] = useState('English');

  // Simulated user info (replace with real user data)
  const user = {
    name: 'Zakaria Games',
    email: 'zakaria@example.com',
    avatar: 'https://i.pravatar.cc/100?u=zakaria',
  };

  const languages = ['English', 'French', 'Arabic', 'Spanish'];

  // Load notifications setting from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
        if (savedNotifications !== null) {
          setNotificationsEnabled(savedNotifications === 'true');
        }
      } catch (e) {
        console.error('Failed to load notifications setting.', e);
      }
    })();
  }, []);

  const openUpdatesLink = () => {
    Linking.openURL('https://xarohub.vercel.app').catch((err) =>
      console.error('Failed to open page:', err)
    );
  };

  const signOut = () => {
    Alert.alert('Sign Out', 'Sign out clicked (implement real sign out here)');
  };

  const clearCache = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'Cache cleared successfully!');
    } catch (e) {
      Alert.alert('Error', 'Failed to clear cache.');
    }
  };

  // Toggle notifications and save setting
  const toggleNotifications = async () => {
    try {
      const newValue = !notificationsEnabled;
      setNotificationsEnabled(newValue);
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, newValue.toString());
    } catch (e) {
      console.error('Failed to save notifications setting.', e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={[styles.title, isDarkMode ? styles.lightText : styles.darkText]}>Settings</Text>

        {/* Account */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.lightText : styles.darkText]}>Account</Text>
        <View style={[styles.accountCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.accountInfo}>
            <Text style={[styles.userName, isDarkMode ? styles.lightText : styles.darkText]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, isDarkMode ? styles.lightText : styles.darkText]}>
              {user.email}
            </Text>
          </View>
          <TouchableOpacity onPress={signOut} style={styles.signOutButton} activeOpacity={0.7}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Appearance */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.lightText : styles.darkText]}>
          Appearance
        </Text>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDarkMode ? styles.lightText : styles.darkText]}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#007aff' }}
            thumbColor={isDarkMode ? (Platform.OS === 'ios' ? '#fff' : '#007aff') : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={() => setIsDarkMode(!isDarkMode)}
            value={isDarkMode}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDarkMode ? styles.lightText : styles.darkText]}>
            Enable Notifications
          </Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#007aff' }}
            thumbColor={notificationsEnabled ? (Platform.OS === 'ios' ? '#fff' : '#007aff') : '#fff'}
            ios_backgroundColor="#ccc"
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>

        {/* Language Selection */}
        <Text
          style={[
            styles.settingLabel,
            isDarkMode ? styles.lightText : styles.darkText,
            { marginTop: 20, marginBottom: 10 },
          ]}
        >
          Language
        </Text>
        <View style={styles.languageContainer}>
          {languages.map((lang) => {
            const selected = language === lang;
            return (
              <TouchableOpacity
                key={lang}
                onPress={() => setLanguage(lang)}
                style={[
                  styles.languageButton,
                  selected ? styles.selectedLanguageButton : null,
                  isDarkMode ? styles.darkLanguageButton : styles.lightLanguageButton,
                ]}
              >
                <Text
                  style={[
                    styles.languageText,
                    selected ? styles.selectedLanguageText : null,
                    isDarkMode ? styles.lightText : styles.darkText,
                  ]}
                >
                  {lang}
                </Text>
                {selected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Data & Storage */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.lightText : styles.darkText]}>
          Data & Storage
        </Text>
        <TouchableOpacity
          style={[styles.optionButton, isDarkMode ? styles.darkOptionButton : styles.lightOptionButton]}
          onPress={clearCache}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, isDarkMode ? styles.lightText : styles.darkText]}>
            Clear Cache
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, isDarkMode ? styles.darkOptionButton : styles.lightOptionButton]}
          onPress={() => Alert.alert('Manage Downloads', 'Manage downloads clicked')}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, isDarkMode ? styles.lightText : styles.darkText]}>
            Manage Downloads
          </Text>
        </TouchableOpacity>

        {/* Privacy & Security */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.lightText : styles.darkText]}>
          Privacy & Security
        </Text>
        <View
          style={[
            {
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              marginBottom: 10,
              backgroundColor: isDarkMode ? '#2c2c2e' : '#f9f9f9',
            },
          ]}
        >
          <Text style={[{ fontSize: 16, fontStyle: 'italic', color: isDarkMode ? '#8e8e93' : '#6e6e73' }]}>
            Coming Soon
          </Text>
        </View>

        {/* About */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.lightText : styles.darkText]}>
          About
        </Text>
        <TouchableOpacity
          style={[styles.optionButton, isDarkMode ? styles.darkOptionButton : styles.lightOptionButton]}
          onPress={() => setAboutVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, isDarkMode ? styles.lightText : styles.darkText]}>
            About This App
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, isDarkMode ? styles.darkOptionButton : styles.lightOptionButton]}
          onPress={() => Linking.openURL('https://xarohub.vercel.app')}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, isDarkMode ? styles.lightText : styles.darkText]}>
            Check for Updates
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={[styles.versionText, isDarkMode ? styles.lightText : styles.darkText]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>

      {/* About Modal */}
      <Modal visible={aboutVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
            <Image
              source={{
                uri: 'https://your-app-logo-url.com/logo.png',
              }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.aboutTitle, isDarkMode ? styles.lightText : styles.darkText]}>
              YourAppName
            </Text>
            <Text style={[styles.aboutText, isDarkMode ? styles.lightText : styles.darkText]}>
              © 2025 Your Company Name{'\n'}
              All rights reserved.
            </Text>

            <TouchableOpacity
              onPress={() => setAboutVisible(false)}
              style={[styles.closeButton, isDarkMode ? styles.darkCloseButton : styles.lightCloseButton]}
              activeOpacity={0.7}
            >
              <Text style={[styles.closeButtonText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, paddingHorizontal: 20 },
  lightBackground: { backgroundColor: '#fff' },
  darkBackground: { backgroundColor: '#1c1c1e' },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 25 },
  lightText: { color: '#f2f2f7' },
  darkText: { color: '#1c1c1e' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8e8e93',
    marginTop: 30,
    marginBottom: 10,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  lightCard: {
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#2c2c2e',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  accountInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: 14,
    color: '#6e6e73',
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1,
  },
  settingLabel: { fontSize: 18 },
  optionButton: {
    paddingVertical: 15,
    borderBottomColor: '#e5e5ea',
    borderBottomWidth: 1,
  },
  lightOptionButton: { backgroundColor: '#fff' },
  darkOptionButton: { backgroundColor: '#1c1c1e' },
  optionText: { fontSize: 18 },
  versionText: { fontSize: 14, color: '#8e8e93' },
  languageContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c7c7cc',
    marginRight: 12,
    marginBottom: 10,
  },
  selectedLanguageButton: { backgroundColor: '#007aff', borderColor: '#007aff' },
  languageText: { fontSize: 16, fontWeight: '600', color: '#1c1c1e' },
  selectedLanguageText: { color: '#fff' },
  darkLanguageButton: { borderColor: '#5a5a5f' },
  checkmark: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  aboutTitle: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  aboutText: { fontSize: 16, textAlign: 'center', lineHeight: 22 },
  closeButton: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  lightCloseButton: { backgroundColor: '#007aff' },
  darkCloseButton: { backgroundColor: '#0a84ff' },
  closeButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

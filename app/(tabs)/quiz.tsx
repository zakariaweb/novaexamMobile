import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const STORAGE_KEYS = {
  level: 'QUIZ_SELECTED_LEVEL',
  subject: 'QUIZ_SELECTED_SUBJECT',
  lesson: 'QUIZ_SELECTED_LESSON',
};

const levels = ['1BAC', '2BAC'];
const subjects = ['English', 'Math', 'History', 'Physics'];
const lessons = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'];

export default function QuizTabUI() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const [showSummary, setShowSummary] = useState(false);

  // Load saved selections on mount
  useEffect(() => {
    (async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(STORAGE_KEYS.level);
        const savedSubject = await AsyncStorage.getItem(STORAGE_KEYS.subject);
        const savedLesson = await AsyncStorage.getItem(STORAGE_KEYS.lesson);
        if (savedLevel) setSelectedLevel(savedLevel);
        if (savedSubject) setSelectedSubject(savedSubject);
        if (savedLesson) setSelectedLesson(savedLesson);
      } catch (e) {
        console.warn('Failed to load selections', e);
      }
    })();
  }, []);

  // Save selections on change
  useEffect(() => {
    if (selectedLevel) AsyncStorage.setItem(STORAGE_KEYS.level, selectedLevel);
  }, [selectedLevel]);

  useEffect(() => {
    if (selectedSubject) AsyncStorage.setItem(STORAGE_KEYS.subject, selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedLesson) AsyncStorage.setItem(STORAGE_KEYS.lesson, selectedLesson);
  }, [selectedLesson]);

  const renderSelector = (
    title: string,
    data: string[],
    selected: string | null,
    onSelect: (val: string) => void
  ) => (
    <View style={styles.selectorContainer}>
      <Text style={[styles.selectorTitle, { color: colors.text }]}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              {
                backgroundColor:
                  selected === item ? colors.primary : colors.cardBackground,
                borderColor: selected === item ? colors.primary : colors.secondaryText,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                { color: selected === item ? '#fff' : colors.text },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const allSelected = selectedLevel && selectedSubject && selectedLesson;

  if (showSummary) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Your Selections</Text>
          <Text style={[styles.item, { color: colors.text }]}>Level: {selectedLevel || 'N/A'}</Text>
          <Text style={[styles.item, { color: colors.text }]}>Subject: {selectedSubject || 'N/A'}</Text>
          <Text style={[styles.item, { color: colors.text }]}>Lesson: {selectedLesson || 'N/A'}</Text>

          <TouchableOpacity
            style={[styles.goButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowSummary(false)}
            activeOpacity={0.8}
          >
            <Text style={[styles.goButtonText, { color: '#fff' }]}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderSelector('Select Level', levels, selectedLevel, setSelectedLevel)}
        {renderSelector('Select Subject', subjects, selectedSubject, setSelectedSubject)}
        {renderSelector('Select Lesson', lessons, selectedLesson, setSelectedLesson)}

        <TouchableOpacity
          style={[
            styles.goButton,
            {
              backgroundColor: allSelected ? colors.primary : colors.secondaryText,
            },
          ]}
          disabled={!allSelected}
          onPress={() => setShowSummary(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.goButtonText, { color: allSelected ? '#fff' : '#ccc' }]}>
            Go
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    padding: 20,
  },
  selectorContainer: {
    marginBottom: 30,
  },
  selectorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  goButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  goButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  item: {
    fontSize: 22,
    marginVertical: 8,
  },
});

// app/(tabs)/subjects.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

const levels = ['1bac', '2bac'];
const subjectsByLevel: Record<string, string[]> = {
  '1bac': [
    'English',
    'French',
    'Arabic',
    'Math',
    'SVT',
    'Physique',
    'Philosophy',
    'HistoryAndGeography',
    'IslamicEducation',
  ],
  '2bac': [
    'English',
    'French',
    'Arabic',
    'Math',
    'SVT',
    'Physique',
    'Philosophy',
    'IslamicEducation',
  ],
};

const pdfCount = 5;
const baseUrl = 'https://nflfmetecmieafgpmwre.supabase.co/storage/v1/object/public/zicoexampdf/mobile/pdf';

export default function SubjectsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];

  const [level, setLevel] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [tab, setTab] = useState<'lessons' | 'exams'>('lessons');
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const back = () => {
    if (selectedPdf) setSelectedPdf(null);
    else if (subject) setSubject(null);
    else if (level) setLevel(null);
  };

  const generateUrls = (): string[] => {
    if (!level || !subject) return [];
    return Array.from({ length: pdfCount }, (_, i) =>
      `${baseUrl}/${level}/${subject}/${tab}/pdf${i + 1}.pdf`
    );
  };

  const urls = generateUrls();

  if (selectedPdf) {
    return (
      <SafeAreaView style={[styles.pdfContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          onPress={back}
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <WebView
  source={{
    uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(selectedPdf)}`
  }}
  style={styles.webview}
  startInLoadingState
  scalesPageToFit={true}
/>

      </SafeAreaView>
    );
  }

  if (subject) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={back} style={styles.backButtonSimple} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.header, { color: colors.text }]}>Subject: {subject}</Text>

        <View style={styles.tabs}>
          {['lessons', 'exams'].map((t) => {
            const isActive = tab === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.tabBtn, isActive && { backgroundColor: colors.primary }]}
                onPress={() => setTab(t as 'lessons' | 'exams')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? '#fff' : colors.text, fontWeight: isActive ? '700' : '600' },
                  ]}
                >
                  {t.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {urls.map((u, i) => (
            <TouchableOpacity
              key={u}
              style={[styles.card, { backgroundColor: colors.card }]}
              onPress={() => setSelectedPdf(u)}
              activeOpacity={0.8}
            >
              <Ionicons name="document-text-outline" size={20} color={colors.text} />
              <Text style={[styles.cardText, { color: colors.text }]}>pdf{i + 1}.pdf</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (level) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={back} style={styles.backButtonSimple} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.header, { color: colors.text }]}>Select Subject</Text>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {subjectsByLevel[level].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.card, { backgroundColor: colors.card }]}
              onPress={() => setSubject(s)}
              activeOpacity={0.8}
            >
              <Ionicons name="book-outline" size={20} color={colors.text} />
              <Text style={[styles.cardText, { color: colors.text }]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <Text style={[styles.header, { color: colors.text, marginBottom: 20 }]}>Choose Level</Text>
      {levels.map((lvl) => (
        <TouchableOpacity
          key={lvl}
          style={[styles.levelBtn, { backgroundColor: colors.primary }]}
          onPress={() => setLevel(lvl)}
          activeOpacity={0.8}
        >
          <Text style={[styles.levelText, { color: '#fff' }]}>{lvl.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  tabs: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  tabText: {
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginVertical: 5,
    elevation: 2,
  },
  cardText: { marginLeft: 10, fontSize: 16, fontWeight: '500' },
  backButtonSimple: {
    position: 'absolute',
    left: 16,
    top: 60,
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 7,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 16,
  },
  levelBtn: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pdfContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: 60, // space for back button
    width,
    height: height - 60,
  },
});

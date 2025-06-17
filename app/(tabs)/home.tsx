import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const newsData = [
  {
    id: '1',
    title: 'New Subjects Released!',
    description: 'Explore the latest subjects added to your curriculum.',
  },
  {
    id: '2',
    title: 'App Update v2.0',
    description: "We've made big changes to the app. Check out what's new in version 2.0.",
  },
  // Add more news objects here
];

// Dummy function for greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container]}>
        <View style={styles.headerContainer}>
          <Image
            // Put your logo file here, for example:
            // source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.greeting, { color: colors.text }]}>
            {getGreeting()}, Welcome!
          </Text>
          <TouchableOpacity style={styles.profileIcon} activeOpacity={0.7}>
            <Ionicons name="person-circle-outline" size={40} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.subHeader, { color: colors.text }]}>
          Latest News & Updates
        </Text>

        <ScrollView contentContainerStyle={styles.newsList} showsVerticalScrollIndicator={false}>
          {newsData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: colors.card }]}
              activeOpacity={0.8}
              onPress={() => {
                // Add your onPress handler here
              }}
            >
              {/* If you want images for news, add item.image source, else remove Image component */}
              {/* <Image source={item.image} style={styles.cardImage} /> */}
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.cardDescription, { color: colors.text }]}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    flexShrink: 1,
    flexGrow: 1,
    marginRight: 10,
    flexWrap: 'wrap',
  },
  profileIcon: {
    marginLeft: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  newsList: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardContent: {},
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

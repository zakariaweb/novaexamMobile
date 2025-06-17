import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.background },
          headerShown: false,  // <-- hide the top header bar here
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home';

            if (route.name === 'home') iconName = 'home-outline';
            else if (route.name === 'subjects') iconName = 'book-outline';
            else if (route.name === 'quiz') iconName = 'school-outline';
            else if (route.name === 'settings') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="subjects" options={{ title: 'Subjects' }} />
        <Tabs.Screen name="quiz" options={{ title: 'Quiz' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      </Tabs>
    </SafeAreaProvider>
  );
}

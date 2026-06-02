import { Tabs } from "expo-router";
import StackAwareTabBar from "@/components/index";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs 
      tabBar={(props) => <StackAwareTabBar {...(props as any)} />}
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: { position: 'absolute', backgroundColor: 'transparent', borderTopWidth: 0, elevation: 0 },
        sceneStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Início",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="add" 
        options={{ 
          title: "Adicionar",
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="favorites" 
        options={{ 
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}

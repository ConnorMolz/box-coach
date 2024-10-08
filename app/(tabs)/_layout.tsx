import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router"
import React from "react";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false, 
            tabBarActiveTintColor: "#3b82f6",
            tabBarInactiveTintColor: "#FFFFFF",
            tabBarStyle: {backgroundColor: "#111827"},
        }}>
            <Tabs.Screen 
                name="index" 
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                    }} />
            <Tabs.Screen 
                name="combos" 
                options={{
                    tabBarLabel: "Combos",
                    tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
                    }} />
            
            
        </Tabs>
    );}
export default TabsLayout;
// App.js
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenerScreen from './src/screens/ScreenerScreen';
import SimulatorScreen from './src/screens/SimulatorScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Screener');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentTab === 'Screener' ? <ScreenerScreen /> : <SimulatorScreen />}
      </View>
      
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentTab('Screener')}>
          <Ionicons name="search" size={24} color={currentTab === 'Screener' ? '#007AFF' : '#6c757d'} />
          <Text style={[styles.navText, currentTab === 'Screener' && styles.activeNavText]}>智慧選股</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentTab('Simulator')}>
          <Ionicons name="calculator" size={24} color={currentTab === 'Simulator' ? '#007AFF' : '#6c757d'} />
          <Text style={[styles.navText, currentTab === 'Simulator' && styles.activeNavText]}>資產試算</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1 },
  navBar: { flexDirection: 'row', height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e9ecef', justifyContent: 'around' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 12, color: '#6c757d', marginTop: 2 },
  activeNavText: { color: '#007AFF', fontWeight: 'bold' }
});


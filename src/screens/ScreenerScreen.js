// src/screens/ScreenerScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_ETFS = [
  { id: '1', code: '0050', name: '元大台灣50', type: '市值型', expense: '0.46%', yield: '3.5%' },
  { id: '2', code: '00878', name: '國泰永續高股息', type: '高股息', expense: '0.51%', yield: '6.2%' },
  { id: '3', code: '00929', name: '復華台灣科技優息', type: '科技高股息', expense: '0.57%', yield: '7.8%' },
  { id: '4', code: '006208', name: '富邦台50', type: '市值型', expense: '0.24%', yield: '3.6%' },
];

export default function ScreenerScreen({ onSelectETF }) {
  const [selectedTab, setSelectedTab] = useState('全部');

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>大數據 ETF 智慧選股</Text>
      
      <View style={styles.tabContainer}>
        {['全部', '市值型', '高股息', '科技高股息'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={MOCK_ETFS.filter(item => selectedTab === '全部' || item.type === selectedTab)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.etfName}>{item.code} {item.name}</Text>
              <Text style={styles.etfDetails}>內扣費用: {item.expense} | 預估殖利率: {item.yield}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => alert(`已加入 ${item.code} 追蹤清單！`)}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  tabContainer: { flexDirection: 'row', marginBottom: 12 },
  tabButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#e9ecef', borderRadius: 20, marginRight: 8 },
  activeTab: { backgroundColor: '#007AFF' },
  tabText: { color: '#495057', fontSize: 14 },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  etfName: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  etfDetails: { fontSize: 12, color: '#6c757d', marginTop: 4 },
  addButton: { backgroundColor: '#28a745', padding: 8, borderRadius: 8 }
});


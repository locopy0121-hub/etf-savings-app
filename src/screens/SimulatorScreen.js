// src/screens/SimulatorScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { calculateETFGrowth } from '../utils/calculator';

export default function SimulatorScreen() {
  const [amount, setAmount] = useState('10000');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const res = calculateETFGrowth({
      monthlyAmount: parseFloat(amount) || 0,
      years: parseInt(years) || 1,
      expectedReturnRate: 0.08, // 假設 8% 報酬率
      expenseRatio: 0.004       // 內扣 0.4%
    });
    setResult(res);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>定期定額複利成長試算</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>每月定期定額金額 (TWD)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>投資年限 (年)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={years} onChangeText={setYears} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>開始試算 (自動扣除內扣費用)</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>試算結果摘要</Text>
          <Text style={styles.resultText}>投入本金總額：$ {result.totalPrincipal.toLocaleString()}</Text>
          <Text style={styles.resultText}>預估資產總值：$ {result.finalAsset.toLocaleString()}</Text>
          <Text style={styles.resultProfit}>預估淨收益：+ $ {result.totalProfit.toLocaleString()}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: '#495057', marginBottom: 4 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ced4da', fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginTop: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  resultTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  resultText: { fontSize: 14, color: '#495057', marginBottom: 6 },
  resultProfit: { fontSize: 16, fontWeight: 'bold', color: '#28a745', marginTop: 6 }
});


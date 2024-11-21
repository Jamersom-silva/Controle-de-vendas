import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Defs, Line, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const RelatoriosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios de Vendas</Text>
      
      <Text style={styles.chartTitle}>Vendas por Mês</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      
      <Text style={styles.chartTitle}>Vendas por Produto</Text>
      <BarChart
        data={{
          labels: ['Produto 1', 'Produto 2', 'Produto 3'],
          datasets: [
            {
              data: [50, 80, 40],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#43a047',
          backgroundGradientTo: '#66bb6a',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default RelatoriosScreen;

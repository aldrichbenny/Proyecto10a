import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useSolicitudData from '../utils/useSolicitudData';

const screenWidth = Dimensions.get('window').width;
const BASE_URL = 'http://172.18.2.162:8000/api';

const AdminScreen = () => {
  const areas = useSolicitudData();
  const [chartData, setChartData] = useState(null);
  const [viewMode, setViewMode] = useState('daily');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => (currentYear - 2 + i).toString());

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Solicitud/`);
        const solicitudes = response.data;

        if (viewMode === 'daily') {
          const daysCount = {};

          solicitudes.forEach((solicitud) => {
            const fecha = new Date(solicitud.fecha_registro);
            const dateKey = fecha.toISOString().split('T')[0];
            daysCount[dateKey] = (daysCount[dateKey] || 0) + 1;
          });

          const sortedDates = Object.keys(daysCount).sort();
          const sortedData = sortedDates.map(date => daysCount[date]);

          setChartData({
            labels: sortedDates.slice(-7).map(date => {
              const d = new Date(date);
              return `${d.getDate()}/${d.getMonth() + 1}`;
            }),
            datasets: [{ data: sortedData.slice(-7) }],
          });
        } else {
          const monthsCount = Array(12).fill(0);

          solicitudes.forEach((solicitud) => {
            const fecha = new Date(solicitud.fecha_registro);
            const month = fecha.getMonth();
            const year = fecha.getFullYear();

            if (year.toString() === selectedYear) {
              monthsCount[month]++;
            }
          });

          setChartData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{ data: monthsCount }],
          });
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };

    fetchChartData();
  }, [viewMode, selectedYear]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="view-dashboard" size={28} color="white" style={styles.icon} />
        <Text style={styles.title}>Admin Dashboard</Text>
      </View>

      {/* Table */}
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>Area</Text>
            <Text style={styles.cellHeader}>Pending</Text>
            <Text style={styles.cellHeader}>Accepted</Text>
            <Text style={styles.cellHeader}>Finished</Text>
          </View>

          {areas.map((area, index) => (
            <View key={index} style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
              <Text style={styles.cell}>{area.nombre}</Text>
              <View style={styles.cellWithBar}>
                <Text style={[styles.count, styles.pending]}>{area.pendientes}</Text>
              </View>
              <View style={styles.cellWithBar}>
                <Text style={[styles.count, styles.accepted]}>{area.aceptadas}</Text>
              </View>
              <View style={styles.cellWithBar}>
                <Text style={[styles.count, styles.finished]}>{area.terminadas}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {viewMode === 'daily' ? 'Daily Requests (Last 7 Days)' : `Monthly Requests (${selectedYear})`}
        </Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, viewMode === 'daily' && styles.activeToggle]}
            onPress={() => setViewMode('daily')}
          >
            <Text style={[styles.toggleText, viewMode === 'daily' && styles.activeToggleText]}>Daily</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, viewMode === 'monthly' && styles.activeToggle]}
            onPress={() => setViewMode('monthly')}
          >
            <Text style={[styles.toggleText, viewMode === 'monthly' && styles.activeToggleText]}>Monthly</Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'monthly' && (
          <View style={styles.yearPickerContainer}>
            <RNPickerSelect
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
              items={years.map(y => ({ label: y, value: y }))}
              style={pickerSelectStyles}
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        )}

        {/* Chart */}
        {chartData ? (
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(169, 68, 66, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#A94442',
                },
                barPercentage: 0.7,
                propsForBackgroundLines: {
                  strokeWidth: 0.5,
                  strokeDasharray: '',
                  stroke: '#e0e0e0',
                },
                fillShadowGradient: '#A94442',
                fillShadowGradientOpacity: 1,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                paddingRight: 20,
              }}
              verticalLabelRotation={viewMode === 'daily' ? 0 : 45}
            />
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading chart data...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#A94442',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#A94442',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A94442',
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#A94442',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowOdd: {
    backgroundColor: 'white',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  cell: {
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  cellWithBar: {
    flex: 1,
    alignItems: 'center',
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pending: {
    color: '#FFA726', // Orange for pending
  },
  accepted: {
    color: '#42A5F5', // Blue for accepted
  },
  finished: {
    color: '#66BB6A', // Green for finished
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#A94442',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeToggleText: {
    color: 'white',
  },
  yearPickerContainer: {
    marginVertical: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
});

export default AdminScreen;
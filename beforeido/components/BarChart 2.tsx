import {View, Text, useWindowDimensions} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

//make a double bar graph 
const BarChart = () => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <Text>Bar Chart</Text>
      <BarChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
            },
            {
              data: [30, 20, 60, 40, 70, 30],
            },
          ],
        }}
        width={width}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
    </View>
  );
}

export default BarChart;

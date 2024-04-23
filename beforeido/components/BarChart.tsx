import React from 'react';
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from "victory-native";

const data = {
  planned: [null, {x: 'Week 2', y:20}],
  actual: [
    {x: 'Week 1', y: 10},
    {x: 'Week 2', y: 20},
  ],
};

const BarChart = () => {
  return (
    <View>
        <VictoryChart>
            <VictoryGroup offset={20}>
                <VictoryBar
                    data={data.planned}
                    style={{ data: { fill: "tomato" } }}
                />
                <VictoryBar
                    data={data.actual}
                    style={{ data: { fill: "blue" } }}
                />
            </VictoryGroup>
            {/* <VictoryLegend data={data} /> */}
        </VictoryChart>
    </View>
  );
};

export default BarChart;

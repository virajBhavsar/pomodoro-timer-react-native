import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workTime: 25,
      breakTime: 5,
      longBreakTime: 10,
      status: 25,
      minute: 25,
      seconds: 2,
      carry: null,
    };
  }
  timer;

  handleStart = () => {
    let sec = this.state.seconds;
    let car = this.state.carry;
    let min = this.state.minute;

    this.timer = setInterval(() => {
      sec = this.state.seconds - 1;

      if (sec <= -1) {
        sec = 59;
        min = this.state.minute - 1;
        this.setState({
          minute: min,
        });
      }

      if (sec < 10) {
        car = 0;
      } else {
        car = null;
      }

      this.setState({
        seconds: sec,
        carry: car,
      });
    }, 1000);
  };
  handleStop = () => {
    clearInterval(this.timer);
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({
      minute: this.state.status, // this has to change after implementation of mode change
      seconds: 0,
      carry: 0,
    });
  };

  timeSeter = (mode) => {
    clearInterval(this.timer);
    this.setState({
      minute: mode,
      status: mode,
      seconds: 0,
      carry: 0,
    });
  };

  setWorkTime = () => {
    this.timeSeter(this.state.workTime);
  };
  setBreakTime = () => {
    this.timeSeter(this.state.breakTime);
  };
  setLongBreakTime = () => {
    this.timeSeter(this.state.longBreakTime);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btns}>
          <Button onPress={this.setWorkTime} title="work time"></Button>
          <Button onPress={this.setBreakTime} title="break time"></Button>
          <Button
            onPress={this.setLongBreakTime}
            title="long break time"
          ></Button>
        </View>
        <View style={styles.time}>
          <Text style={styles.timeUnit}>
            {this.state.minute}:{this.state.carry}
            {this.state.seconds}
          </Text>
        </View>
        <View style={styles.btns}>
          <Button onPress={this.handleStart} title="start"></Button>
          <Button onPress={this.handleStop} title="stop"></Button>
          <Button onPress={this.handleReset} title="reset"></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  timeUnit: {
    fontSize: 48,
  },
  btns: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
  },
});

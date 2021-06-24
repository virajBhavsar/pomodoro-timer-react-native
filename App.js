import React from "react";
import { StyleSheet, View, Text, Button, Vibration } from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workTime: 25,
      breakTime: 5,
      longBreakTime: 10,
      status: 25,
      minute: 0,
      seconds: 2,
      carry: 0,
      started: false,
      stopped: true,
    };
  }
  timer;

  handleStart = () => {
    this.setState({
      started: true,
      stopped: false,
    });
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
      if ((min <= 0) & (sec <= 0)) {
        clearInterval(this.timer);
        this.vibrateAlert();
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
    if ((this.state.seconds <= 0) & (this.state.minute <= 0)) {
      this.setState({
        minute: this.state.status,
        seconds: 0,
        carry: 0,
      });
    }
    this.setState({
      started: false,
      stopped: true,
    });
    clearInterval(this.timer);
    Vibration.cancel();
  };

  handleReset = () => {
    this.handleStop();
    this.setState({
      minute: this.state.status,
      seconds: 0,
      carry: 0,
    });
  };

  timeSeter = (mode) => {
    this.handleStop();
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

  vibrateAlert = () => {
    Vibration.vibrate([2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]);
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
          <Button
            disabled={this.state.started}
            onPress={this.handleStart}
            title="start"
          ></Button>
          <Button
            disabled={this.state.stopped}
            onPress={this.handleStop}
            title="stop"
          ></Button>
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

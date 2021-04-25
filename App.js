import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Map from "./components/map";
import Weather from "./components/weather";
import Currency from "./components/currency";

export class App extends Component {
  state = {
    location: { coords: { longitude: 0, latitude: 0 } },
  };
  componentDidMount() {
    this.findCurrentLoaction();
  }
  findCurrentLoaction = async () => {
    let { status } = await Permissions.askAsync(
      Permissions.LOCATION_FOREGROUND
    );
    if (status !== "granted") {
      this.setState({ location: "error" });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  render() {
    let longitude = this.state.location.coords.longitude;
    let latitude = this.state.location.coords.latitude;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Map latitude={latitude} longitude={longitude} />
          <Weather lat={latitude} lon={longitude} />
          <Currency />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});

export default App;

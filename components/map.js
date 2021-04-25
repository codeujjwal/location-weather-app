import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export class Map extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker
            coordinate={{
              latitude: this.props.latitude,
              longitude: this.props.longitude,
            }}
            pinColor="red"
            title="Your Location"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 300,
    margin: 20,
    marginTop: 60,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    elevation: 6,
  },
  map: {
    flex: 1,
  },
});
export default Map;

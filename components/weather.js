import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import axios from "axios";

function weather({ lat, lon }) {
  const [data, setData] = useState([]);
  const [temprature, setTemp] = useState();
  const [iconcode, setIconcode] = useState();
  const [times, setTimes] = useState(3);
  useEffect(() => {
    async function search() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=b88d740c80936e4675429dd14a0d7770&units=metric`
        )
        .then((res) => {
          setData(res.data.daily);
          setTemp(res.data.current);
          setIconcode(res.data.current.weather[0].icon);
        });
    }
    search();
  }, []);

  const dateconverter = (unix) => {
    const date = new Date(unix * 1000);
    return date.toLocaleDateString();
  };
  let weatherarr = [];
  for (var i = 0; i < times; i++) {
    weatherarr.push(
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.data}>
          {dateconverter(data[i]?.dt)}
          {"    "}
        </Text>
        <Image
          source={{
            uri:
              "http://openweathermap.org/img/w/" +
              data[i]?.weather[0].icon +
              ".png",
          }}
          style={styles.icons}
        />
        <Text style={styles.data}>
          {Math.round(data[i]?.temp.min)}/{Math.round(data[i]?.temp.max)}&deg;C
          {"    "}
        </Text>
        <Text style={styles.data}>{data[i]?.weather[0].description}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dateconverter(temprature?.dt)}</Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: "http://openweathermap.org/img/w/" + iconcode + ".png",
          }}
          style={styles.icon_main}
        />
        <Text style={styles.temprature}>
          {Math.round(temprature?.temp)}&deg;C
        </Text>
      </View>
      <View>{weatherarr}</View>
      <TouchableOpacity style={styles.button} onPress={() => setTimes(6)}>
        <Text>Next 3 days forecast</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "snow",
    width: "90%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 15,
    paddingVertical: 20,
  },
  date: {
    color: "red",
    fontSize: 30,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  button: {
    borderColor: "green",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginVertical: 10,
  },
  temprature: {
    fontSize: 40,
  },
  icon_main: {
    height: 70,
    width: 70,
  },
  icons: {
    width: 40,
    height: 40,
  },
  data: {
    fontSize: 20,
    color: "#556B2F",
  },
});

export default weather;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

function currency() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function search() {
      await axios
        .get(
          "https://v6.exchangerate-api.com/v6/2760543462612fa11550213d/latest/INR"
        )
        .then((res) => {
          setData(res.data.conversion_rates);
        });
    }
    search();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Your Currency : INR (Indian Rupee)</Text>
      <View style={styles.field_container}>
        <Text style={styles.heading}>Currency</Text>
        <Text style={styles.heading}>Price</Text>
      </View>
      <View style={styles.field_container}>
        <Text style={styles.value}>USD</Text>
        <Text style={styles.value}>{data.USD}</Text>
      </View>
      <View style={styles.field_container}>
        <Text style={styles.value}>EUR</Text>
        <Text style={styles.value}>{data.EUR}</Text>
      </View>
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
    marginVertical: 20,
    paddingVertical: 20,
  },
  field_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    borderColor: "gray",
    borderBottomWidth: 0.5,
  },
  heading: {
    fontSize: 30,
  },
  value: {
    fontSize: 25,
    color: "#556B2F",
  },
});
export default currency;

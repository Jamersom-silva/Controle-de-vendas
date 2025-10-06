import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }: { title: string }) {
return ( <View style={styles.header}> <Text style={styles.title}>{title}</Text> </View>
);
}

const styles = StyleSheet.create({
header: {
paddingTop: 50,
paddingBottom: 15,
backgroundColor: "#2563eb",
alignItems: "center",
},
title: {
color: "#fff",
fontSize: 18,
fontWeight: "bold",
},
});

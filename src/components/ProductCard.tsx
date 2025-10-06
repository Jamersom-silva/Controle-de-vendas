import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Product } from "../context/StockContext";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.quantity}>Quantidade: {product.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  name: {
    fontWeight: "bold",
  },
  quantity: {
    marginTop: 4,
  },
});

export default ProductCard;

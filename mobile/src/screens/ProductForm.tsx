import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { createProduct, updateProduct } from '../db';
export default function ProductForm({ route, navigation }: any) {
  const product = route?.params?.product;
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(String(product?.price ?? ''));
  const [stock, setStock] = useState(String(product?.stock ?? ''));
  const save = async () => {
    const p = { name, price: parseFloat(price) || 0, stock: parseInt(stock) || 0 };
    if (product) await updateProduct(product.id, p); else await createProduct(p);
    navigation.goBack();
  };
  return (
    <View style={{ padding:16 }}>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{borderWidth:1,padding:8, marginBottom:8}} />
      <TextInput placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" style={{borderWidth:1,padding:8, marginBottom:8}} />
      <TextInput placeholder="Estoque" value={stock} onChangeText={setStock} keyboardType="numeric" style={{borderWidth:1,padding:8, marginBottom:16}} />
      <Button title="Salvar" onPress={save} />
    </View>
  );
}

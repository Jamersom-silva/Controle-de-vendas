import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { listProducts, deleteProduct } from '../db';
export default function ProductsScreen({ navigation }: any) {
  const [products, setProducts] = useState<any[]>([]);
  async function load(){ const p = await listProducts(); setProducts(p); }
  useEffect(()=>{ load(); const unsub = navigation.addListener('focus', load); return unsub; }, []);
  return (
    <View style={{ padding:16 }}>
      <Button title="Novo Produto" onPress={()=> navigation.navigate('ProductForm')} />
      <FlatList data={products} keyExtractor={(i)=>String(i.id)} renderItem={({item})=> (
        <TouchableOpacity style={{padding:12,borderBottomWidth:1}} onPress={()=> navigation.navigate('ProductForm',{ product: item })}>
          <Text>{item.name} — R$ {item.price} — estoque: {item.stock}</Text>
          <Button title="Remover" onPress={async ()=> { await deleteProduct(item.id); load(); }} />
        </TouchableOpacity>
      )} />
    </View>
  );
}

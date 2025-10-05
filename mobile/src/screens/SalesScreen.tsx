import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { listProducts, createSale } from '../db';
export default function SalesScreen({ navigation }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<{product:any,qty:number}[]>([]);
  useEffect(()=>{ (async ()=> setProducts(await listProducts()))(); }, []);
  const add = (p:any) => { const idx = cart.findIndex(c=>c.product.id===p.id); if (idx>=0){ const copy=[...cart]; copy[idx].qty+=1; setCart(copy);} else setCart([...cart,{product:p,qty:1}]); };
  const checkout = async () => { if (cart.length===0){ Alert.alert('Carrinho vazio'); return; } const items = cart.map(c=> ({ product_id: c.product.id, quantity:c.qty, price:c.product.price })); const total = items.reduce((s,i)=>s + i.quantity * i.price, 0); await createSale(total, items); Alert.alert('Sucesso','Venda registrada'); setCart([]); };
  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Produtos</Text>
      <FlatList data={products} keyExtractor={i=>String(i.id)} renderItem={({item})=> (
        <View style={{padding:8,borderBottomWidth:1}}>
          <Text>{item.name} — R$ {item.price} — {item.stock} em estoque</Text>
          <Button title="Adicionar" onPress={()=> add(item)} />
        </View>
      )} />
      <View style={{height:12}}/>
      <Text style={{fontSize:16}}>Carrinho</Text>
      <FlatList data={cart} keyExtractor={(c)=>String(c.product.id)} renderItem={({item})=> (<Text>{item.product.name} x {item.qty}</Text>)} />
      <View style={{height:8}}/>
      <Button title="Finalizar Venda" onPress={checkout} />
    </View>
  );
}

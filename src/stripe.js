import { loadStripe } from '@stripe/stripe-react-native';

export const initializeStripe = async () => {
  const stripe = await loadStripe('sua-chave-publica');
  return stripe;
};

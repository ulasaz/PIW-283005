export interface CartItem {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
  }
  
  export type CartAction =
    | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'INCREASE_QUANTITY'; payload: string }
    | { type: 'DECREASE_QUANTITY'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_FROM_STORAGE'; payload: CartItem[] };
  
  export const initialCartState: CartState = {
    items: [],
  };
  
  export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case 'ADD_TO_CART': {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
  
      case 'REMOVE_FROM_CART':
        return {
          items: state.items.filter((item) => item.id !== action.payload),
        };
  
      case 'INCREASE_QUANTITY':
        return {
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
  
      case 'DECREASE_QUANTITY':
        return {
          items: state.items.map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
  
      case 'CLEAR_CART':
        return { items: [] };
  
      case 'LOAD_FROM_STORAGE':
        return { items: action.payload };
  
      default:
        return state;
    }
  }
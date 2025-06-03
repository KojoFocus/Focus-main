// src/utils/firebaseCart.ts
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust the path as needed

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  alt: string;
  quantity: number;
};

/**
 * Save the user's cart to Firestore
 */
export const saveCartToFirebase = async (
  userId: string,
  cartItems: CartItem[]
) => {
  try {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, { cart: cartItems });
  } catch (error) {
    console.error("Error saving cart to Firebase:", error);
  }
};

/**
 * Get the user's cart from Firestore
 */
export const getCartFromFirebase = async (
  userId: string
): Promise<CartItem[]> => {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      return data.cart as CartItem[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching cart from Firebase:", error);
    return [];
  }
};

/**
 * Clear the user's cart in Firestore after checkout
 */
export const clearCartInFirebase = async (userId: string) => {
  try {
    const cartRef = doc(db, "carts", userId);
    await deleteDoc(cartRef);
  } catch (error) {
    console.error("Error clearing cart in Firebase:", error);
  }
};

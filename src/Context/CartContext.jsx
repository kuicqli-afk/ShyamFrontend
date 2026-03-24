import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

// ✅ Same title + same restaurant => same key
const getCartKey = (item) => {
  const title = (item?.title || "").trim().toLowerCase();
  const rest = item?.restaurantId ?? "no_rest";
  return `${title}__${rest}`;
};

// ✅ migrate old items (without key) + merge duplicates by key
const normalizeCart = (arr) => {
  const map = new Map();
  (arr || []).forEach((x) => {
    const key =
      x.key ||
      `${(x.title || "").trim().toLowerCase()}__${x.restaurantId ?? "no_rest"}`;

    const prev = map.get(key);
    if (prev) {
      map.set(key, { ...prev, quantity: (prev.quantity || 0) + (x.quantity || 0) });
    } else {
      map.set(key, { ...x, key, quantity: x.quantity || 1 });
    }
  });
  return Array.from(map.values());
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart_items");
      const parsed = saved ? JSON.parse(saved) : [];
      return normalizeCart(parsed);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

 
  const addToCart = (item, delta = 1) => {
    const key = getCartKey(item);

    setCartItems((prev) => {
      const exist = prev.find((x) => x.key === key);

      if (exist) {
        return prev.map((x) =>
          x.key === key ? { ...x, quantity: (x.quantity || 0) + delta } : x
        );
      }

      return [
        ...prev,
        {
          key,
          id: item.id, // optional
          title: item.title,
          price: item.price,
          images: item.images,
          restaurantId: item.restaurantId,
          type: item.type,
          portion: item.portion,
          desc: item.desc,
          quantity: delta,
        },
      ];
    });
  };


  const setItemQty = (item, quantity) => {
    const key = getCartKey(item);
    const qty = Math.max(1, Number(quantity) || 1);

    setCartItems((prev) => {
      const exist = prev.find((x) => x.key === key);

      if (exist) {
        return prev.map((x) => (x.key === key ? { ...x, quantity: qty } : x));
      }

      return [
        ...prev,
        {
          key,
          id: item.id,
          title: item.title,
          price: item.price,
          images: item.images,
          restaurantId: item.restaurantId,
          type: item.type,
          portion: item.portion,
          desc: item.desc,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((x) => x.key !== key));
  };


  const updateQty = (key, quantity) => {
    setCartItems((prev) => {
      const qty = Number(quantity) || 0;
      if (qty <= 0) return prev.filter((x) => x.key !== key);
      return prev.map((x) => (x.key === key ? { ...x, quantity: qty } : x));
    });
  };

  const clearCart = () => setCartItems([]);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, x) => sum + x.price * x.quantity, 0);
    return { subtotal };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,     // delta add
        setItemQty,    // absolute set ✅
        removeFromCart,
        updateQty,
        clearCart,
        totals,
        getCartKey,    // helpful for components
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};

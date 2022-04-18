import React, { createContext, useState } from "react";

export const BetaTestContextStore = createContext("");

export default function BetaTestContextProvider(props) {
  const [initialValue, setInitialValue] = useState({
    author: { id: null, name: null },
    commentCount: null,
    content: null,
    desc: null,
    id: null,
    imageURL: null,
    reviewCount: null,
    time: null,
    title: null,
  });
  const info = { initialValue, setInitialValue };
  return (
    <BetaTestContextStore.Provider value={info}>
      {props.children}
    </BetaTestContextStore.Provider>
  );
}

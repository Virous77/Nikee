import { useState } from "react";

const useProducts = () => {
  const [show, setShow] = useState("");

  return { show, setShow };
};

export default useProducts;

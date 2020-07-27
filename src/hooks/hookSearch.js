import { useState, useEffect, useContext } from "react";
import { urlPistachioV1Products } from "../utils/constants";
import { store } from "../store";

export default function UseFecth() {
  const { state } = useContext(store);  
  const { page, perPage, filterName, selectedCats } = state;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const url = `${urlPistachioV1Products}/?page=${page}&per_page=${perPage}${filterName ? "&" + filterName : ""}${selectedCats && selectedCats.length > 0 ? "&" + selectedCats.join(",") : ""}`;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setResult(await response.json());
        } else {
          setError(response);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    })();
  }, [url]);

  return { loading, result, error };
}

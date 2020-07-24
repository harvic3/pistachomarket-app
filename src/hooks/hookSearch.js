import { useState, useEffect } from "react";
import { urlPistachioV1Products } from "../utils/constants";

export default function UseFecth(page, perPage, filterName, categories) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const url = `${urlPistachioV1Products}/?page=${page}&per_page=${perPage}${filterName ? "&" + filterName : ""}${categories && categories.length > 0 ? "&" + categories.join(",") : ""}`;

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

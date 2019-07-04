
//not currently using this file as the implementation from
//react-use is being used in FetchMultipleResourceAtOnce

import React, { useState, useEffect } from "react";
//import { getResource } from "../SideEffects/io/getResource";

export function useAsync(getMethod, params) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getResource() {
    try {
      setLoading(true);
      const result = await getMethod(...params);
      setValue(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getResource();
  }, params);

  return { value, error, loading };
}

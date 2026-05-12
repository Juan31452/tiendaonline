/**
 * Devuelve SIEMPRE un array plano de elementos, independientemente de la estructura
 * de la respuesta del backend (objeto único, envuelto en propiedad, o array directo).
 * 
 * @param data - Datos provenientes de la API o una variable desconocida.
 * @returns Un array plano de tipo T.
 */
const toArray = <T = any>(data: any): T[] => {
  if (Array.isArray(data)) return data as T[];           // [ {...} ]

  if (Array.isArray(data?.productos)) return data.productos as T[]; // { productos:[...] }
  if (Array.isArray(data?.docs))      return data.docs as T[];      // { docs:[...] }

  // Endpoint por ID: { producto:{...} } o { product:{...} } o { data:{...} }
  const single = data?.producto ?? data?.product ?? data?.data ?? null;

  if (single) return [single as T];

  return []; // fallback
};

export default toArray;

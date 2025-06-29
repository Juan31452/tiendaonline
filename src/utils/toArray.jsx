// Devuelve SIEMPRE un array plano de productos
const toArray = (data) => {
  if (Array.isArray(data)) return data;                  // [ {...} ]

  if (Array.isArray(data?.productos)) return data.productos; // { productos:[...] }
  if (Array.isArray(data?.docs))      return data.docs;      // { docs:[...] }

  // Endpoint por ID: { producto:{...} } o { product:{...} } o { data:{...} }
  const single =
    data?.producto ?? data?.product ?? data?.data ?? null;

  if (single) return [single];

  return []; // fallback
};

export default toArray;

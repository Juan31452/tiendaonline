export const productStates   = [
    { value: 'Disponible', label: 'Disponible' },
    { value: 'Separado', label: 'Separado' },
    { value: 'Vendido', label: 'Vendido' },
    { value: 'Nuevo', label: 'Nuevo' },
    { value: 'Oferta', label: 'Oferta' },
];

/**
 * Una lista filtrada que solo incluye los estados 'Separado' y 'Vendido'.
 */
export const LIMITED_PRODUCT_STATES = productStates.filter(
    (state) => state.value === 'Separado' || state.value === 'Vendido'
);

/**
 * Una lista filtrada para usuarios no autenticados o sin rol de admin/vendedor.
 * Incluye solo los estados que son visibles para el público general.
 */
export const GUEST_PRODUCT_STATES = productStates.filter((state) =>
    ['Disponible', 'Nuevo', 'Oferta'].includes(state.value)
);

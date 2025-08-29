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


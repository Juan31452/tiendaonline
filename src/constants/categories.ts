export const categories = [
  { id: 'Hombre', name: 'Hombre' },
  { id: 'Mujer', name: 'Mujer' },
  { id: 'Ninos', name: 'Ninos' },
  { id: 'Tecnologia', name: 'Tecnologia' },
  { id: 'Hogar', name: 'Hogar' },
  { id: 'Variedades', name: 'Variedades' },
  { id: 'todos', name: 'Todas' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
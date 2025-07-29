import React from 'react';

type FooterProps = {
  message?: string;
};

const Footer: React.FC<FooterProps> = ({ message }) => (
  <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
    <small>
      {message || `© ${new Date().getFullYear()} Variedades JM. Imágenes de productos cortesía de nuestros proveedores. Todos los derechos pertenecen a sus respectivas marcas.`}
    </small>
  </footer>
);

export default Footer;

// Este componente Footer es un pie de página simple que muestra el año actual y un mensaje de derechos de autor.
// Se utiliza en la parte inferior de la aplicación para proporcionar información adicional o legal.
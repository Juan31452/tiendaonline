import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';

const useConsultas = (categoria) => {
    const [productos, setProductos] = useState([]);
    const [pagination, setPagination] = useState({ 
        totalPages: 1, 
        totalItems: 0,
        currentPage: 1,
        itemsPerPage: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPage = useCallback(async (page = 1) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(ApiRoutes.ConsultaCategoria, {
                params: { 
                    categoria: categoria,
                    page: page
                },
                headers: { Accept: 'application/json' },
            });

            // Asumiendo que tu API devuelve la estructura que mostraste antes
            const data = response.data;
            
            setProductos(toArray(data.productos || data));
            setPagination(data.pagination || {
                totalPages: 1,
                totalItems: data.length || 0,
                currentPage: page,
                itemsPerPage: data.length || 0
            });
            
        } catch (err) {
            console.error('Error al obtener productos:', err);
            setError(err.message || 'Error al cargar productos');
            setProductos([]);
        } finally {
            setLoading(false);
        }
    }, [categoria]); // Dependencia del useCallback

    // Cargar primera página al montar o cambiar categoría
    useEffect(() => {
        fetchPage(1);
    }, [fetchPage]);

    return { 
        productos, 
        pagination, 
        loading, 
        error, 
        fetchPage 
    };
};

export default useConsultas;
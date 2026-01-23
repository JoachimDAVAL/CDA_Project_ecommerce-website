import { useState, useEffect } from 'react';
import type { Model3D } from '../types/model.types';

// URL de votre API backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useModels() {
  const [models, setModels] = useState<Model3D[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/models`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: Model3D[] = await response.json();
        setModels(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des modèles:', err);
        setError(
          err instanceof Error 
            ? err.message 
            : 'Une erreur est survenue lors du chargement des modèles'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []); // [] = exécuté une seule fois au montage

  return { models, loading, error };
}
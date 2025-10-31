import { useState, useEffect } from 'react';
import { supabase, Property } from '../lib/supabase';
import { SearchFilters } from '../components/SearchForm';

export function useProperties(filters?: SearchFilters | null) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        let query = supabase.from('properties').select('*').eq('status', 'available');

        if (filters) {
          query = query
            .gte('price', filters.minPrice)
            .lte('price', filters.maxPrice)
            .gte('area', filters.minArea)
            .lte('area', filters.maxArea);

          if (filters.rooms > 0) {
            query = query.eq('rooms', filters.rooms);
          }
        }

        query = query.order('property_number');

        const { data, error } = await query;
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error('Error:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [filters]);

  return { properties, loading };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('properties').select('*').eq('id', id).maybeSingle();
        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error('Error:', error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProperty();
  }, [id]);

  return { property, loading };
}

import { carsDatabase, getCarById, getCarBySlug, filterCars } from '../data/cars';

const API_BASE = '/api';

export async function fetchCars(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.body) params.append('body', filters.body);
    if (filters.fuel) params.append('fuel', filters.fuel);
    if (filters.transmission) params.append('transmission', filters.transmission);
    if (filters.limit) params.append('limit', String(filters.limit));
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.condition) params.append('condition', filters.condition);
    if (filters.make) params.append('make', filters.make);
    if (filters.model) params.append('model', filters.model);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice));

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/cars${query}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return { data, source: 'postgresql' };
  } catch {
    const localData = filterCars(filters);
    return { data: localData, source: 'fallback' };
  }
}

export async function fetchCarByIdOrSlug(idOrSlug) {
  try {
    const res = await fetch(`${API_BASE}/cars/${idOrSlug}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return { data, source: 'postgresql' };
  } catch {
    const fallback = typeof idOrSlug === 'number' || /^\d+$/.test(idOrSlug)
      ? getCarById(Number(idOrSlug))
      : getCarBySlug(idOrSlug);
    return { data: fallback || null, source: 'fallback' };
  }
}

export async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { online: false };
    const json = await res.json();
    return { online: true, ...json };
  } catch {
    return { online: false };
  }
}

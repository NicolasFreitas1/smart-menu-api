import { Injectable } from '@nestjs/common'

@Injectable()
export class DistanceCalculatorService {
  /**
   * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
   * @param lat1 Latitude do primeiro ponto
   * @param lon1 Longitude do primeiro ponto
   * @param lat2 Latitude do segundo ponto
   * @param lon2 Longitude do segundo ponto
   * @returns Distância em quilômetros
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371 // Raio da Terra em quilômetros
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance
  }

  /**
   * Converte graus para radianos
   * @param degrees Graus
   * @returns Radianos
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  /**
   * Verifica se duas coordenadas estão dentro de um raio específico
   * @param lat1 Latitude do primeiro ponto
   * @param lon1 Longitude do primeiro ponto
   * @param lat2 Latitude do segundo ponto
   * @param lon2 Longitude do segundo ponto
   * @param radiusInKm Raio em quilômetros
   * @returns true se estiver dentro do raio, false caso contrário
   */
  isWithinRadius(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    radiusInKm: number,
  ): boolean {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2)
    return distance <= radiusInKm
  }

  /**
   * Calcula o raio aproximado baseado na latitude (para otimização de consultas)
   * @param latitude Latitude do ponto central
   * @param radiusInKm Raio em quilômetros
   * @returns Objeto com delta de latitude e longitude
   */
  calculateApproximateRadius(latitude: number, radiusInKm: number) {
    const latDelta = radiusInKm / 111.32 // Aproximadamente 111.32 km por grau de latitude
    const lonDelta = radiusInKm / (111.32 * Math.cos(this.toRadians(latitude)))

    return {
      latDelta,
      lonDelta,
    }
  }
} 
import apiService from './api.service';
import { IAllergie, ICreateAllergieDto, IUpdateAllergieDto } from '@/types/allergie.types';

class AllergieService {
  private baseUrl = '/allergies';
  
  // Get all allergies
  public async getAllAllergies(): Promise<IAllergie[]> {
    return apiService.get<IAllergie[]>(this.baseUrl);
  }
  
  // Get allergie by ID
  public async getAllergieById(id: number): Promise<IAllergie> {
    return apiService.get<IAllergie>(`${this.baseUrl}/${id}`);
  }
  
  // Create new allergie
  public async createAllergie(data: ICreateAllergieDto): Promise<IAllergie> {
    return apiService.post<IAllergie>(this.baseUrl, data);
  }
  
  // Update allergie
  public async updateAllergie(id: number, data: IUpdateAllergieDto): Promise<IAllergie> {
    return apiService.put<IAllergie>(`${this.baseUrl}/${id}`, data);
  }
  
  // Delete allergie
  public async deleteAllergie(id: number): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// Create a singleton instance
const allergieService = new AllergieService();
export default allergieService;
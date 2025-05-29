import HealthFacility from '../models/HealthFacility.js';
import { BaseService } from './BaseService.js';

export class HealthFacilityService extends BaseService<any> {
  constructor() {
    super(HealthFacility);
  }
}

export default new HealthFacilityService();
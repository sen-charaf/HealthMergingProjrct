import mongoose from 'mongoose';

export class BaseService<T extends mongoose.Document> {
  protected model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async findAll(populate?: string | string[]): Promise<T[]> {
    try {
      let query = this.model.find();
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  async find(filter: any, populate?: string | string[]): Promise<T[]> {
    try {
      let query = this.model.find(filter);
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, populate?: string | string[]): Promise<T | null> {
    try {
      let query = this.model.findById(id);
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const newEntity = new this.model(data);
      return await newEntity.save();
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  }
}
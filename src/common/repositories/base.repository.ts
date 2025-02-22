import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Transaction, Model, ModelStatic } from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Model) private readonly model: ModelStatic<T>,
  ) {}

  /**
   * Get a new transaction or use an existing one.
   */
  protected async getTransaction(
    transaction?: Transaction,
  ): Promise<Transaction> {
    return transaction ?? (await this.sequelize.transaction());
  }

  /**
   * Find all records.
   */
  async findAll(transaction?: Transaction): Promise<T[]> {
    return this.model.findAll({ transaction });
  }

  /**
   * Find one record by ID.
   */
  async findById(id: number, transaction?: Transaction): Promise<T | null> {
    return this.model.findByPk(id, { transaction });
  }

  /**
   * Create a new record.
   */
  async create(data: Partial<T>, transaction?: Transaction): Promise<T> {
    return this.model.create(data as any, { transaction });
  }

  /**
   * Update a record by ID.
   */
  async update(
    id: number,
    data: Partial<T>,
    transaction?: Transaction,
  ): Promise<[affectedCount: number]> {
    return this.model.update(data as any, {
      where: { id } as any,
      transaction,
    });
  }

  /**
   * Delete a record by ID.
   */
  async delete(id: number, transaction?: Transaction): Promise<number> {
    return this.model.destroy({ where: { id } as any, transaction });
  }

  /**
   * Run queries inside a transaction.
   */
  async runTransaction<T>(
    operation: (transaction: Transaction) => Promise<T>,
  ): Promise<T> {
    const transaction = await this.sequelize.transaction();
    try {
      const result = await operation(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

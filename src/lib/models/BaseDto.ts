export type BaseDto = {
  id: number;
  /**
   * Soft delete timestamp. If set (non-null/non-undefined),
   * the entity is considered soft-deleted.
   */
  deletedAt?: string | Date | null;
};

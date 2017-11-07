export abstract class Entity {
  id: number;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
  is_deleted: boolean;
}

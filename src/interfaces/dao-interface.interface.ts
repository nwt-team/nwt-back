import { Model, MongooseDocument, Schema } from 'mongoose';
import { from, Observable } from 'rxjs';
import { DtoInterface } from './dto-interface.interface';

export interface DaoInterface {

  constructor(object: Object)

  /**
   * Returns one music of the list matching the id in parameter
   *
   * @param id
   *
   * @return {Observable<Schema | void>}
   */
  findById(id: string): Observable<Schema | void>

  /**
   *  Returns a list of Music
   *
   * @return {Observable<Schema[] | void>}
   */
  find(): Observable<Schema[] | void>

  /**
   * Create music and return it
   * @param music
   * @return {Observable<Schema[]>}
   */
  save(dto: DtoInterface): Observable<Schema>

  /**
   * Update music and return it
   * @param id
   * @param music
   * @return {Observable<Schema[] | void>}
   */
  findByIdAndUpdate(id: string, dto: DtoInterface): Observable<Schema | void>

  /**
   * Remove object if Id is found in DB and return it
   * @param id
   * @return {Observable<Schema[] | void>}
   */
  findByIdAndRemove(id: string): Observable<Schema | void>

}

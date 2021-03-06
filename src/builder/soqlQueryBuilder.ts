import {IBuilder} from './builder';
import {ISOQLObject, ISOQLCondition} from './soqlObject';

/**
 * SOQL query builder class.
 *
 * Creates a Salesforce SOQL query
 */
export class SOQLQueryBuilder implements IBuilder {
  private query: string = 'SELECT';

  constructor() {

  }

  /**
   * Builds the SELECT part of a SOQL
   *
   * @param {string[]} attributes attributes id
   *
   * @return {SOQLQueryBuilder} SOQLQueryBuilder
   */
  private buildSelect(attributes: string[]): SOQLQueryBuilder {
    attributes.forEach((value: string, index: number) => {
      if (index > 0) { this.query += ','; }
      this.query += ` ${value}`;
    });

    return this;
  }

  /**
   * Builds the FROM part of a SOQL
   *
   * @param {string[]} databases databases name
   *
   * @return {SOQLQueryBuilder} SOQLQueryBuilder
   */
  private buildFrom(tables: string[]): SOQLQueryBuilder {
    tables.forEach((value: string, index: number) => {
      if (index > 0) { this.query += ','; }
      this.query += ` FROM ${value}`;
    });

    return this;
  }

  /**
   * Builds the WHERE part of a SOQL
   *
   * @param {ISOQLCondition[]} conditions SOQL conditions
   *
   * @return {SOQLQueryBuilder} SOQLQueryBuilder
   */
  private buildWhere(conditions: ISOQLCondition[]): SOQLQueryBuilder {
    conditions.forEach((value: ISOQLCondition, index: number) => {
      if (index > 0) { this.query += value.operator; }
      this.query += ` WHERE ${value.attribute}=${value.value}`;
    });

    return this;
  }

  /**
   * Builds the SOQL query
   *
   * @param {ISOQLObject} soqlObject object to build the query from
   *
   * @return {string} SOQL query string
   */
  public buildSOQLQuery(soqlObject: ISOQLObject): string {
    this.buildSelect(soqlObject.attributes);
    this.buildFrom(soqlObject.tables);
    if (soqlObject.conditions) {
      this.buildWhere(soqlObject.conditions);
    }

    return this.build();
  }

  /**
   * Implements build from {@link Ibuilder}
   * This will build a saleforce string for SOQL
   *
   * Executes the build for this class
   */
  public build(): string {
    return this.query;
  }
}

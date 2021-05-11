/*-
 * #%L
 * cmdb_test
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
export interface CmdbInterface {
    create(name: string, size: number);
    delete(id : number);
}

export interface CmdbConstructor {
    new(host: RESTHost): CmdbInterface;
}

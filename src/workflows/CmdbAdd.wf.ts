/*-
 * #%L
 * cmdb_test
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { Workflow } from 'vrotsc-annotations';
import { CmdbFactory } from '../actions/CmdbFactory';


@Workflow({
    name: "",
    path: "CHI/Hanson/victor/add"
})
export class CmdbDeleteWorkflow {
    public add(name: string, size: number, endpoint: RESTHost, cmdbType?: string): void {
        const cmdb = new CmdbFactory().getCmdb(endpoint, cmdbType);
        cmdb.create(name, size);
    }
}

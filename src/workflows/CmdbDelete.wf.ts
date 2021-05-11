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
    path: "test/cmdb/victor/delete"
})
export class CmdbDeleteWorkflow {
    public delete(recordId: number, endpoint: RESTHost, cmdbType?: string): void {
        const cmdb = new CmdbFactory().getCmdb(endpoint, cmdbType);
        cmdb.delete(recordId);
    }
}

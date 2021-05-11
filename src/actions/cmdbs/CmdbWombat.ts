/*-
 * #%L
 * cmdb_test
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { CmdbInterface } from "../CmdbInterface";


export class CmdbWombat implements CmdbInterface {
    private host: RESTHost;
    constructor(host: RESTHost) {
        this.host = host;
    }

    create(name: string, size: number) {
        const body = 
        `<CreateRecord>
            <Name>${name}</Name>
            <Size>${size}</Size>
        </CreateRecord>`;
        const operation = this.host.getOperation('endpoint');
        const request = operation.createRequest([], body);
        const response = request.execute();
        if(response.statusCode >= 200 && response.statusCode < 300)
            return;
        throw new Error(`Failed to create record status code ${response.statusCode} and body '${response.contentAsString}'`);
    }
    
    delete(id: number) {
        const body = 
        `<DeleteRecord>
            <Id>${id}</Id>
        </DeleteRecord>`;
        const operation = this.host.getOperation('endpoint');
        const request = operation.createRequest([], body);
        const response = request.execute();
        if(response.statusCode >= 200 && response.statusCode < 300)
            return;
        throw new Error(`Failed to delete record status code ${response.statusCode} and body '${response.contentAsString}'`);
    }
}

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


export class CmdbPlatypus implements CmdbInterface {
    private host: RESTHost;
    constructor(host: RESTHost) {
        this.host = host;
    }
    create(name: string, size: number) {
        const operation = this.host.getOperation('create');
        const request = operation.createRequest([], JSON.stringify({name, size}));
        const response = request.execute();
        try {
            if(response.statusCode >= 200 && response.statusCode < 300) {
                const {transactionId} = JSON.parse(response.contentAsString);
                this.commit(transactionId);
                return;
            }
        }catch {}
        throw new Error(`Failed to create record status code ${response.statusCode} and body '${response.contentAsString}'`);
    }

    delete(id: number) {
        const operation = this.host.getOperation('delete');
        const request = operation.createRequest([], JSON.stringify({id}));
        const response = request.execute();
        try {
            if(response.statusCode >= 200 && response.statusCode < 300) {
                const {transactionId} = JSON.parse(response.contentAsString);
                this.commit(transactionId);
                return;
            }
        }catch {}
        throw new Error(`Failed to delete record with status code ${response.statusCode} and body '${response.contentAsString}'`);
    }
    
    private commit(transactionId: number) {
        const operation = this.host.getOperation('delete');
        const request = operation.createRequest([], null);
        const response = request.execute();
        if(response.statusCode >= 200 && response.statusCode < 300)
            return;
        throw new Error('Transaction failed!');
    }
}

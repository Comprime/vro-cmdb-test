/*-
 * #%L
 * cmdb_test
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */

import { CmdbKangaroo } from './cmdbs/CmdbKangaroo'
import { CmdbPlatypus } from './cmdbs/CmdbPlatypus'
import { CmdbWombat } from './cmdbs/CmdbWombat'
import { CmdbConstructor, CmdbInterface } from './CmdbInterface'

export class CmdbFactory {
    getCmdb(restHost : RESTHost, cmdbName?: string) : CmdbInterface {
        const cmdbs: { [name: string] : CmdbConstructor }  = {
            'kangaroo': CmdbKangaroo,
            'platypus': CmdbPlatypus,
            'wombat': CmdbWombat,
        };
        for( let i of Object.keys(cmdbs) )
            if((cmdbName ?? restHost.name).toLowerCase().indexOf(i) >= 0)
                return new cmdbs[i](restHost);
        throw new Error("Unsupported cmdb");
    }
}

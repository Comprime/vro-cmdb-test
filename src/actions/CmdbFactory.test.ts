import { CmdbFactory } from './CmdbFactory';
import { CmdbWombat } from './cmdbs/CmdbWombat';
import { CmdbPlatypus } from './cmdbs/CmdbPlatypus';

describe("CMDB Factory", () => {
    it("should give correct cmdb", () => {
        expect(()=> new CmdbFactory().getCmdb({name: 'Wombat'} as RESTHost)).toBeDefined()
        expect(()=> new CmdbFactory().getCmdb({name: 'Kangaroo'} as RESTHost)).toBeDefined()
        expect(()=> new CmdbFactory().getCmdb({name: 'Platypus'} as RESTHost)).toBeDefined()
    })
    it("should accept overrides", () => {
        const cmdbWombat = new CmdbFactory().getCmdb({name: 'Platypus'} as RESTHost, 'wombat');
        expect(cmdbWombat instanceof CmdbWombat).toBeTruthy()
        expect(cmdbWombat instanceof CmdbPlatypus).toBeFalsy()
    })
    it("should throw on nonsense", () => {
        expect(()=>new CmdbFactory().getCmdb({name: 'nonsense'} as RESTHost)).toThrowError("Unsupported cmdb");
        expect(()=>new CmdbFactory().getCmdb({name: 'Platypus'} as RESTHost, 'nonsense')).toThrowError("Unsupported cmdb");
    })
})

import { CmdbKangaroo } from './CmdbKangaroo'

describe("CMDB Factory", () => {
    let mockHost: jasmine.SpyObj<RESTHost>;
    let mockFalslyHost: jasmine.SpyObj<RESTHost>;
    let mockOperation: jasmine.SpyObj<RESTOperation>;
    let mockRequest: jasmine.SpyObj<RESTRequest>;
    let mockSucessResponse = {statusCode: 200} as RESTResponse;
    let mockFailResponse = {statusCode: 500} as RESTResponse;
    let name, size, id;
    beforeEach(() => {
        mockHost = jasmine.createSpyObj<RESTHost>('RESTHost', ['getOperation'])
        mockFalslyHost = jasmine.createSpyObj<RESTHost>('RESTHost', ['getOperation'])
        mockOperation = jasmine.createSpyObj<RESTOperation>('RESTOperation', ['createRequest'])
        mockRequest = jasmine.createSpyObj<RESTRequest>('RESTRequest', ['execute'])

        mockHost.getOperation.and.returnValue(mockOperation);
        mockFalslyHost.getOperation.and.throwError("No operation like that!");
        mockOperation.createRequest.and.returnValue(mockRequest);
        mockRequest.execute.and.returnValue(mockSucessResponse);

        name = Math.random().toString(36).substring(7);
        size = Math.random();
        id = Math.random();
    })
    it('should call all rest functions on a nice create request and return empty', ()=> {
        const cmdb = new CmdbKangaroo(mockHost);

        expect(()=>{cmdb.create(name, size)}).not.toThrow();

        expect(mockHost.getOperation).toHaveBeenCalled();
        expect(mockOperation.createRequest).toHaveBeenCalled();
        expect(mockRequest.execute).toHaveBeenCalled();
    });

    it('should call all rest functions on a nice delete request adn return empty', ()=> {
        const cmdb = new CmdbKangaroo(mockHost);

        expect(()=>{cmdb.delete(id)}).not.toThrow();

        expect(mockHost.getOperation).toHaveBeenCalled();
        expect(mockOperation.createRequest).toHaveBeenCalled();
        expect(mockRequest.execute).toHaveBeenCalled();
    });

    it('should throw when working with wrong endpoint', ()=> {
        const cmdb = new CmdbKangaroo(mockFalslyHost);

        expect(()=>{
            cmdb.create(name, size)
        }).toThrow();
        expect(()=>{
            cmdb.delete(id)
        }).toThrow();

        expect(mockFalslyHost.getOperation).toHaveBeenCalled();
        expect(mockOperation.createRequest).toHaveBeenCalledTimes(0);
        expect(mockRequest.execute).toHaveBeenCalledTimes(0);
    });
})

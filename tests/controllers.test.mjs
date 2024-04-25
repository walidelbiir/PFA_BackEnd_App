import { expect as _expect } from 'chai';
import { stub } from 'sinon';
const expect = _expect;

// Assuming http_requests and Accueil are imported from other modules
import {http_requests} from '../metrics.js';
import Accueil from '../Models/Accueil.js';

// The method to test
import { activatedAccueilPosts } from '../controllers/accueil.controller.js';

describe('activatedAccueilPosts', () => {
    let req, res, httpRequestsIncStub, accueilFindStub;

    beforeEach(() => {
        // Mock the request and response objects
        req = {
            // Add any properties needed for your method
        };
        res = {
            status: stub().returnsThis(),
            send: stub()
        };

        // Stub the http_requests.inc method
        httpRequestsIncStub = stub(http_requests, 'inc');

        // Stub the Accueil.find method
        accueilFindStub = stub(Accueil, 'find');
    });

    afterEach(() => {
        // Restore the stubs after each test
        httpRequestsIncStub.restore();
        accueilFindStub.restore();
    });

    it('should return activated posts and increment http_requests', async () => {
        // Setup the stub to resolve with some data
        accueilFindStub.resolves([{ isActive: true }]);

        await activatedAccueilPosts(req, res);

        // Check that the response was sent with status 200 and the correct data
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledWith({ data: [{ isActive: true }] })).to.be.true;

        // Check that http_requests.inc was called with the correct arguments
        expect(httpRequestsIncStub.calledWith()).to.be.true;
        expect(httpRequestsIncStub.calledWith({ path: '/active/post' })).to.be.true;
        expect(httpRequestsIncStub.calledWith({ code: 200 })).to.be.true;
        expect(httpRequestsIncStub.calledWith({ code: 200, path: '/active/post' })).to.be.true;
    });
});

import Carousel from '../Models/Carousel.js'

// The method to test
import { activatedCarousels } from '../controllers/carousel.controller.js'

describe('activatedCarousels', () => {
    let req, res, httpRequestsIncStub, carouselFindStub;

    beforeEach(() => {
        // Mock the request and response objects
        req = {
            // Add any properties needed for your method
        };
        res = {
            status: stub().returnsThis(),
            send: stub()
        };

        // Stub the http_requests.inc method
        httpRequestsIncStub = stub(http_requests, 'inc');

        // Stub the Carousel.find method
        carouselFindStub = stub(Carousel, 'find');
    });

    afterEach(() => {
        // Restore the stubs after each test
        httpRequestsIncStub.restore();
        carouselFindStub.restore();
    });

    it('should return activated carousels and increment http_requests', async () => {
        // Setup the stub to resolve with some data
        carouselFindStub.resolves([{ isActive: true }]);

        await activatedCarousels(req, res);

        // Check that the response was sent with status 200 and the correct data
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledWith({ data: [{ isActive: true }] })).to.be.true;

        // Check that http_requests.inc was called with the correct arguments
        expect(httpRequestsIncStub.calledWith()).to.be.true;
        expect(httpRequestsIncStub.calledWith({ path: 'active/carousels' })).to.be.true;
        expect(httpRequestsIncStub.calledWith({ code: 200 })).to.be.true;
        expect(httpRequestsIncStub.calledWith({ code: 200, path: '/active/carousels' })).to.be.true;
    });

});

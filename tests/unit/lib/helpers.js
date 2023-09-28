const { mockRequest, mockResponse } = require("jest-mock-req-res");

const JourneyModel = require("hmpo-form-wizard/lib/journey-model");
const WizardModel = require("hmpo-form-wizard/lib/wizard-model.js");

global.createDefaultReqResNext = () => {
  const req = mockRequest({
    form: {
      options: {
        fields: {},
      },
      values: {},
    },
    axios: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    },
    session: {
      "hmpo-wizard-previous": {},
    },
  });

  req.journeyModel = new JourneyModel(null, {
    req,
    key: "test",
  });

  req.sessionModel = new WizardModel(null, {
    req,
    key: "test",
    journeyModel: req.journeyModel,
    fields: {},
  });

  const res = mockResponse({});
  const next = jest.fn();
  return {
    req,
    res,
    next,
  };
};

global.beforeEach(() => {
  const setup = createDefaultReqResNext();

  global.req = setup.req;
  global.res = setup.res;
  global.next = setup.next;
});

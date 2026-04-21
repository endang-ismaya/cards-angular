require('zone.js');
require('zone.js/testing');

const { getTestBed } = require('@angular/core/testing');
const { BrowserTestingModule } = require('@angular/platform-browser/testing');
const { BrowserDynamicTestingModule, platformBrowserDynamicTesting } = require('@angular/platform-browser-dynamic/testing');
const { COMPILER_OPTIONS } = require('@angular/core');

getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, BrowserTestingModule],
  platformBrowserDynamicTesting([
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true,
    },
  ])
);

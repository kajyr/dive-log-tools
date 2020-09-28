#### 4.2.3 (2020-09-28)

##### Build System / Dependencies

*  Updated date-fns dependencies (3c6bb21e)

#### 4.2.2 (2020-09-11)

##### Bug Fixes

*  you can have negative lat / lng (fc8b7593)

#### 4.2.1 (2020-09-11)

##### Build System / Dependencies

*  update dependencies (e5d46196)

##### Bug Fixes

*  Gear serial is a string (428d76a1)
*  Removed buggy float parser. Used a custom Number formatter only when needed instead. (2b347d87)
*  current weak value (37fb8beb)

### 4.2.0 (2020-02-04)

##### Build System / Dependencies

*  Added changelog dependency (222c6d3d)
*  updated dependencies (066b0c85)
*  validation test only match xml files (4fba5e0d)

##### Chores

*  Added surfaces and weathers mappings (7938a001)

##### New Features

*  Tank Name available in gas object (ff29c61c)
*  Repetitive Dive is now a number (5a311987)

##### Bug Fixes

*  float cleaning was cleaning also strings with digits inside (15d877d2)

### 4.1.0 (2019-10-06)

##### Build System / Dependencies

* **deps:**
  *  bump mixin-deep from 1.3.1 to 1.3.2 (461e5bd7)
  *  bump lodash from 4.17.11 to 4.17.15 (ee462f67)
*  Better validation tests (573d24eb)
*  test run script to demo the json output (30435ba0)

##### Chores

*  methods optimization (c25afd82)
*  New matches for weather, surface and visibility (6a3487eb)
*  set the normalized levels as required (bee7bc48)

##### New Features

*  Types intead of type, is a list (b6c8e17d)
*  added dive tags (843d0cfd)
*  Initial support for multiple gases (b3f6d976)

##### Bug Fixes

*  bottom_time is null when dive time is zero (0d7e193b)
*  Weights is either a int or undefined (1f094a9d)
*  Gear might be missing from macdive (9d690c58)

## 4.0.0 (2019-09-04)

##### New Features

*  Normalized levels for current, surface, visibility and weather (7d39be7b)

##### Bug Fixes

*  Terms (b69834fa)
*  surfaceInterval with float values (4fa4a389)

#### 3.1.2 (2019-07-11)

##### Bug Fixes

*  Fixed values for missing properties (7489fe0d)

#### 3.1.1 (2019-07-10)

##### Bug Fixes

*  visibility check for Ottima (f344ea59)
*  MacDive Importer does not break for missing gases (2bb30c34)

### 3.1.0 (2019-07-09)

##### Chores

*  Cleanup of half-backed properties (faa9c172)

##### New Features

*  Removed diveSuit and computer since they are already part of the gear (3b390da2)
*  Notes are imported from the xml (085c111e)
*  Date time consistency (4d5b6e3a)

##### Bug Fixes

*  Dive log gear importer is working a bit better (0cdbf838)

## 3.0.0 (2019-06-26)

##### Chores

*  gear and samples are required (b79b931b)
*  DivingLog tests for schema (f5fa25d5)

##### New Features

*  location object to group location properties (3eb3e8cd)
*  full sample node from MacDive (f4ed9124)
*  Gears into MacDive export (be4cb962)
*  dive schema validator (06b20ca8)

#### 2.0.3 (2019-06-23)

##### Bug Fixes

*  MacDive: Wrong json cleanup if there is only one sample in the dive (14df27b7)

#### 2.0.2 (2019-06-23)

##### Bug Fixes

*  Fixed variables (40c710e9)

#### 2.0.1 (2019-06-23)

##### Bug Fixes

*  Moved prod dependencies out of dev (3195a367)

## 2.0.0 (2019-06-23)

##### Other Changes

*  Removed dependencies from fs to be used also in a browser context (888fc47a)

#### 1.0.4 (2019-05-05)

##### Build System / Dependencies

*  Jest verbose output (09b01e51)
*  Added yarn lock to the npm ignores (4f81aef6)

##### Chores

*  JSON cleaning and dive utils tests (038bb587)
*  Moved mocks test xml into __mocks__ folder (7be877f3)

##### Bug Fixes

*  listImporters was referencing the wrong variable (6eb68f2b)

#### 1.0.3 (2019-05-05)

##### Bug Fixes

*  Exported listImporters (62ef832c)

#### 1.0.2 (2019-05-05)

##### Bug Fixes

*  Exported listImporters (62ef832c)

#### 1.0.1 (2019-05-05)

##### Build System / Dependencies

*  Added release scripts (a23daffe)

##### Bug Fixes

*  Missing importer export (75138d62)

#### 1.0.0 (2019-05-05)

##### Bug Fixes

*  Missing importer export (75138d62)

#### 1.0.0 (2019-05-05)

##### Bug Fixes

*  Missing importer export (75138d62)


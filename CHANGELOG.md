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


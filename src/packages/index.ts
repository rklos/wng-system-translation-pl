export * as custom from './custom';
export * as wrathAndGlory from './wrath-and-glory';
export * as warhammerLibrary from './warhammer-library';

export interface Package {
  PACKAGE: string;
  REPO: string;
  SUPPORTED_VERSION: string;
}

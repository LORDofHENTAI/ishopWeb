// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrlLog: 'http://192.168.1.232:120',
  // apiUrl: 'http://192.168.1.232:120',
  // apiUrlLog: 'http://192.168.1.122:7118',
  // apiUrl: 'http://192.168.1.122:7118',
  apiUrlLog: 'http://192.168.7.186:80',
  apiUrl: 'http://192.168.7.186:80',
  apiUrlImg: 'https://mile.by/gtools/getImg/index.php',
  cookieName: 'user-ishope-mile',
  listAdminsIshop: ['maksimovich_v', 'shegolov_a', 'orlova_v', 'bondarenko_v', 'fesko_n'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

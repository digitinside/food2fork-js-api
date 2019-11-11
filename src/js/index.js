import str from './models/Search';
// import { add as a, multiply as m, ID } from './views/searcheView';
import * as searcheView from './views/searcheView';

// console.log(`Using imported functions! ${a(ID, 2)} and ${m(3, 5)}. ${str}`);
console.log(`Using imported functions! ${searcheView.add(searcheView.ID, 2)} and ${searcheView.multiply(3, 5)}. ${str}`);

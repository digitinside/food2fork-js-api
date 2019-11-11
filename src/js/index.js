import Search from './models/Search';
import * as searchView from './views/searcheView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
/* Search obj
/* Current recipe obj
/* Shopping list obj 
/* Liked recipes
*/
const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();    
    if(query) {
        // add new search to state
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        await state.search.getResults();
        //searchView.renderResults(state.search.result);
        clearLoader();

        const recipe = [
            { recipe_id: 55662, title: 'My recipe 1', publisher: 'Publisher 1', image_url: 'img/test-1.jpg'},
            { recipe_id: 66554, title: 'My recipe 2', publisher: 'Publisher 2', image_url: 'img/test-2.jpg'},
            { recipe_id: 35445, title: 'My recipe 3My recipe 3My recipe 3My recipe 3My recipe 3', publisher: 'Publisher 3', image_url: 'img/test-3.jpg'},
            { recipe_id: 43535, title: 'My recipe 4', publisher: 'Publisher 4', image_url: 'img/test-4.jpg'},
            { recipe_id: 44554, title: 'My recipe 5', publisher: 'Publisher 5', image_url: 'img/test-5.jpg'},
            { recipe_id: 45554, title: 'My recipe 6', publisher: 'Publisher 6', image_url: 'img/test-6.jpg'}
        ];

        searchView.renderResults(recipe);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


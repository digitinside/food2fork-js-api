import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searcheView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
/* Search obj
/* Current recipe obj
/* Shopping list obj 
/* Liked recipes
*/
const state = {};

/**
 * Search controller
 */
const controlSearch = async () => {
    const query = searchView.getInput();    
    if(query) {
        // add new search to state
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            await state.search.getResults();
            //searchView.renderResults(state.search.result);
    
            const recipe = [
                { recipe_id: 55662, title: 'My recipe 1', publisher: 'Publisher 1', image_url: 'img/test-1.jpg'},
                { recipe_id: 66554, title: 'My recipe 2', publisher: 'Publisher 2', image_url: 'img/test-2.jpg'},
                { recipe_id: 35445, title: 'My recipe 3My recipe 3My recipe 3My recipe 3My recipe 3', publisher: 'Publisher 3', image_url: 'img/test-3.jpg'},
                { recipe_id: 43535, title: 'My recipe 4', publisher: 'Publisher 4', image_url: 'img/test-4.jpg'},
                { recipe_id: 44554, title: 'My recipe 5', publisher: 'Publisher 5', image_url: 'img/test-5.jpg'},
                { recipe_id: 45554, title: 'My recipe 6', publisher: 'Publisher 6', image_url: 'img/test-6.jpg'}
            ];
    
            clearLoader();
            searchView.renderResults(recipe);
        }
        catch(error) {
            console.log(error);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto);   
        searchView.clearResults(); 
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * Recipe controller
 */
const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            console.log(state.recipe);
            
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        }
        catch(error) {
            console.log(error);
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});



import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const key = 'd66111f071be4f70e5b7fd4118752c74';
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        }
        catch (error) {
            console.log(error);
        }
    }
}

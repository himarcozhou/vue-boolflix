new Vue({
    el: "#app",
    data: {
        textToSeach: "",
        tmdbApiKey: "4932702c205c62967729902c6fdb3dce",
        movieList: [],
        tvSeriesList: [],

    },
    methods: {
        makeAxiosSearch(searchType) {
            const axiosOptions = {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSeach
                }
            };
            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOptions)
                .then((x) => {
                    if (searchType === "movie") {

                        this.movieList = x.data.results;

                    } else if (searchType === "tv") {

                        this.tvSeriesList = x.data.results.map((show) => {
                            show.original_title = show.original_name;
                            show.title = show.name;
                            return show

                        });
                    }
                })
        },
        doSearch() {

            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
        }
    },

    mounted() {

    }
})
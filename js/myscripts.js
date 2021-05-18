new Vue({
    el: "#app",
    data: {
        URI: "https://api.themoviedb.org/3/search/",
        TMDBAPIKEY: "4932702c205c62967729902c6fdb3dce",
        URLIMG: "https://image.tmdb.org/t/p/w500",
        fallbackIMG: "https://lh3.googleusercontent.com/proxy/DbjUlclTtBlI6JuRbmkJfVj8XTsHWmG8HTVP8hebCiXxbwhqccaiWI1OELM3KTMnzzqZffnAoDF57nqVvwHn8egKzfvWHTTyFFiKlTcPbNnHCkbkZwuQVkik6ng6EH0weKw",
        fallbackTRAILER: "https://lh3.googleusercontent.com/proxy/WyZLPU_dwmIBwvUBz656gul43IR-JweI_SXrMDzC1-ni3ZkWNS4VCyW_uJe9ORVzgOwWqiqUHyEzZjGlO-ZBVDm2XUc3o7qZKsf8DMUaaNnTIX1J3PY5rNgfhi8VsxoCjbhrBk_njOUj8I7j2mVWUvlupYr8BSGtJUNQ8Us",
        textToSeach: "",
        textToSeach2: "pokemon",
        movieListCheck: [],
        movieList: [],
        tvSeriesList: [],
        // scelgo una bandiera che usero' in caso non trovassi quelle che cercavo
        fallbackFlag: "gb",
        // ottengo la lingua di cui voglio trovare le bandiere dei country associati
        queryLanguage: [],
        //https://gist.github.com/maephisto/9228207
        lang2flag2: {
            "en": ["us", "gb", "ca"],
            "es": ["es", "ar"],
            "ko": ["kr"],
            "zh": ["cn"],
            "hi": ["in"],
            "th": ["th"],
            "mr": ["io"],
            "sq": ["al"],
            "ja": ["jp"],
            "it": ["it"],
            "de": ["de"],
            "ml": ["my"],
            "cn": ["cn"],
            "th": ["th"]
        },
        test: [],
        check: false,



        imageList: [
            "https://c4.wallpaperflare.com/wallpaper/925/552/963/wlop-digital-art-artwork-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/688/968/1021/fantasy-girl-anime-girls-anime-wlop-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/857/893/90/girls-art-ghost-blade-wlop-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/879/663/634/anime-girls-wlop-ghost-blade-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/785/786/358/princess-knight-painting-wlop-wallpaper-preview.jpg"
        ],
        activeImg: 0,
    },
    computed:{
        filteredMovieList(){
            const filteredData = this.movieList.filter((x) => {
                //return element.name.toLowerCase().includes(this.searchText.toLowerCase());
                return x.name.toLowerCase().startsWith(this.textToSeach.toLowerCase());
            });

            return filteredData;
        },
        filteredtvSeriesList(){
            const filteredData = this.tvSeriesList.filter((x) => {
                //return element.name.toLowerCase().includes(this.searchText.toLowerCase());
                return x.name.toLowerCase().startsWith(this.textToSeach.toLowerCase());
            });

            return filteredData;
        },
    },
    methods: {
        makeAxiosSearch(searchType) {
            this.check = false;
            if(this.textToSeach){
                this.textToSeach2 = this.textToSeach;
            }
            const axiosOptions = {
                params: {
                    api_key: this.TMDBAPIKEY,
                    query: this.textToSeach2
                }
            };
            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOptions)
                .then((x) => {

                    if (x.data.results) {

                        if (searchType === "movie") {
                            this.movieList = x.data.results;

                            // this.movieListCheck = x.data.results;
                            // this.check = true;
                            // if(this.check){
                            //     this.render()
                            // }

                            //setTimeout(() => { }, 3000)

                            // this.movieList.forEach((movie) => {
                            //     this.queryLanguage = movie.original_language;
                            // });
                            // this.movieList.forEach(element => {
                            //     this.queryLanguage.push(element.original_language);
                            // });

                            // cerco le bandiere a partire dalla mappa e le salvo per essere usate successivamente

                            // const candidatesCountries = Object.keys(this.lang2flag).includes(this.queryLanguage) ? this.lang2flag[this.queryLanguage] : [this.fallbackFlag];
                            // console.log(this.queryLanguage);
                            // this.flagtest = candidatesCountries

                        } else if (searchType === "tv") {
                            this.tvSeriesList = x.data.results.map((show) => {
                                show.original_title = show.original_name;
                                show.title = show.name;
                                //this.queryLanguage.push(show.original_language);
                                return show
                            });
                        }

                    }
                })
        },
        render() {
            this.movieList = this.movieListCheck;
        },
        addFlagsbad() {
            const lang2flag = {
                en: "us",
                es: "es",
                it: "it",
                cn: "cn",
                hi: "in",
                th: "th",
                mr: "io",
                sq: "al",
                ja: "jp",
                ko: "ko",
                de: ["de"],
                ml: ["my"],
            };
            const candidatesCountries = Object.keys(lang2flag)


            for (let i = 0; i < candidatesCountries.length; i++) {
                const language = candidatesCountries[i];
                const country = lang2flag[language];
                for (let n = 0; n < this.movieList.length; n++) {

                    if (language.includes(this.movieList[n].original_language)) {
                        this.movieList[n].flag = (language);
                        console.log(n + " " + country)
                    } else {
                        this.movieList[n].flag = (this.fallbackFlag);
                    }
                    this.test = this.movieList.flag;
                }
            }


        },
        addFlag(language) {
            if (!this.lang2flag2[language]) {
                return `flag-icon-${this.fallbackFlag}`;
            }

            return `flag-icon-${this.lang2flag2[language][0]}`;
        },
        doSearch() {
            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
            //setTimeout(() => { this.addFlags(); }, 3000)
        },

        //SLIDER
        changeImg(direction) {
            let newIndex = this.activeImg += direction;
            //se siamo alla prima img, andiamo all'ultima img della lista
            if (newIndex < 0) {
                newIndex = this.imageList.length -1;
            } 
            //se siamo all'ultima img, andiamo alla prima img della lista
            else if (newIndex > (this.imageList.length - 1)) {
                newIndex = 0;
            }
            this.activeImg = newIndex;
        },
        dotclick(clickedot){
            this.activeImg = clickedot;
        },
        rating(vote) {
            return Math.round(vote / 2);
          },
    },
    mounted(){
        document.querySelector(".slider_box").focus();
        this.doSearch();
        
    }
})

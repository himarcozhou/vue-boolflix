new Vue({
    el: "#app2",
    data: {
        imageList: [
            "https://c4.wallpaperflare.com/wallpaper/925/552/963/wlop-digital-art-artwork-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/688/968/1021/fantasy-girl-anime-girls-anime-wlop-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/857/893/90/girls-art-ghost-blade-wlop-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/879/663/634/anime-girls-wlop-ghost-blade-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/785/786/358/princess-knight-painting-wlop-wallpaper-preview.jpg"
        ],
        activeImg: 0
    },
    methods: {
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
        onKeyPress(){
            console.log("Key pressed.");
        },
        dotclick(clickedot){
            this.activeImg = clickedot;
        }
    },
    mounted(){
        document.querySelector(".slider-container").focus()
    }
})
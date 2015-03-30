// Router
var AppRouter = Backbone.Router.extend({
 
    // routes:{
    //     "":"list",
    //     "wines/:id":"wineDetails"
    // },
 
    // list:function () {
    //     this.wineList = new WineCollection();
    //     this.wineListView = new WineListView({model:this.wineList});
    //     this.wineList.fetch();
    //     $('#sidebar').html(this.wineListView.render().el);
    // },
 
    // wineDetails:function (id) {
    //     this.wine = this.wineList.get(id);
    //     this.wineView = new WineView({model:this.wine});
    //     $('#content').html(this.wineView.render().el);
    // }

    routes:{
        "":"home",
        "/test":"test",
        "projects/:id":"projectDetails"
    },
 
    home:function () {
        loadingSite();

        
    },

    test:function () {
        alert("test");
    },
 
    projectDetails:function (id) {
        alert("project details");
    }
});
 
var app = new AppRouter();
Backbone.history.start();

var loaderTime=0;
function loadingSite(){
    loaderTime++;
    $(".home-loader .load-bar p").html(loaderTime+" %")
    $(".home-loader .load-bar div").css("width", loaderTime+"%");
    var timer = setTimeout(function() {
        loadingSite();
    }, 10);
    if(loaderTime == 100){
        clearTimeout(timer);
        $(".home-loader .to-fade").addClass('fade');
        $(".home-loader .panel").addClass('active');
        setTimeout(function(){
            $(".home-loader").addClass('displayNone');
            animHome();
        }, 1000);
    }
}

function animHome(){
    $('.to-show').addClass('show');
}
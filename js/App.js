// Router
var home = false;
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
        "home":"home",
        "projects":"projects",
        "projects/:id":"projectDetails"
    },
 
    home:function () {
        home = true;

        setTimeout(function(){
            $('.menu-button, .home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
        }, 4500);

        setTimeout(function(){
            var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
            $(window).bind(mousewheelevt, function(e){
                var evt = window.event || e //equalize event object     
                evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
                var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
                if(delta < 0) {
                    slide(true);
                }
            });
        }, 4500);
    },

    projects:function () {
        if(home!=true){
            $('.menu-button, .home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
            $('.home, .portfolio, .home .content, .portfolio .content').addClass('slidedown');
        }
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
        $('.portfolio .content .presentation').bind(mousewheelevt, function(e){
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            if(delta > 0) {
                slide(false);
            }
        });

        this.projectList = new ProjectList();
        this.projectList.fetch({success: function() {
            $('#list-projects').html(new ProjectListView({model: app.projectList}).render().el);
        }});
    },
 
    projectDetails:function (id) {
        alert("project details");
    }
});

tpl.loadTemplates(['project-list-item'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
 
// var app = new AppRouter();
// Backbone.history.start();

loadingSite();

var loaderTime=0;
function loadingSite(){
    if($("body").hasClass("loaded")){
        $(".home-loader").addClass('displayNone');
    }else{
        loaderTime++;
        $(".home-loader .load-bar p").html(loaderTime+" %")
        $(".home-loader .load-bar div").css("width", loaderTime+"%");
        var timer = setTimeout(function() {
            loadingSite();
        }, 30);
        if(loaderTime == 100){
            clearTimeout(timer);
            $(".home-loader .to-fade").addClass('fade');
            $(".home-loader .panel").addClass('active');
            setTimeout(function(){
                $(".home-loader").addClass('displayNone');
                $("body").addClass("loaded");
            }, 2000);
        }
    }
}

function slide(down){
    if(down == true){
        location.replace("#projects");
        $('.home .content').addClass('slidedown');
        setTimeout(function(){
            $('.home, .portfolio').addClass('slidedown');
        },500);
        setTimeout(function(){
            $('.portfolio .content').addClass('slidedown');
        },1300);
    }else{
        location.replace("#home");
        $('.portfolio .content').removeClass('slidedown');
        setTimeout(function(){
            $('.home, .portfolio').removeClass('slidedown');
        },500);
        setTimeout(function(){
            $('.home .content').removeClass('slidedown');
        },1300);
    }
}



















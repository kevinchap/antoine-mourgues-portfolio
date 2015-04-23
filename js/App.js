"use strict";

var settings = {
    loaderTime:0,
    home:false,
    projects:false,
    app:null,
    clickOn:true
}

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
        "home":"home",
        "projects":"projects",
        "projects/:id":"projectDetails"
    },
 
    home:function () {
        setTimeout(function(){
            $('.home .menu-button, .home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
        }, 4500);

        setTimeout(function(){
            detectMouseWheel('home', true);
        }, 4500);

        $('.scrolldown').click(function(){
            slide(true);
        });

        settings.home = true;
    },

    projects:function () {
        if(settings.home!==true){
            $('.home .menu-button, .home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
            $('.home, .portfolio, .home .content, .portfolio .content').addClass('slidedown');
            setTimeout(function(){
                $('.presentation, .portfolio .menu-button, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                setTimeout(function(){
                    showItemsProjects();
                },2500);
            }, 4500);
        }else{
            setTimeout(function(){
                $('.presentation, .portfolio .menu-button, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                setTimeout(function(){
                    showItemsProjects();
                },2500);
            },2000);
        }

        detectMouseWheel('projects', false);

        if(settings.projects !== true){
            this.projectList = new ProjectList();
            this.projectList.fetch({success: function() {
                $('#list-projects').html(new ProjectListView({model: settings.app.projectList}).render().el);
            }});
        }

        settings.projects = true;
    },
 
    projectDetails:function (id) {
        alert(id);
    }
});

tpl.loadTemplates(['project-list-item'], function() {
    settings.app = new AppRouter();
    Backbone.history.start();
});

loadingSite();

function loadingSite(){
    if($("body").hasClass("loaded")){
        $(".home-loader").addClass('displayNone');
    }else{
        settings.loaderTime++;
        $(".home-loader .load-bar p").html(settings.loaderTime+" %")
        $(".home-loader .load-bar div").css("width", settings.loaderTime+"%");
        var timer = setTimeout(function() {
            loadingSite();
        }, 20);
        if(settings.loaderTime === 100){
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

function detectMouseWheel(route, dir){
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    
    if(route==='home'){
        $(window).bind(mousewheelevt, function(e){
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            if(delta < 0) {
                slide(dir);
            }
        });
    }else{
        $('.portfolio .content .presentation').bind(mousewheelevt, function(e){
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            if(delta > 0) {
                slide(dir);
            }
        });
    }
}

function slide(down){
    if(down === true){
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

function showItemsProjects(){
    var lis = $('.portfolio #list-projects > ul > li');
    $(lis).css('width', $('.presentation').offset().left+'px')
    var nbAlreadyInView = parseInt($(window).height()/300);
    if(($(window).height()/300 - Math.floor($(window).height()/300)) > 0.5){
        nbAlreadyInView++;
    }
    var i;
    for(i=0;i<nbAlreadyInView;i++){
        setTimeout(function(lis,i){
            $(lis[i]).addClass('show');
        },i*1200,lis,i);
    }
    for(i=nbAlreadyInView; i<lis.length; i++){
        $(lis[i]).bind('inview',function(event, isInView, visiblePartX, visiblePartY){
            if(isInView && visiblePartY === "both"){
                $(this).addClass('show');
                $(this).unbind("inview")
            }
        });
    }
}

function loadProject(id, background, top){
    if(settings.clickOn){
        settings.clickOn=false;

        // hide project list
        // $('.portfolio #list-projects > ul > li').css('opacity',0);
        // $('.portfolio #list-projects > ul > li').css('visibility','hidden');

        // init the loader section
        // var settings = {
        //     loaderTime:0,
        //     home:false,
        //     projects:false,
        //     app:null,
        //     clickOn:true
        // }

        // add background to the loader section
        // $('#p-load').attr('data-project', background);
        // $('#p-load').css('background-image', 'url("./img/projets/'+background+'.jpg")');
        // $('#p-load').css('background-repeat', 'no-repeat');
        // $('#p-load').css('background-position', 'center '+top+'px');
        // $('#p-load').css('background-size', 'cover');
        // $('#p-load').css('-webkit-background-size', 'cover');

        // show the loader section
        // $('#p-load').addClass('visible');
        // $('#p-load').addClass('zindex');

        // move the loader section
        // $('#p-load').css('top', $('#list-projects button.project-'+id).offset().top+'px');
        // $('#p-load').css('top', ($(window).height()/2)-150+'px'); 

        // enlarge the loader section and push presentation block out
        // $('#p-load').addClass('big');
        setTimeout(function(){
            // $('.presentation').addClass('invisible');
        }, 1520);
        setTimeout(function(){
            // $('#p-load').css('top', 0);
            setTimeout(function(){
                // $('#p-load').css('background-position', 'center center');
            }, 1000);
        }, 1500);

        // hide the loader section and show project list and the presentation block
        setTimeout(function(){
            // $('#p-load').addClass('change-transition-opacity');
            // $('#p-load').removeClass('visible');
            // $('.portfolio #list-projects > ul > li').css('visibility','visible');
            // $('.presentation').removeClass('invisible');

            // reset the loader section
            setTimeout(function(){
                // $('.portfolio #list-projects > ul > li').css('opacity',1);
                // $('#p-load').removeClass('change-transition-opacity');
                // $('#p-load').removeClass('zindex');
                // $('#p-load').removeClass('big');
                // $('#p-load').css('top', 'auto');
                setTimeout(function(){
                    settings.clickOn=true;
                    console.log('done');
                }, 500);
            }, 500);
        }, 3500);
    }
}



















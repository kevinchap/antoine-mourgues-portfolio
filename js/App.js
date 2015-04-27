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

    initialize:function () {
        this.projectList = new ProjectList();
    },
 
    home:function () {
        setTimeout(function(){
            $('.home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
            setTimeout(function(){
                $('.menu-button').addClass('show');
            }, 2500);
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
            $('.home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
            $('.home, .portfolio, .home .content, .portfolio .content').addClass('slidedown');
            setTimeout(function(){
                $('.presentation, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 500);
                setTimeout(function(){
                    showItemsProjects();
                },2500);
            }, 4500);
        }else{
            setTimeout(function(){
                $('.presentation, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 500);
                setTimeout(function(){
                    showItemsProjects();
                },2500);
            },2000);
        }

        detectMouseWheel('projects', false);

        if(settings.projects !== true){
            this.projectList.fetch({success: function() {
                $('#list-projects').html(new ProjectListView({model: settings.app.projectList}).render().el);
            }});
        }

        settings.projects = true;
    },
 
    projectDetails:function (id) {
        $('#project').addClass('visible');

        if(settings.projects!==true){
            this.projectList.fetch({success: function() {
                settings.app.project = settings.app.projectList.get(id);
                settings.app.projectView = new ProjectView({model:settings.app.project});
                $('#project').html(settings.app.projectView.render().el);
            }});

            setTimeout(function(){
                $('#project .presentation-project').addClass('show');
                setTimeout(function(){
                    $('.menu-button, #project .presentation-project div, #project .presentation-project .nav').addClass('show');
                }, 500);
                setTimeout(function(){
                    $('#project .title, #project .scroll-discover').css('width', $('#project .presentation-project').offset().left+'px');
                    $('#project .title h2, #project .title .seperate, #project .title p, #project .title .client, #project .scroll-discover').addClass('show');
                }, 3000);
            }, 4500);
        }else{
            this.project = this.projectList.get(id);
            this.projectView = new ProjectView({model:this.project});
            $('#project').html(this.projectView.render().el);

            setTimeout(function(){
                $('#project .presentation-project').addClass('show');
                setTimeout(function(){
                    $('.menu-button, #project .presentation-project div, #project .presentation-project .nav').addClass('show');
                }, 500);
                setTimeout(function(){
                    $('#project .title, #project .scroll-discover').css('width', $('#project .presentation-project').offset().left+'px');
                    $('#project .title h2, #project .title .seperate, #project .title p, #project .title .client, #project .scroll-discover').addClass('show');
                }, 3000);
            }, 500);
        }
    }
});

tpl.loadTemplates(['project-list-item', 'project-details'], function() {
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
    $('.menu-button').removeClass('show');
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
        $('.portfolio #list-projects > ul > li').css('opacity',0);
        $('.portfolio #list-projects > ul > li').css('visibility','hidden');

        // add background to the loader section and show the loader
        $('#p-load').css({
            "background": 'url(./img/projets/'+background+'.jpg) no-repeat center '+top+'px',
            "-webkit-background-size": 'cover',
            "background-size": 'cover',
            "opacity":1,
            "z-index":10,
            "top":$('#list-projects button.project-'+id).offset().top+'px',
            "-webkit-transition": 'top 1s ease, width .5s ease, height 1s ease',
            "transition": 'top 1s ease, width .5s ease, height 1s ease'
        });
        // move the loader section to the middle of page
        setTimeout(function(){
            $('#p-load').css({
                "top": ($(window).height()/2)-150+'px'
            });
        }, 500);
        // enlarge the loader section and add new transition
        setTimeout(function(){
            $('#p-load').css({
                "width": '100%',
                "-webkit-transition": 'top 1s ease, width .5s ease, height 1s ease, background-position 1s ease, opacity .5s ease',
                "transition": 'top 1s ease, width .5s ease, height 1s ease, background-position 1s ease, opacity .5s ease'
            });
            // hide presentation part
            $('.presentation').addClass('invisible');
            $('.menu-button').removeClass('show');
            setTimeout(function(){
                $('#p-load').css({
                    "height": '100%',
                    "top": '0'
                });
                if(id!==1){
                    $('#p-load').css({
                        "background-position": 'center center'
                    });
                }
            }, 1000);
        }, 1500);
        // end of animation
        setTimeout(function(){
            // show list item project and presentation part
            $('.portfolio #list-projects > ul > li').css('opacity',1);
            $('.portfolio #list-projects > ul > li').css('visibility','visible');
            $('.presentation').removeClass('invisible');
            $('#p-load').css({
                "opacity":0
            });
            // go on project
            location.replace("#projects/"+id);
            // reset loader section
            setTimeout(function(){
                $('#p-load').css({
                    "background": 'none',
                    "z-index":-1,
                    "top":'auto',
                    "width":'76%',
                    "height":'300px'
                });
                setTimeout(function(){
                    // allow to click on item
                    settings.clickOn=true;
                }, 500);
            }, 1000);
        }, 3500);
    }
}



















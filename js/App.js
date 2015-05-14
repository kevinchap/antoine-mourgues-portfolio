"use strict";

var settings = {
    loaderTime:0,
    home:false,
    projects:false,
    detailProject:false,
    contact:false,
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
        "projects/:id":"projectDetails",
        "contact":"contact"
    },

    initialize:function () {
        this.projectList = new ProjectList();
    },
 
    home:function () {
        $('.menuUl').attr('data-location','home');
        if(settings.home === true || (settings.home!==true && settings.projects===true) || (settings.home!==true && settings.contact===true)){
            setTimeout(function(){
                $('.menu-button').addClass('show');
            },2700);
        }else{
            setTimeout(function(){
                $('.home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 2500);
            }, 4500);
        }

        setTimeout(function(){
            detectMouseWheel('home');
        }, 4500);

        $('.scrolldown').click(function(){
            slide('home', true, true);
        });

        settings.home = true;
    },

    projects:function () {
        $('.menuUl').attr('data-location','projects');
        if(settings.contact!==true){
            if(settings.detailProject!==true){
                if(settings.home!==true){
                    $('.home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
                    $('.home, .portfolio, .contact').addClass('slidedown');
                    setTimeout(function(){
                        $('.presentation, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                        setTimeout(function(){
                            $('.menu-button').addClass('show');
                        }, 500);
                        setTimeout(function(){
                            showItemsProjects(true);
                        },2500);
                    }, 4500);
                }else{
                    setTimeout(function(){
                        $('.presentation, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                        setTimeout(function(){
                            $('.menu-button').addClass('show');
                        }, 500);
                        setTimeout(function(){
                            showItemsProjects(true);
                        },2500);
                    },2000);
                }
            }else{
                showItemsProjects(false);
            }
        }else{
            setTimeout(function(){
                $('.menu-button').addClass('show');
            }, 1500);
            showItemsProjects(false);
        }

        detectMouseWheel('projects');

        if(settings.projects !== true && settings.detailProject !== true){
            this.projectList.fetch({success: function() {
                $('#list-projects').html(new ProjectListView({model: settings.app.projectList}).render().el);
            }});
        }

        settings.projects = true;
    },
 
    projectDetails:function (id) {
        $('.menuUl').attr('data-location','project');
        $('#project').addClass('visible');
        setTimeout(function(){
            $('#project').addClass('transitionOut');
        },100);

        if(settings.projects!==true && settings.detailProject!==true){
            $('.home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
            $('.home, .portfolio, .home .content, .portfolio .content').addClass('slidedown');
            this.projectList.fetch({success: function() {
                $('#list-projects').html(new ProjectListView({model: settings.app.projectList}).render().el);
            }});
            $('.presentation, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
            showItemsProjects(false);

            this.projectList.fetch({success: function() {
                settings.app.project = settings.app.projectList.get(id);
                settings.app.projectView = new ProjectView({model:settings.app.project});
                $('#project').html(settings.app.projectView.render().el);
            }});

            setTimeout(function(){
                $('#project .presentation-project').addClass('show');
                setTimeout(function(){
                    $('.menu-button, #project .presentation-project div, #project .presentation-project .nav li').addClass('show');
                }, 500);
                setTimeout(function(){
                    if(id%2 === 0){
                        $('#project .contain-sections').css('width', $('#project').width()-$('#project .presentation-project-container').width()+'px');
                    }else{
                        $('#project .contain-sections').css('width', $('#project .presentation-project-container').offset().left+'px');
                    }

                    $('#project .title h2, #project .title .seperate, #project .title p, #project .title .client, #project .scroll-discover, #project .timeline-container').addClass('show');
                    setTimeout(function(){
                        $('.detail-project').addClass('scroll');
                        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
                        $(window).bind(mousewheelevt, function(e){
                            if($('.detail-project section:first-child').offset().top < 0){
                                $('#project .back-blur').addClass('blur');
                            }else{
                                $('#project .back-blur').removeClass('blur');
                            }
                        });
                        $('.nav li button').click(function(){
                            var theClass = $(this).attr('class');
                            var id = -1;
                            if($(this).attr('data-other')){
                                id = $(this).attr('data-other');
                            }
                            changeProject(theClass, mousewheelevt, id);
                        });
                        $('.menu button').click(function(){
                            slide($('.menuUl').attr('data-location'), $(this).attr('data-route'), false, mousewheelevt);
                        });
                    }, 3000);
                }, 3000);
            }, 4500);
        }else{
            this.project = this.projectList.get(id);
            this.projectView = new ProjectView({model:this.project});
            $('#project').html(this.projectView.render().el);

            setTimeout(function(){
                $('#project .presentation-project').addClass('show');
                setTimeout(function(){
                    $('.menu-button, #project .presentation-project div, #project .presentation-project .nav li').addClass('show');
                }, 500);
                setTimeout(function(){
                    if(id%2 === 0){
                        $('#project .contain-sections').css('width', $('#project').width()-$('#project .presentation-project-container').width()+'px');
                    }else{
                        $('#project .contain-sections').css('width', $('#project .presentation-project-container').offset().left+'px');
                    }
                    $('#project .title h2, #project .title .seperate, #project .title p, #project .title .client, #project .scroll-discover, #project .timeline-container').addClass('show');
                    setTimeout(function(){
                        $('.detail-project').addClass('scroll');
                        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
                        $(window).bind(mousewheelevt, function(e){
                            if($('.detail-project section:first-child').offset().top < 0){
                                $('#project .back-blur').addClass('blur');
                            }else{
                                $('#project .back-blur').removeClass('blur');
                            }
                        });
                        $('.nav li button').click(function(){
                            var theClass = $(this).attr('class');
                            var id = -1;
                            if($(this).attr('data-other')){
                                id = $(this).attr('data-other');
                            }
                            changeProject(theClass, mousewheelevt, id);
                        });
                        $('.menu button').click(function(){
                            slide($('.menuUl').attr('data-location'), $(this).attr('data-route'), false, mousewheelevt);
                        });
                    }, 3000);
                }, 3000);
            }, 500);
        }

        settings.detailProject = true;
    },
    contact:function () {
        $('.menuUl').attr('data-location','contact');
        if(settings.home !== true){
            if(settings.projects===true){
                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 1500);
            }else{
                $('.home, .portfolio, .contact').addClass('slidedown');
                $('.home, .portfolio, .contact').addClass('slidedown2');
                $('.home .title h1, .home .title .seperate, .home .title p, .home .scrolldown, .home .made-by').addClass('show');
                this.projectList.fetch({success: function() {
                    $('#list-projects').html(new ProjectListView({model: settings.app.projectList}).render().el);
                }});
                $('.presentation, .presentation h2, .presentation > p, .presentation .mourgues, .presentation .name').addClass('show');
                showItemsProjects(false);

                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 4500);
            }
        }else{
            if(settings.projects===true){
                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 2300);
            }else{
                setTimeout(function(){
                    $('.menu-button').addClass('show');
                }, 2700);
            }
        }
        detectMouseWheel('contact');
        settings.contact = true;
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

$('.menu-button').click(function(){
    changeMenuButton();
});

function changeMenuButton(){
    $('.menu').toggleClass('visible');
    if($('.menu-button').hasClass('active')){
        $('.menu-button').removeClass('rotate');
        setTimeout(function(){
            $('.menu-button').removeClass('active');
        },500);
    }else{
        $('.menu-button').addClass('active');
        setTimeout(function(){
            $('.menu-button').addClass('rotate');
        },500);
    }
}

function detectMouseWheel(route){
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    
    if(route==='home' || route === 'contact'){
        $('.home, .contact').bind(mousewheelevt, function(e){
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            if(route==='home' && delta < 0){
                slide(route, true, true);
            }
            if(route==='contact' && delta > 0) {
                slide(route, false, true);
            }
        });
    }else{
        $('.portfolio .content .presentation').bind(mousewheelevt, function(e){
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            if(delta > 0) {
                slide(route, false, true);
            }else{
                slide(route, true, true);
            }
        });
    }
}

$('.menu button').click(function(){
    slide($('.menuUl').attr('data-location'), $(this).attr('data-route'), false, -1);
});

function slide(route, dir, mswl, mswlevt){
    $('.menu-button').removeClass('show');
    if(mswl === true){
        if(route === 'home'){
            location.replace("#projects");
            $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
            setTimeout(function(){
                $('.home, .portfolio, .contact').addClass('slidedown');
            },500);
            setTimeout(function(){
                $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
            },1300);
        }else if(route ==='contact'){
            location.replace("#projects");
            $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
            setTimeout(function(){
                $('.home, .portfolio, .contact').removeClass('slidedown2');
            },500);
            setTimeout(function(){
                $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
            },1300);
        }else{
            if(dir === true){
                location.replace("#contact");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').addClass('slidedown2');
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },1300);
            }else{
                location.replace("#home");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').removeClass('slidedown');
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },1300);
            }
        }
    }else{
        $('.menu').removeClass('visible');
        $('.menu-button').removeClass('rotate');
        setTimeout(function(){
            $('.menu-button').removeClass('active');
        },500);
        if(route === 'home'){
            if(dir === 'projects'){
                location.replace("#projects");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').addClass('slidedown');
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },1300);
            }else{
                location.replace("#contact");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').addClass('slidedown');
                    setTimeout(function(){
                        $('.home, .portfolio, .contact').addClass('slidedown2');
                    },500);
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },2200);
            }
        }
        if(route === 'projects'){
            if(dir === 'home'){
                location.replace("#home");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').removeClass('slidedown');
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },1300);
            }else{
                location.replace("#contact");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').addClass('slidedown2');
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },1300);
            }
        }
        if(route === 'contact'){
            if(dir === 'projects'){
                location.replace("#projects");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').removeClass('slidedown2');
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },1300);
            }else{
                location.replace("#home");
                $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                setTimeout(function(){
                    $('.home, .portfolio, .contact').removeClass('slidedown2');
                    setTimeout(function(){
                        $('.home, .portfolio, .contact').removeClass('slidedown');
                    },500);
                },500);
                setTimeout(function(){
                    $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                },2200);
            }
        }
        if(route === 'project'){
            if(dir === 'projects'){
                $('.menu-button').removeClass('show');
                $('#project #close-load').addClass('on');
                setTimeout(function(){
                    $('#project #close-load').addClass('load');
                    setTimeout(function(){
                        $('#project .content-project').addClass('invisible');
                        setTimeout(function(){
                            $('#project').removeClass('visible');
                            setTimeout(function(){
                                $('#project').removeClass('transitionOut');
                                $('#project').html('');
                                $('.menu-button').addClass('show');
                                $(window).unbind(mswlevt);
                                location.replace("#projects");
                            }, 500);
                        }, 500);
                    }, 500);
                }, 800);
            }
            if(dir === 'home'){
                $('.menu-button').removeClass('show');
                $('#project #close-load').addClass('on');
                setTimeout(function(){
                    $('#project #close-load').addClass('load');
                    setTimeout(function(){
                        $('#project .content-project').addClass('invisible');
                        setTimeout(function(){
                            $('#project').removeClass('visible');
                            setTimeout(function(){
                                $('#project').removeClass('transitionOut');
                                $('#project').html('');
                                setTimeout(function(){
                                    $('.menu-button').addClass('show');
                                },2000);
                                $(window).unbind(mswlevt);
                                location.replace("#projects");
                            }, 500);
                        }, 500);
                    }, 500);
                }, 800);
                setTimeout(function(){
                    location.replace("#home");
                    $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                    setTimeout(function(){
                        $('.home, .portfolio, .contact').removeClass('slidedown');
                    },500);
                    setTimeout(function(){
                        $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                    },1300);
                },2500);
            }
            if(dir === 'contact'){
                $('.menu-button').removeClass('show');
                $('#project #close-load').addClass('on');
                setTimeout(function(){
                    $('#project #close-load').addClass('load');
                    setTimeout(function(){
                        $('#project .content-project').addClass('invisible');
                        setTimeout(function(){
                            $('#project').removeClass('visible');
                            setTimeout(function(){
                                $('#project').removeClass('transitionOut');
                                $('#project').html('');
                                setTimeout(function(){
                                    $('.menu-button').addClass('show');
                                },2000);
                                $(window).unbind(mswlevt);
                                location.replace("#projects");
                            }, 500);
                        }, 500);
                    }, 500);
                }, 800);
                setTimeout(function(){
                    location.replace("#contact");
                    $('.home .content, .portfolio .content, .contact .content').addClass('dezoom');
                    setTimeout(function(){
                        $('.home, .portfolio, .contact').addClass('slidedown2');
                    },500);
                    setTimeout(function(){
                        $('.home .content, .portfolio .content, .contact .content').removeClass('dezoom');
                    },1300);
                },2500);
            }
        }
    }
}

function showItemsProjects(time){
    var lis = $('.portfolio #list-projects > ul > li');
    $(lis).css('width', $('.presentation').offset().left+'px')
    var nbAlreadyInView = parseInt($(window).height()/300);
    if(($(window).height()/300 - Math.floor($(window).height()/300)) > 0.5){
        nbAlreadyInView++;
    }
    if(time===true){
        var i;
        for(i=0;i<nbAlreadyInView;i++){
            setTimeout(function(lis,i){
                $(lis[i]).addClass('show');
            },i*1200,lis,i);
        }
    }else{
        setTimeout(function(){
            $('.portfolio #list-projects > ul > li').css('width', $('.presentation').offset().left+'px')
            $('.portfolio #list-projects > ul > li').addClass('showWithoutTransition');
        },50);
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

function timelineScroll(elmt){
    if($(elmt).hasClass('start')){
        $('.detail-project').scrollTo(0, { duration:800 });
        $('#project .back-blur').removeClass('blur');
    }else if($(elmt).hasClass('end')){
        $('.detail-project').scrollTo($('.last-section').position().top, { duration:800 });
        $('#project .back-blur').addClass('blur');
    }else{
        $('.detail-project').scrollTo($('.mockup_'+$(elmt).attr('data-id')).position().top, { duration:800 });
        $('#project .back-blur').addClass('blur');
    }
}

function timelineProgress(elmt){
    var height = ($('#project .timeline').height()*elmt.scrollTop)/($('.contain-sections').height()-($('.one-section').height()));
    $('#project .timeline .line div').css('height', height+'px');
    var btns = $('.button_m');
    for(var i=0; i<btns.length; i++){
        if(height>=$(btns[i]).position().top){
            $(btns[i]).addClass('active');
        }else{
            $(btns[i]).removeClass('active');
        }
    }
}

function changeProject(theClass, mousewheelevt, id){
    if(theClass === 'close'){
        $('.menu-button').removeClass('show');
        $('#project #close-load').addClass('on');
        setTimeout(function(){
            $('#project #close-load').addClass('load');
            setTimeout(function(){
                $('#project .content-project').addClass('invisible');
                setTimeout(function(){
                    $('#project').removeClass('visible');
                    setTimeout(function(){
                        $('#project').removeClass('transitionOut');
                        $('#project').html('');
                        $('.menu-button').addClass('show');
                        $(window).unbind(mousewheelevt);
                        location.replace("#projects");
                    }, 500);
                }, 500);
            }, 500);
        }, 800);
    }else{
        if($('#project #close-load').hasClass('proj-left')){
            $('#change-load').addClass('proj-left');
        }
        $('.menu-button').removeClass('show');
        $('#change-load').addClass('on');
        setTimeout(function(){
            $('#change-load').addClass('load');
            setTimeout(function(){
                $('#change-load').toggleClass('proj-left');
                location.replace("#projects/"+id);
                setTimeout(function(){
                    $('#change-load').removeClass('load');
                    setTimeout(function(){
                        $('.menu-button').addClass('show');
                        $('#change-load').removeClass('on');
                    },500);
                },700);
            },700);
        },800);
    }
}



















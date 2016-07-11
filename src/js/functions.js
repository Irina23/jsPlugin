
$(document).ready(function() {


    (function () {
        $.fn.simpleTooltipPlugin = function(options){
            var options = $.extend({
                'position':'left'
            }, options);

            return this.each(function(){

                var $self = $(this),
                storage = {};
                var methods = {
                    init : function(){
                        methods.bindEvents();
                    },

                    bindEvents: function(){

                        $self.mouseover(methods.onMouseOver);
                        $self.mouseout(function(){
                            $(storage.$tooltip).remove();

                        });
                    },
                    onMouseOver: function(){
                        methods.getData();
                        methods.createTooltip();
                        methods.positionTooltip();
                    },
                    getData: function(){
                        storage = {
                            'width': $self.width(),
                            'height': $self.height(),
                            'location': $self.offset()
                        };

                    },
                    createTooltip: function(){
                        storage.tooltiptext = $self.attr('data-tooltip');
                        storage.$tooltip = $("<div>")
                            .addClass('tooltip')
                            .html( storage.tooltiptext )
                            .appendTo('body');


                    },
                    positionTooltip: function(){


                        switch (options.position) {
                            case 'right':
                                methods.visibleRight();
                                break;
                            case 'top':
                                methods.visibleTop();
                                break;
                            case 'bottom':
                                methods.visibleBottom();
                                break;
                            case 'left':
                                methods.visibleLeft();
                                break;

                        }
                    },



                    visibleLeft: function () {
                        var $widthPosition = storage.location.left - storage.$tooltip.innerWidth() - 20;
                        var $heightTop = storage.location.top;

                        storage.$tooltip.css({
                            'left': $widthPosition,
                            'top': $heightTop
                        });
                        console.log(storage.height);



                    },
                    visibleRight: function () {
                        var $widthPosition = storage.width + storage.location.left + 20;
                        var $heightTop = storage.location.top;

                        storage.$tooltip.css({
                            'left': $widthPosition,
                            'top': $heightTop
                        });



                    },
                    visibleTop: function () {
                        var $widthPosition = (storage.location.left + storage.width/2) - storage.$tooltip.innerWidth()/2;
                        var $heightTop = storage.location.top - storage.$tooltip.innerHeight() - 20;

                        storage.$tooltip.css({
                            'left': $widthPosition,
                            'top': $heightTop

                        });


                    },

                    visibleBottom: function () {
                        var $widthPosition = (storage.location.left + storage.width/2) - storage.$tooltip.innerWidth()/2;
                        var $heightTop = storage.location.top + storage.height + 20;
                        storage.$tooltip.css({
                            'left': $widthPosition,
                            'top': $heightTop
                        });
                        console.log($widthPosition);

                    }


                }
                methods.init();

            });

        }


        /*$('[data-toggle="tooltip"]').mouseover(function(e){
            var $this = $(this);
            var tooltip_text = $this.attr('data-tooltip');

            var x = e.pageX || e.clientX || 0;
            var y = e.pageY || e.clientY || 0;
            $(this).after("<div class='tooltip' style='left:"+x+"px; top:"+y+"px;'>"+tooltip_text+"</div>").innerWidth();
            var width_tooltip = $(this).next().innerWidth();
            var width = $( window ).width();
            var widthtooltip = width - width_tooltip;
            console.log(widthtooltip);
            if (widthtooltip < x){
                $(this).next().addClass('left');
            }
                

        });
        $('[data-toggle="tooltip"]').mouseout(function(){
           $('.tooltip').remove();
        });*/





    })(jQuery);
    $('[data-tooltip]').simpleTooltipPlugin({
        'position':'top'
    });





    (function () {
        $.fn.sliderPlugin = function(options){
            var options = $.extend({
                'nav': true,
                'items': 1,
                'cItem': 'item',
                'slider_wrap': 'slider-wrap',
                'slider_content': 'slider-content',
                'item_slider': 'item-slider',
                'text_next': 'next',
                'text_prev': 'prev'
            }, options);

            var $self = this,
                storage = {};
            var methods = {
                init: function(){
                    methods.addWrap();
                    methods.getData();

                    methods.widthSliderCss();
                    if (options.nav===true){
                        methods.addNav();
                    }


                },

                getData: function () {

                    storage.number_slider = $self.find('.' + options.item_slider).length;
                    storage.widthWrap = $('.'+ options.slider_wrap).width();
                    storage.widthItem = storage.widthWrap/options.items;
                    storage.widthSlider = storage.widthItem * $self.find('.' + options.item_slider).length;
                    storage.navIndex = options.items;
                    storage.navActive = options.items;
                    //console.log(storage.widthSlider);

                },

                addWrap: function () {
                    $self.addClass('slider-main');
                    $('.' + options.cItem).wrap("<div class=" + options.item_slider + "></div>");
                    $('.'+options.item_slider).wrapAll("<div class='slider-wrap'></div>");
                    $('.'+options.slider_wrap).wrapAll("<div class="+options.slider_content+"></div>");
                },
                widthSliderCss: function () {
                    $('.'+options.item_slider).css('width', storage.widthItem+'px')
                        .each(function () {
                            //console.log(storage.navActive);
                            if(storage.navActive>0){
                                $('.'+options.item_slider+':nth-child('+storage.navActive+')').addClass('active');

                                storage.navActive--;


                            } else{
                                storage.navActive = options.items;
                            }

                        });
                    $('.'+options.slider_wrap).css('width', storage.widthSlider+'px');



                },
                addNav: function () {
                    $self.append("<div class='controls'><ul class='nav'><li class='prev'>"+options.text_prev+"</li><li class='next'>"+options.text_next+"</li></ul></div>");
                    $self.on( 'click', '.nav li.next',function () {
                        methods.clickNavNext();
                        methods.activeItems();
                    });
                    $self.on( 'click', '.nav li.prev',function () {
                        methods.clickNavPrev();
                        methods.activeItems();

                    });
                },
                clickNavNext: function(){
                    storage.navIndex ++;
                    storage.translate3d = (storage.navIndex - options.items)* storage.widthItem;
                    //console.log(storage.translate3d);
                    if(storage.translate3d<=0){
                        $('.'+options.slider_wrap).css('transform', 'translate3d(0px, 0px, 0px)');
                        storage.navIndex = options.items;
                    } else{

                        if((storage.widthSlider-(options.items-1)*storage.widthItem)>storage.translate3d){
                            $('.'+options.slider_wrap).css('transform', 'translate3d(-'+storage.translate3d+'px, 0px, 0px)');
                        } else{
                            $('.'+options.slider_wrap).css('transform', 'translate3d(0px, 0px, 0px)');
                            storage.navIndex = options.items;
                        }
                    }


                },
                clickNavPrev: function(){
                    storage.navIndex --;
                    storage.translate3d = (storage.navIndex - options.items)* storage.widthItem;

                    //console.log(storage.translate3d);
                    if(storage.translate3d<=0){
                        $('.'+options.slider_wrap).css('transform', 'translate3d(0px, 0px, 0px)');
                        storage.navIndex = options.items;
                    } else{
                        if((storage.widthSlider-(options.items-1)*storage.widthItem)>storage.translate3d){
                            $('.'+options.slider_wrap).css('transform', 'translate3d(-'+storage.translate3d+'px, 0px, 0px)');
                        } else{
                            $('.'+options.slider_wrap).css('transform', 'translate3d(0px, 0px, 0px)');
                            storage.navIndex = options.items;
                        }
                    }


                },
                activeItems: function () {
                    storage.removeClass=storage.navIndex-options.items;
                    //console.log(storage.removeClass);
                    //console.log(storage.navIndex);
                    if((storage.removeClass==0) && (storage.navIndex==options.items)){
                        $('.'+options.item_slider).each(function () {
                            //console.log(storage.navActive);
                            $(this).removeClass('active');
                            if(storage.navActive>0){
                                $('.'+options.item_slider+':nth-child('+storage.navActive+')').addClass('active');

                                storage.navActive--;


                            } else{
                                storage.navActive = options.items;
                            }

                        });


                    } else {
                        $('.'+options.item_slider+':nth-child('+storage.navIndex+')').addClass('active');
                        $('.'+options.item_slider+':nth-child('+storage.removeClass+')').removeClass('active');
                    }



                }



            };
            methods.init();

        }


    })(jQuery);
    $('.slider').sliderPlugin({
        'items': 3,
        'text_next': '',
        'text_prev': ''
    });


});






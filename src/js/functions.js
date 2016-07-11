
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
                nav:true,
                items:1
            }, options);

            return this.each(function(){

                var $self = $(this),
                    storage = {};
                var methods = {
                    init : function(){
                        methods.bindEvents();
                    },

                    bindEvents: function(){


                    }






                }
                methods.init();

            });

        }





    })(jQuery);
    $('.slider').sliderPlugin({
        items:3
    });


});






define([
  'core/js/adapt'
], function(Adapt) {

  var goTopView = Backbone.View.extend({

    tagName: 'div',
    className: 'goTop',

    events: {
      'click .goTop-button': 'goTop'
    },

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      var template = Handlebars.templates.goTop;
      $('#wrapper').append(this.$el.html(template()));
      this.startScrollListener();
    },

    startScrollListener: function() {
      if (!Adapt.course.get('_goTop')._scrollListener._isEnabled) return;
      console.log('liste');
      var context = this;
      $(window).on('scroll.goTop', function() {
        context.checkIfBottom();
      });
    },

    stopScrollListener: function() {
      $(window).off('scroll.goTop');
    },

    checkIfBottom: _.throttle(function() {
      var viewportTop = $(window).scrollTop();
      console.log(viewportTop);
      if (viewportTop >= Adapt.course.get('_goTop')._scrollListener._offset) {
        $('.goTop').show();
      } else {
        $('.goTop').hide();
      }
    }, 50),

    goTop: function() {
      console.log(Adapt.location);
      var $page = $('.' + Adapt.location._currentId);
      console.log($page);
      Adapt.scrollTo($page, {
        duration: 400
      });
    }
  });

  Adapt.on('router:page router:menu', function() {
    $(window).off('scroll.goTop');
  });

  Adapt.on("pageView:ready", function() {
    var model = Adapt.course.get('_goTop');
    if (!model || !model._isEnabled) return;
    new goTopView();
  });

  return goTopView;
});

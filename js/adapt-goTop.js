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
    },

    goTop: function() {
      console.log(Adapt.location);
      var $page = $('.' + Adapt.location._currentId);
      console.log($page);
      Adapt.scrollTo($page, {
        duration: 400
      });
    }
  });

  Adapt.on("pageView:ready", function() {
    var model = Adapt.course.get('_goTop');
    if (!model || !model._isEnabled) return;
    new goTopView();
  });

  return goTopView;
});

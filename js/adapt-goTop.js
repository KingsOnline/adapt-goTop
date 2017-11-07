define([
  'core/js/adapt'
], function(Adapt) {

  var goTopView = Backbone.View.extend({

    initialize: function() {
      console.log('made');
      this.listenTo(Adapt, 'remove', this.remove);
      var template = Handlebars.templates["goTop"];
      $('#wrapper').append(template());
    }
  });

  Adapt.on("pageView:ready", function() {
    var model = Adapt.course.get('_goTop');
    console.log('ere');
    if(!model || !model._isEnabled) return;
    new goTopView();
  });

    return goTopView;
});

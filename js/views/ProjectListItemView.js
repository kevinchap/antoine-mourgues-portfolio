var ProjectListItemView = Backbone.View.extend({
 
    tagName:"li",
  
    initialize:function () {
        this.template = _.template(tpl.get('project-list-item'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});
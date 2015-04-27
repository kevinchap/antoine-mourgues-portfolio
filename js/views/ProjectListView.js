var ProjectListView = Backbone.View.extend({
 
    tagName:'ul',
 
    render:function (eventName) {
        _.each(this.model.models, function (project) {
            $(this.el).append(new ProjectListItemView({model:project}).render().el);
        }, this);
        return this;
    }
 
});
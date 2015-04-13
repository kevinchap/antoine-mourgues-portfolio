var ProjectListView = Backbone.View.extend({
 
    tagName:'ul',
 
    initialize:function () {
        
    },
 
    render:function (eventName) {
        // this.model.each(function (project) {
        //     $(this.el).append(new WineListItemView({model:project}).render().el);
        // }, this);

        _.each(this.model.models, function (project) {
            $(this.el).append(new ProjectListItemView({model:project}).render().el);
        }, this);
        return this;
    }
 
});
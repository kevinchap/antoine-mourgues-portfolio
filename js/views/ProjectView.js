var ProjectView = Backbone.View.extend({

	tagName:"section",

    initialize:function () {
		this.template = _.template(tpl.get('project-details'));
    },
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});
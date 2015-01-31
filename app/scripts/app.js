/** @jsx React.DOM */

var React = window.React = require('react'),
    Sidebar = require('./ui/sidebar'),
    Preview = require('./ui/preview'),
    _ = require('underscore'),
    mountNode = document.getElementById("app");

var files = [
    {
        title: "index.html",
        content: "<!doctype html><head><title>index</title></head><body>this is index content</body></html>"
    },
    {
        title: "README.md",
        content: "Just basic readme"
    }
];

var getTitleList = function() {
    return _.chain(files)
        .map(function(file){return _.pick(file,'title')})
        .value();
}();

var WebPandaApp = React.createClass({
    getInitialState: function() {
        return {
            activeTitle: _.first(files).title
        }
    },
    showContent: function(title) {
        this.setState({activeTitle: title});
    },
    render: function() {
        return (
            <div>
                <Sidebar titleList={getTitleList} showContent={this.showContent}/>
                <Preview content={this.state.activeTitle}/>
            </div>
        );
    }
});

React.render(<WebPandaApp />, mountNode);


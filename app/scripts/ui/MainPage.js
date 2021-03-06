/** @jsx React.DOM */
var React = require('react');
var Sidebar = require('./main/Sidebar');
var Preview = require('./main/Preview');
var Reflux = require('reflux');
var ModeMapper = require('../helper/ModeMapper');
var projectStore = require('../stores/project');
var librariesStore = require('../stores/libraries');
var ProjectActions = require('../actions/project');
var Editor = require('./main/Editor');

module.exports = React.createClass({
    mixins: [
        Reflux.connect(projectStore, "project"),
        Reflux.connect(librariesStore, "libraries")
    ],
    handleChange: function(o){
        ProjectActions.updateCurrentFile(o.value);
    },
    render: function() {
        var project = this.state.project;
        var libraries = this.state.libraries;

        var fileNames = project.files.map(f => f.name);
        var mode = ModeMapper.getMode(project.currentFileName);
        return (
            <main>
                <Sidebar fileNames={fileNames} libraries={libraries} />
                <Editor
                    onChange={this.handleChange}
                    content={project.getCurrentFile().content}
                    defaultValue={project.getCurrentFile().content}
                    mode={mode}
                    theme='solarized'
                    lineNumbers='true'
                    lineWrapping='true'
                    smartIndent='false'
                    className="editor"/>
                <Preview styles={project.getFileContent('main.css')} content={project.getFileContent('index.html')}/>
            </main>
        );
    }
});


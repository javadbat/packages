import React     from 'react'
import { observer }     from 'mobx-react'
import SearchBarTestModel from './SearchBarTestModel'
import JBSearchBar from 'jb-searchbar-react/dist/JBSearchBar.systemjs.min'
import './SearchBarTest.css!'

@observer
class SearchBarTest extends React.Component{
    constructor(){
        super();
        this.model = new SearchBarTestModel();
    }
    componentDidMount(){
        this.model.onComponentDidMount();
    }
    render(){
        var layout = 
        <div className="searchbar-test-wrapper">
        <JBSearchBar config={this.model.searchbarConfig}></JBSearchBar>
        </div>
        return(layout);
    }
}
export default SearchBarTest;
import React     from 'react'
import { observer }     from 'mobx-react'
import GridTestModel from './GridTestModel'
import JBGrid from 'jb-grid-react/dist/JBGrid.systemjs.min'
import JBGridBridge from 'jb-grid-react/lib/JBGridBridgeExample'
import './GridTest.css!'

@observer
class GridTest extends React.Component{
    constructor(){
        super();
        this.model = new GridTestModel();
    }
    componentDidMount(){
        this.model.onComponentDidMount();
    }
    render(){
        var layout = 
        <div className="grid-test-wrapper">
        <JBGrid config={this.model.gridConfig} bridge={JBGridBridge} className="test-grid">
        {
            
            this.model.gridConfig.data.data.map((item,index)=>{
                return(
                    <div key={index} className="jb-grid-table-row" style={{gridTemplateColumns:this.model.gridConfig.styles.table.generalCols.gridTemplateColumns}}>
                        <div  className="jb-grid-table-cell" data-caption="نام">{item.name}</div>
                        <div  className="jb-grid-table-cell" >{item.category}</div>
                    </div>
                )
            })
        }
        </JBGrid>
        </div>
        return(layout);
    }
}
export default GridTest;
import React     from 'react'
import { observer }     from 'mobx-react'
import GridTestModel from './GridTestModel'
import JBGrid , {Cell,Row} from 'jb-grid-react/dist/JBGrid.systemjs.min'
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
        <JBGrid config={this.model.gridConfig} bridge={JBGridBridge} className="test-grid" title="لیست تستی" filterConfig={this.model.filterConfig}>
        {
            
            this.model.gridConfig.data.data.map((item,index)=>{
                return(
                    <Row key={index} className="my-class" style={{gridTemplateColumns:this.model.gridConfig.styles.table.generalCols.gridTemplateColumns}}>
                        <Cell caption={"نام"}>{item.name}</Cell>
                        <Cell>{item.category}</Cell>
                    </Row>
                )
            })
        }
        </JBGrid>
        </div>
        return(layout);
    }
}
export default GridTest;
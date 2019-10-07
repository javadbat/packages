import RequestData from 'jb-modules/RequestModule/dist/RequestData.min'
import {fetchResponseHandler,fetchErrorHandler} from 'jb-modules/FetchHandler/dist/FetchHandler.min'
import ReactDOM         from 'react-dom'
import { observable }   from 'mobx'
import React             from 'react'
import JBGridData from 'jb-grid-react/dist/JBGridData.systemjs.min'
class FormElementTestPageModel{
    
    constructor(){
        this.InitGrid();
    }
    onComponentDidMount(){
        
    }
    onChange(e,obj,prop){
        obj[prop] = e.target.value;
    }
    InitGrid(){
        this.gridConfig = observable(new JBGridData());
        this.gridConfig.title = "لیست تستی";
        this.gridConfig.fullScreenable = true;
        this.gridConfig.table.columns = [
            {
                id:1,
                name:'name',
                caption:'مدل',
                sortable:true,
                width:'2fr'
            },
            {
                id:2,
                name:'category',
                caption:'دسته بندی',
            },
    ];
    this.gridConfig.data.url ="/api/TestGridRest";
    this.gridConfig.data.method = "POST";
    this.gridConfig.filter = {
        columns:[
            {
                id:1,
                name:'name',
                caption:'نام مدل',
                type:'text',
                maxUsageCount:1
            },
            {
                id:3,
                name:'status',
                caption:'وضعیت',
                type:'list',
                maxUsageCount:1,
                config:{
                    options:[
                        {
                            value:'PENDING',
                            caption:'منتظر تایید'
                        },
                        {
                            value:'APPROVED',
                            caption:'تایید شده'
                        },
                        {
                            value:'REJECTED',
                            caption:'رد شده'
                        }
                    ],
                    placeHolder:'وضعیت را انتخاب کنید'
                }
            },
            {
                id:4,
                name:'FromDate',
                caption:'از تاریخ',
                type:'date',
                maxUsageCount:1,
                config:{
                    inputMask:"yyyy-MM-ddTHH:mm:ss.SSS"
                }
            },
            {
                id:5,
                name:'toDate',
                caption:'تا تاریخ',
                type:'date',
                maxUsageCount:1,
                config:{
                    inputMask:"yyyy-MM-ddTHH:mm:ss.SSS"
                }
            },
            {
                id:6,
                name:'FromCount',
                caption:'از تعداد',
                type:'number',
                maxUsageCount:1
            },
            {
                id:7,
                name:'ToCount',
                caption:'تا تعداد',
                type:'number',
                maxUsageCount:1
            },
            {
                id:8,
                name:'hotInMarket',
                caption:'وضعیت داغ بازار',
                type:'list',
                maxUsageCount:1,
                config:{
                    options:[
                        {
                            value:false,
                            caption:'نباشد'
                        },
                        {
                            value:true,
                            caption:'باشد'
                        },
                    ],
                    placeHolder:'وضعیت را انتخاب کنید'
                }
            }
        ],
        // defaultValues:[
        //     {
        //         columnId:1,
        //         value:'تست برا تست',
        //         valueCaption:'تست برا تست'
        //     }
        // ]
    }
    }

}
export default FormElementTestPageModel;
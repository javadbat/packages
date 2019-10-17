import { observable }   from 'mobx'

class SearchBarTestModel{
    
    @observable searchbarConfig = {
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
            ]
    }
    constructor(){
    }
    onComponentDidMount(){
        
    }
}
export default SearchBarTestModel;
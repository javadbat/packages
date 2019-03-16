var Routes = [
    {
        url:"/",
        controller:"IndexPageController",
        action:"index"
    },
    {
        url:"/Examples/React",
        controller:"ReactExamples",
        action:"Systemjs"
    },
    {
        url:"/Examples/React/*",
        controller:"ReactExamples",
        action:"Systemjs"
    }
]
exports.default = Routes
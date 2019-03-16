import routerData from '../../Config/JBRouterConfigData'
import Router from '../../../../../../../Modules/jb-router/dist/Router.min';
class LayoutModel{

    constructor(){
        this.router = new Router(routerData);
    }
    loadPage(event){
        event.preventDefault();
        var url = event.currentTarget.attributes['href'].value;
        this.router.loadPage(url);
    }

}
export default LayoutModel;
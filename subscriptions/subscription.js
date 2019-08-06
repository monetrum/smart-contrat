'use strict';

const model = require(appDir + '/models/context/context');
const {MVS} = registry.get('helpers');

const subscription = {};
const languages = ['tr', 'en'];
//----------------------------------------------------------------------------------------------------------------------

function languageSelector(contentLang) {
    if(!contentLang){
        return 'tr';
    }

    let parsedLang = String(contentLang.split('-')[0]);
    if(languages.indexOf(parsedLang) === -1){
        return 'tr';
    }

    return parsedLang.toLowerCase();
}

subscription.onConnect = async (params) => {
    let data = {};
    data.user = undefined;
    data.server_id = params['X-SERVERID'];
    if(params['X-TOKEN'] !== undefined){
        data.user = await model.getUser(params['X-TOKEN']);
    }

    //------------------------------------------------------------------------------------------------------------------
    data.params = params;
    //------------------------------------------------------------------------------------------------------------------
    data.lang = languageSelector(params['Content-Language']);
    //------------------------------------------------------------------------------------------------------------------
    data.MVS = new MVS(params['lang']);
    //------------------------------------------------------------------------------------------------------------------
    return data;
};
//----------------------------------------------------------------------------------------------------------------------
module.exports = subscription;
import {RootUrlService} from '@/app/cms/sdk/root-url.service';
import {PageLayoutServiceResponse} from '@/app/cms/sdk/services/layout-service.response';
import {LazyComponentsResponse} from '@/app/cms/sdk/services/lazy-components.response';

export class LayoutService {
    public static get(pagePathAndQuery: string, edit: boolean): Promise<PageLayoutServiceResponse> {
        let url = null;
        let indexOfSitefinityTemplate = pagePathAndQuery.indexOf('Sitefinity/Template/');
        if (indexOfSitefinityTemplate > 0) {
            let id = null;
            let indexOfGuid = indexOfSitefinityTemplate + 'Sitefinity/Template/'.length;
            let nextIndexOfSlash = pagePathAndQuery.indexOf('/', indexOfGuid);
            if (nextIndexOfSlash === -1) {
                id = pagePathAndQuery.substring(indexOfGuid);
            } else {
                id = pagePathAndQuery.substring(indexOfGuid, nextIndexOfSlash);
            }

            url = `/api/default/templates/${id}/Default.Model()`;
        } else {
            url = `/api/default/pages/Default.Model(url=@param)?@param='${encodeURIComponent(pagePathAndQuery)}'`;
        }

        if (edit) {
            let concatChar = '?';
            if (url.indexOf(concatChar) !== -1) {
                concatChar = '&';
            }

            url += `${concatChar}sfaction=edit`;
        }

        url = RootUrlService.getUrl() + ':3000/' + url.substring(1);
        return fetch(url).then((x) => x.json());
    }

    public static getLazyComponents(pagePathAndQuery: string): Promise<LazyComponentsResponse> {
        var headers: {[key: string]: string} = {};
        var referrer = document.referrer;
        if (referrer && referrer.length > 0) {
            headers['SF_URL_REFERER'] = referrer;
        } else {
            headers['SF_NO_URL_REFERER'] = 'true';
        }

        let serviceUrl = `${RootUrlService.getServiceUrl()}Default.LazyComponents(url=@param)?@param='${encodeURIComponent(
            pagePathAndQuery,
        )}'`;
        serviceUrl += '&correlationId=' + (window as any)['sfCorrelationId'];
        return fetch(serviceUrl, {headers}).then((x) => x.json());
    }
}

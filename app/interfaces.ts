import {RequestContext} from '@/app/cms/services/request-context';

export interface ModelBase<T> {
    Id: string;
    Name: string;
    Caption: string;

    Lazy: boolean;
    ViewName: string;
    PlaceHolder: string;
    Properties: T;
    Children: ModelBase<any>[];

    Culture: string;
    SiteId: string;

    requestContext: RequestContext;
}

export interface MetaInfo {
    CanonicalUrl: string;
    Description: string;
    HtmlInHeadTag: string;
    OpenGraphDescription: string;
    OpenGraphImage: string;
    OpenGraphSite: string;
    OpenGraphTitle: string;
    OpenGraphType: string;
    OpenGraphVideo: string;
    Title: string;
}

export interface Script {
    Attributes: {Key: string; Value: string}[];
    Source: string;
    Value: string;
}

export interface PageContentServiceResponse {
    Culture: string;
    SiteId: string;
    ComponentContext: ComponentContext;
    IsUserAuthenticated: boolean;
    DetailItem: any;
    MetaInfo: MetaInfo;
    TemplateName: string;
    Id: string; // page id
    Scripts: Script[];
    UrlParameters: string[];
    error?: any;
}

export interface ComponentContext {
    Components: ModelBase<any>[];
    HasLazyComponents: boolean;
}

export interface ODataEntityResponse {
    '@odata.context': string;
    Author: string;
    Category: string[];
    Content: string;
    DateCreated: string;
    Description: string;
    Id: string;
    LastModified: string;
    Name: string;
    Provider: string;
    PublicationDate: string;
    Tags: string[];
    Title: string;
    UrlName: string;
}

export interface TypeAnnotation {}

export interface PropertyMetadata {
    Name: string;
    Title: string;
    Type: string;
    DefaultValue: string;
    Properties: {[key: string]: any};
    TypeChildProperties: any[];
    DependanceProperties: any[];
}

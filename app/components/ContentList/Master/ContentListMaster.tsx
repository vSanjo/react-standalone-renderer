import React, {Fragment, useEffect, useState} from 'react';
import {ContentListModelMaster} from '@/app/components/ContentList/Master/ContentListMasterModel';
import {ContentListModelBase} from '@/app/components/ContentList/Master/ContentListBaseModel';
import {ImageItem} from '@/app/cms/sdk/dto/image-item';
import {
    ItemModel,
    ListWithSummaryModel,
} from '@/app/components/ContentList/Master/ListWithSummary/ListWithSummaryModel';
import {ListWithImage} from '@/app/components/ContentList/Master/ListWithImage/ListWithImage';
import {ListWithImageModel} from '@/app/components/ContentList/Master/ListWithImage/ListWithImageModel';
import {ListWithSummary} from '@/app/components/ContentList/Master/ListWithSummary/ListWithSummary';
import {CardsList} from '@/app/components/ContentList/Master/CardsList/CardsList';
import {CardsListModel} from '@/app/components/ContentList/Master/CardsList/CardsListModel';

export function ContentListMaster(props: {model: ContentListModelMaster}) {
    const [data, setData] = useState<{viewName: string; model: ContentListModelBase}>();

    const model = props.model;
    let attributes: {[key: string]: string} = {};
    if (model.Attributes) {
        model.Attributes.forEach((pair) => {
            attributes[pair.Key] = pair.Value;
        });
    }

    useEffect(() => {
        model.Items.then((dataItems) => {
            if (model.ViewName === 'CardsList' || model.ViewName === 'ListWithImage') {
                const viewModel = {
                    OnDetailsOpen: model.OnDetailsOpen,
                    Attributes: attributes,
                    OpenDetails: model.OpenDetails,
                    Items: dataItems.Items.map((x) => {
                        let url!: string;
                        const imageProp: ImageItem[] = x[model.FieldMap['Image']];
                        let image: ImageItem | null = null;
                        if (imageProp && imageProp.length > 0) {
                            image = imageProp[0];
                            if (image.Thumbnails && image.Thumbnails.length > 0) {
                                url = image.Thumbnails[0].Url;
                            } else {
                                url = image.Url;
                            }
                        }

                        return {
                            Title: {
                                Value: x[model.FieldMap['Title']],
                                Css: 'card-title' + (x[model.FieldCssClassMap['Title']] || ''),
                                Link: '',
                            },
                            Image: {
                                Title: image?.Title,
                                Url: url,
                                AlternativeText: image?.AlternativeText,
                                Css: x[model.FieldCssClassMap['Image']],
                            },
                            Text: {
                                Value: x[model.FieldMap['Text']],
                                Css: 'card-text ' + `${x[model.FieldCssClassMap['Text']] || ''}`,
                            },
                            Original: x,
                        };
                    }),
                };

                setData({viewName: model.ViewName, model: viewModel});
            } else if (model.ViewName === 'ListWithSummary') {
                const viewModel = {
                    OnDetailsOpen: model.OnDetailsOpen,
                    Attributes: attributes,
                    OpenDetails: model.OpenDetails,
                    Items: dataItems.Items.map((x) => {
                        const itemModel = {
                            Title: {
                                Value: x[model.FieldMap['Title']],
                                Css: 'card-title' + (x[model.FieldCssClassMap['Title']] || ''),
                                Link: '',
                            },
                            PublicationDate: {
                                Value: x[model.FieldMap['Publication date']],
                                Css: x[model.FieldCssClassMap['Publication date']],
                            },
                            Text: {
                                Value: x[model.FieldMap['Text']],
                                Css: 'card-text ' + `${x[model.FieldCssClassMap['Text']] || ''}`,
                            },
                            Original: x,
                        } as ItemModel;

                        if (!itemModel.PublicationDate.Css) itemModel.PublicationDate.Css = '';
                        itemModel.PublicationDate.Css += ' text-muted';
                        return itemModel;
                    }),
                };

                setData({viewName: model.ViewName, model: viewModel});
            }
        });
    }, [props.model]);

    return (
        <Fragment>
            {data?.model && data?.viewName === 'ListWithImage' && (
                <ListWithImage model={data?.model as ListWithImageModel}></ListWithImage>
            )}

            {data?.model && data?.viewName === 'ListWithSummary' && (
                <ListWithSummary model={data?.model as ListWithSummaryModel}></ListWithSummary>
            )}

            {data?.model && data?.viewName === 'CardsList' && (
                <CardsList model={data?.model as CardsListModel}></CardsList>
            )}
        </Fragment>
    );
}

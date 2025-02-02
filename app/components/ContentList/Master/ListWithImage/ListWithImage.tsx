import React, {Fragment} from 'react';
import {SdkItem} from '@/app/cms/sdk/dto/sdk-item';
import {ListWithImageModel} from '@/app/components/ContentList/Master/ListWithImage/ListWithImageModel';

export function ListWithImage(props: {model: ListWithImageModel}) {
    const model = props.model;

    function onDetailItemOpenHandler(event: React.MouseEvent<HTMLAnchorElement>, item: SdkItem) {
        event.preventDefault();
        event.stopPropagation();

        model.OnDetailsOpen(item);
    }

    return (
        <Fragment>
            {model.Items.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {index !== 0 && <hr />}
                        <div className="d-flex">
                            <div className="flex-shrink-0">
                                <img
                                    className={item.Image.Css}
                                    src={item.Image.Url}
                                    alt={item.Image.AlternativeText}
                                    title={item.Image.Title}
                                />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                {item.Title && <h5 className={item.Title.Css}>{item.Title.Value}</h5>}
                                {item.Text && <p className={item.Text.Css}>{item.Text.Value}</p>}
                                {model.OpenDetails && (
                                    <a
                                        href="#"
                                        className="btn btn-primary"
                                        onClick={(e) => onDetailItemOpenHandler(e, item.Original)}
                                    >
                                        Learn more
                                    </a>
                                )}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </Fragment>
    );
}

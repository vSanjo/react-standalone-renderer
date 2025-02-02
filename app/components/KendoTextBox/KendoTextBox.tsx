import React from 'react';
import {ModelBase} from '@/app/interfaces';
import {htmlAttributes} from '@/app/cms/services/render-widget-service';
import {TextBox} from '@progress/kendo-react-inputs';

export function TextBoxComponent(props: ModelBase<TextBoxEntity>) {
    const dataAttributes = htmlAttributes(props, null, null);
    return (
        <div {...dataAttributes}>
            <TextBox value={props.Properties.Value} placeholder={props.Properties.Placeholder}></TextBox>
        </div>
    );
}

interface TextBoxEntity {
    Value: string;
    Placeholder: string;
}

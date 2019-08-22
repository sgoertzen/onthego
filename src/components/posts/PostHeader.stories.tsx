import React from 'react';
import { storiesOf } from '@storybook/react';
import PostHeader from './PostHeader';

storiesOf('posts/Post Header', module)
    .add('Default', () => <PostHeader title="Sample Title" author="Sam Pleuser" date={new Date("1/1/2011")} details="" />)
    .add('Long Details', () => {
        let details = "Monterey jack manchego cheesy grin. Cheesy grin ricotta st. agur blue cheese cheese triangles jarlsberg cheese slices cheesecake gouda. Lancashire gouda fondue pecorino cheese slices cheddar port-salut croque monsieur. Cheesecake port-salut parmesan bocconcini airedale boursin blue castello gouda. Cheese slices cheesy feet. Cheese strings cheese strings fromage frais. Paneer port-salut cut the cheese squirty cheese cheese and biscuits cream cheese fondue when the cheese comes out everybody's happy. Lancashire hard cheese macaroni cheese blue castello bocconcini danish fontina goat fromage frais. Roquefort cream cheese mascarpone queso mozzarella."
        return (
            <PostHeader
                title="Sample Title"
                author="Sam Pleuser"
                date={new Date("1/1/2011")}
                details={details} />
        )
    })
    .add('Multiple paragraphs', () => {
        let details = "Monterey jack manchego cheesy grin. Cheesy grin ricotta st. agur blue cheese cheese triangles jarlsberg cheese slices cheesecake gouda. Lancashire gouda fondue pecorino cheese slices cheddar port-salut croque monsieur.\n Cheesecake port-salut parmesan bocconcini airedale boursin blue castello gouda. Cheese slices cheesy feet. Cheese strings cheese strings fromage frais. Paneer port-salut cut the cheese squirty cheese cheese and biscuits cream cheese fondue when the cheese comes out everybody's happy. Lancashire hard cheese macaroni cheese blue castello bocconcini danish fontina goat fromage frais. Roquefort cream cheese mascarpone queso mozzarella."
        return (
            <PostHeader
                title="Sample Title"
                author="Sam Pleuser"
                date={new Date("1/1/2011")}
                details={details} />
        )
    })

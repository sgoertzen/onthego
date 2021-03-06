import React from 'react';
import { storiesOf } from '@storybook/react';
import CommentDialog from './CommentDialog';

storiesOf('posts/Comment Dialog', module)
    .add('Default', () => {
        return (<CommentDialog open={true} onClose={() => { }} username="Bob Smith" postid="a8m3" />)
    })
    .add('Closed', () => {
        return (<CommentDialog open={false} onClose={() => { }} username="Mr. Table" postid="a8m3" />)
    })
    .add('Editing', () => {
        return (<CommentDialog open={true} onClose={() => { }} username="Bob Smith" postid="a8m3" comment="Pre-entered comment" />)
    })
    .add('Long Comment', () => {
        return (<CommentDialog open={true} onClose={() => { }} username="Bob Smith" postid="a8m3" comment="Boursin the big cheese goat. Bocconcini edam stilton port-salut monterey jack pecorino lancashire taleggio. Camembert de normandie chalk and cheese monterey jack manchego lancashire ricotta melted cheese cheesecake. Brie rubber cheese hard cheese swiss caerphilly edam camembert de normandie camembert de normandie. Cheese and biscuits. \n\n Feta fromage fromage frais. Squirty cheese fondue cottage cheese airedale cheese strings mozzarella ricotta cauliflower cheese. Parmesan babybel cheeseburger bocconcini ricotta smelly cheese cheese and biscuits st. agur blue cheese. Macaroni cheese squirty cheese cheese strings." />)
    })
    .add('No User', () => {
        return (<CommentDialog open={true} onClose={() => { }} postid="a8m3" />)
    })

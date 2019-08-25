import React from 'react';
import { storiesOf } from '@storybook/react';
import PostComment from './PostComment';
import { Comment } from '../../classes/Comment';
import { TimeStamp } from '../../classes/TimeStamp';

storiesOf('posts/Post Comment', module)
    .add('Yesterday', () => {
        // We use dates based off the current day/time, as the labels will remain consistent then 
        // since they show as "One Month Ago".  This avoids UI changes when the code doesn't change.
        const yesterdayAtSevenThirteen = new Date()
        yesterdayAtSevenThirteen.setDate(yesterdayAtSevenThirteen.getDate() - 1)
        yesterdayAtSevenThirteen.setHours(7)
        yesterdayAtSevenThirteen.setMinutes(13)
        const yesterdayAtSevenThirteenTS = new TimeStamp(yesterdayAtSevenThirteen.getTime())
        const c = new Comment("Bob", "I said something", yesterdayAtSevenThirteenTS)
        return (<PostComment {...c} />)
    })
    .add("Month Ago", () => {
        const julyFirstDate = new Date("7/1/2019")
        const julyFirst = new TimeStamp(julyFirstDate.getTime())

        const c = new Comment("Susan B. Anthony", "Boursin the big cheese goat. Bocconcini edam stilton port-salut monterey jack pecorino lancashire taleggio. Camembert de normandie chalk and cheese monterey jack manchego lancashire ricotta melted cheese cheesecake. Brie rubber cheese hard cheese swiss caerphilly edam camembert de normandie camembert de normandie. Cheese and biscuits. Feta fromage fromage frais. Squirty cheese fondue cottage cheese airedale cheese strings mozzarella ricotta cauliflower cheese. Parmesan babybel cheeseburger bocconcini ricotta smelly cheese cheese and biscuits st. agur blue cheese. Macaroni cheese squirty cheese cheese strings.", julyFirst)
        return (<PostComment {...c} />)
    })

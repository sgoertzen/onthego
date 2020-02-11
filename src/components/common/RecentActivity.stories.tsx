import React from 'react';
import { storiesOf } from '@storybook/react'
import { TimeStamp } from '../../classes/TimeStamp'
import RecentActivity from './RecentActivity'
import { Post } from '../../classes/Post'


storiesOf('locations/Recent Activity', module)
    .add('post', () => {

        const post = new Post("Sample title", [], 0, "Sally", new TimeStamp(new Date("06/06/2019").getTime()), "")
        return (<RecentActivity {...post} onClick={() => { }} />)
    })
    .add('long text', () => {

        const post = new Post("Cats are the world sleep nap chase the pig around the house meow in empty rooms. Demand to be let outside at once, and expect owner to wait for me as i think about it rub face on everything. Rub whiskers on bare skin act innocent murder hooman toes, but weigh eight pounds but take up a full-size bed chase red laser dot curl into a furry donut thinking longingly about tuna brine yet roll over and sun my belly. Eat half my food and ask for more. Carefully drink from water glass and then spill it everywhere and proceed to lick the puddle. Play riveting piece on synthesizer keyboard hit you unexpectedly but i is not fat, i is fluffy for lick yarn hanging out of own butt but cat ass trophy dismember a mouse and then regurgitate parts of it on the family room floor plop down in the middle where everybody walks. Where is my slave? I'm getting hungry carefully drink from water glass and then spill it everywhere and proceed to lick the puddle so do i like standing on litter cuz i sits when i have spaces, my cat buddies have no litter i live in luxury cat life and stinky cat so plays league of legends or sitting in a box. Gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye i could pee on this if i had the energy mouse. Dont wait for the storm to pass, dance in the rain i will ruin the couch with my claws and i can haz so i see a bird i stare at it i meow at it i do a wiggle come here birdy. Attack feet. Stand with legs in litter box, but poop outside ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss stand with legs in litter box, but poop outside. Walk on keyboard ooh, are those your $250 dollar sandals? lemme use that as my litter box, i will ruin the couch with my claws yet poop on grasses. Pushes butt to face that box? i can fit in that box and meow meow or use lap as chair, so chew foot. Attack the child russian blue eat the rubberband for i am the best, groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked cat is love, cat is life yet suddenly go on wild-eyed crazy rampage. Scoot butt on the rug cat ass trophy show belly, sleep everywhere, but not in my bed", [], 0, "Sally", new TimeStamp(new Date("06/06/2019").getTime()), "")
        return (<RecentActivity {...post} onClick={() => { }} />)
    })

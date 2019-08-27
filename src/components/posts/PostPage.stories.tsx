/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import PostPage from './PostPage';
import { Post } from '../../classes/Post';
import travelImage from "../../../testdata/Travel.jpg";
import { TimeStamp } from '../../classes/TimeStamp';
import { Media, MediaType } from '../../classes/Media';


storiesOf('posts/Post Page', module)
    .add('no post', () => <PostPage />)
    .add('single post', () => {
        const details = "Monterey jack manchego cheesy grin. Cheesy grin ricotta st. agur blue cheese cheese triangles jarlsberg cheese slices cheesecake gouda. Lancashire gouda fondue pecorino cheese slices cheddar port-salut croque monsieur.\n Cheesecake port-salut parmesan bocconcini airedale boursin blue castello gouda. Cheese slices cheesy feet. Cheese strings cheese strings fromage frais. Paneer port-salut cut the cheese squirty cheese cheese and biscuits cream cheese fondue when the cheese comes out everybody's happy. Lancashire hard cheese macaroni cheese blue castello bocconcini danish fontina goat fromage frais. Roquefort cream cheese mascarpone queso mozzarella."
        const post = new Post(
            "Test Post",
            [new Media("default.png", travelImage, MediaType.Image)],
            0,
            "Jane Doe",
            new TimeStamp(new Date("12/15/2020").getTime()),
            details)
        return <PostPage post={post} />
    })
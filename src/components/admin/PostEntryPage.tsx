import React from 'react';
import PostEntry from './PostEntry'
import { IHistoryProps } from '../../classes/IHistoryProps';
import { ITravelLocation } from '../../classes/TravelLocation';
import { IPost } from '../../classes/Post';
import { FirestoreHelper } from '../../util/FirestoreHelper';

interface postEntryPageProps {
    history?: IHistoryProps
    match: {
        params: {
            locationid: string
            postid?: string
        }
    }
}

interface postEntryPageState {
    editing: boolean
    location?: ITravelLocation
    post?: IPost
}

class PostEntryPage extends React.Component {
    public props: postEntryPageProps
    public state: postEntryPageState

    constructor(props: postEntryPageProps) {
        super(props);
        this.props = props;
        this.state = {
            editing: (this.props.match.params.postid !== undefined)
        }
        this.backToList = this.backToList.bind(this)

        let locationid = this.props.match.params.locationid
        let postid = this.props.match.params.postid
        FirestoreHelper.loadLocation(locationid, (loc) => {
            this.setState({ location: loc })
        })
        if (postid) {
            FirestoreHelper.loadPost(postid, (post) => {
                this.setState({ post: post })
            })
        }
    }

    backToList() {
        if (this.props.history) {
            this.props.history.push(`/notadmin/location/${this.props.match.params.locationid}`)
        }
    }

    render() {
        if (!this.state.location || (this.state.editing && !this.state.post)) {
            return (<div>Loading...</div>)
        }
        return (
            <PostEntry
                onPostCreated={this.backToList}
                loc={this.state.location}
                post={this.state.post} />
        )
    }
}
export default PostEntryPage;
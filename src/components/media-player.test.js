import React from 'react';
import {shallow, mount} from 'enzyme';

import {MediaPlayer} from './media-player';
import { userFavoriteInfo, deleteFavorite, getFavorite } from "../actions/favorite";

describe('<MediaPlayer />', () => {
  const episodeTitle = "#32 - Basic Developer Human Rights: Quinn Slack"
  const episodeSeason = "1"
  const episodeNumber = "32"
  const episodeDate = "Wed, 24 Oct 2018 07:20:06 +0000";
  const episodeGuid = "8d2f355c-44e0-482c-86ff-a98300771e81"
  const episodeUrl = "https://omnystudio.com/d/clips/c4157e60-c7f8-470d-b13f-a7b30040df73/564f493f-af32-4c48-862f-a7b300e4df49/8d2f355c-44e0-482c-86ff-a98300771e81/audio.mp3?utm_source=Podcast&in_playlist=ac317852-8807-44b8-8eff-a7b300e4df52&t=1540365615"
  const feedUrl = "https://www.omnycontent.com/d/playlist/c4157e60-c7f8-470d-b13f-a7b30040df73/564f493f-af32-4c48-862f-a7b300e4df49/ac317852-8807-44b8-8eff-a7b300e4df52/podcast.rss";
  const favorites = [
    {
      createdAt: "2018-11-06T18:32:12.682Z",
      feedUrl: "https://feeds.feedwrench.com/js-jabber.rss",
      guid: "f2e8e692-e2cf-425b-b775-911d3ab55613",
      id: "5be1de2c709c3d38181bdba4",
      mediaUrl: "https://media.devchat.tv/js-jabber/JSJ_322_Building_SharePoint_Extensions_with_JavaScript_with_Vesa_Juvonen_LIVE_at_Microsoft_Build.mp3",
      title: "JSJ 322: Building SharePoint Extensions with JavaScript with Vesa Juvonen LIVE at Microsoft Build",
      updatedAt: "2018-11-06T18:32:12.682Z",
      userId: "5be087d52247fa626525dc9a"
    },
    {
      createdAt: "2018-11-06T16:43:00.351Z",
      feedUrl: "http://themodelhealthshow.libsyn.com/rss",
      guid: "ea73a4902ec2404887ccfa65ccaeaba0",
      id: "5be1c4949524ea2477fc8734",
      mediaUrl: "http://traffic.libsyn.com/themodelhealthshow/311-The_Nature_Of_Consciousness_Precognition__An_End_To_Upside_Down_Thinking_-_With_Guest_Mark_Gober.mp3?dest-id=136195",
      title: "TMHS 311: The Nature Of Consciousness, Precognition, & An End To Upside Down Thinking - With Guest Mark Gober",
      updatedAt: "2018-11-06T16:43:00.351Z",
      userId: "5be087d52247fa626525dc9a"
    }
  ]

  it('Renders without crashing', () => {
    shallow(<MediaPlayer dispatch={jest.fn()}/>);
  });

  it('Loads user favorites', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<MediaPlayer dispatch={dispatch} episodeUrl={episodeUrl} />);
    // console.log(wrapper.debug());
    expect(dispatch).toHaveBeenCalled();
    // expect(dispatch).toHaveBeenCalledWith(getFavorite());
    // wrapper.setProps({ favorites });
  });

  it('Renders a loading message', () => {
    const wrapper = shallow(<MediaPlayer dispatch={jest.fn()} episodeUrl={episodeUrl} />);
    wrapper.setState({loaded: false});
    expect(wrapper.contains(<p>Loading...</p>));
  });

  it('Renders the media player', () => {
    const wrapper = shallow(<MediaPlayer
      dispatch={jest.fn()}
      episodeUrl={episodeUrl}
      />);
    wrapper.setState({loaded: true});
    expect(wrapper.contains(episodeTitle));
    expect(wrapper.contains(episodeSeason));
    expect(wrapper.contains(episodeNumber));
    expect(wrapper.contains(episodeDate));
    expect(wrapper.find('.toggles').exists());
    expect(wrapper.find('.volume').exists());
    expect(wrapper.find('.progress').exists());
    expect(wrapper.find('.btn-row').exists());
  });

  it('Starts playing a podcast', () => {
    const wrapper = shallow(<MediaPlayer dispatch={jest.fn()} episodeUrl={episodeUrl}/>);
    wrapper.setState({loaded: true});
    expect(wrapper.state('playing')).toEqual(false);
    wrapper.find('.play-btn-symbol').closest('button').simulate('click');
    expect(wrapper.state('playing')).toEqual(true);
  });
});
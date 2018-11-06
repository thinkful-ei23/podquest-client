import React from 'react';
import {shallow, mount} from 'enzyme';

import {MediaPlayer} from './media-player';

describe('<MediaPlayer />', () => {
  const episodeDate = "Wed, 24 Oct 2018 07:20:06 +0000";
  const episodeGuid = "8d2f355c-44e0-482c-86ff-a98300771e81"
  const episodeNumber = "32"
  const episodeSeason = "1"
  const episodeTitle = "#32 - Basic Developer Human Rights: Quinn Slack"
  const episodeUrl = "https://omnystudio.com/d/clips/c4157e60-c7f8-470d-b13f-a7b30040df73/564f493f-af32-4c48-862f-a7b300e4df49/8d2f355c-44e0-482c-86ff-a98300771e81/audio.mp3?utm_source=Podcast&in_playlist=ac317852-8807-44b8-8eff-a7b300e4df52&t=1540365615"
  const feedUrl = "https://www.omnycontent.com/d/playlist/c4157e60-c7f8-470d-b13f-a7b30040df73/564f493f-af32-4c48-862f-a7b300e4df49/ac317852-8807-44b8-8eff-a7b300e4df52/podcast.rss"

  it('Renders without crashing', () => {
      shallow(<MediaPlayer />);
  });

  it('Renders a loading message', () => {
    const wrapper = shallow(<MediaPlayer episodeUrl={episodeUrl}/>);
    wrapper.setState({loaded: false});
    expect(wrapper.contains(<p>Loading...</p>));
  });
});
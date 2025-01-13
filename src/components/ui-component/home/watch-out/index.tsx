'use client';
import React, { useState } from 'react';
import { Grid, Paper, ListItem, Box, List, Typography } from '@mui/material';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'));

import { HerominiTxt } from '../banner-page/styles';
// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { CsYoutube } from './YoutubeData';
import {
  WatchNextTxt,
  LinkTitle,
  MiniLinkTxt,
  FrameBox,
  CoverBox,
  ContainerWarpper,
  MiniLink,
  Secwrapper,
  ScrollContent,
  SelectedFrameBox
} from './styles';

const listBlock = {
  marginBottom: '10px',
  '&:hover': {
    background: '#11519c0d'
  }
};

interface CsYoutubeData {
  id: string;
  title: string;
  embedUrl: string;
  thumbnails: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
}

const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState<CsYoutubeData | null>(null);

  return (
    <Secwrapper>
      <ContainerWarpper>
        <Box className="watchout_contentBx">
          <Typography className="h2_tag" component="h2">
            Watch Out
          </Typography>
          <HerominiTxt style={{ maxWidth: '500px' }}>Our College Suggest Video Playlist</HerominiTxt>
        </Box>

        <Grid container spacing={3} padding={0}>
          <Grid item xs={12} md={12} xl={6}>
            {selectedVideo ? (
              <SelectedFrameBox>
                <LiteYouTubeEmbed
                  aspectHeight={9}
                  aspectWidth={16}
                  id={selectedVideo?.id || ''}
                  title={selectedVideo?.title || ''}
                ></LiteYouTubeEmbed>
              </SelectedFrameBox>
            ) : (
              <FrameBox>
                <Box className="custom_iframe">
                  <LiteYouTubeEmbed id="yppLCNPkyg0" title="Top 10 GFTIs In India"></LiteYouTubeEmbed>
                </Box>
              </FrameBox>
            )}
          </Grid>
          <Grid item xs={12} md={12} xl={6}>
            <Paper>
              <CoverBox>
                <WatchNextTxt>Watch Next Video</WatchNextTxt>
                <MiniLink target="_blank" href="https://www.youtube.com/@CollegeSuggest/videos" prefetch={false}>
                  View All
                </MiniLink>
              </CoverBox>
              <ScrollContent>
                <List>
                  {CsYoutube.map((video) => (
                    <ListItem
                      sx={listBlock}
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex' }} tabIndex={0} role="button">
                        <Box className="mini_thumb">
                          <Image
                            src={video.thumbnails}
                            alt={video.title}
                            width={50}
                            height={50}
                            className="mini_thumbimage"
                            priority={false}
                          />
                        </Box>
                        <Box sx={{ width: '100%', paddingLeft: '6px' }}>
                          <LinkTitle>{video.title} </LinkTitle>
                          <MiniLinkTxt>{video.viewCount} Views</MiniLinkTxt>
                          <MiniLinkTxt>{video.publishedAt}</MiniLinkTxt>
                        </Box>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </ScrollContent>
            </Paper>
          </Grid>
        </Grid>
      </ContainerWarpper>
    </Secwrapper>
  );
};

export default Video;

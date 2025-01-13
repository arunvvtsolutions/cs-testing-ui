interface CsYoutubeData {
  id: string;
  title: string;
  embedUrl: string;
  thumbnails: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
}
export const CsYoutube: CsYoutubeData[] = [
  {
    id: 'yppLCNPkyg0',
    embedUrl: 'https://www.youtube.com/embed/yppLCNPkyg0',
    title: 'Top 10 GFTIs In India',
    thumbnails: 'https://i.ytimg.com/vi/yppLCNPkyg0/default.jpg',
    publishedAt: '2023-06-20T18:51:48Z',
    viewCount: '732',
    likeCount: '29'
  },
  {
    id: 'FfyZKedTqJ8',
    embedUrl: 'https://www.youtube.com/embed/FfyZKedTqJ8',
    title: 'Top 5 IIITs In India 2022',
    thumbnails: 'https://i.ytimg.com/vi/FfyZKedTqJ8/default.jpg',
    publishedAt: '2023-06-20T18:51:32Z',
    viewCount: '1343',
    likeCount: '30'
  },
  {
    id: '5r4SY2rRSqE',
    embedUrl: 'https://www.youtube.com/embed/5r4SY2rRSqE',
    publishedAt: '2023-06-20T18:50:20Z',
    title: 'IIT Indore | Placements | Salary | Campus | Faculty | Fee Structure',
    thumbnails: 'https://i.ytimg.com/vi/5r4SY2rRSqE/default.jpg',
    viewCount: '408',
    likeCount: '7'
  },
  {
    id: 'm_ggfZyWfeQ',
    embedUrl: 'https://www.youtube.com/embed/m_ggfZyWfeQ',
    publishedAt: '2023-06-20T18:50:02Z',
    title: 'Top 10 Arts & Science Colleges In India',
    thumbnails: 'https://i.ytimg.com/vi/m_ggfZyWfeQ/default.jpg',
    viewCount: '130',
    likeCount: '2'
  },
  {
    id: 'udT5PENCLUw',
    embedUrl: 'https://www.youtube.com/embed/udT5PENCLUw',
    publishedAt: '2023-05-30T09:11:14Z',
    title: 'NIT Nagpur Campus Tour',
    thumbnails: 'https://i.ytimg.com/vi/udT5PENCLUw/default.jpg',
    viewCount: '558',
    likeCount: '19'
  },
  {
    id: '2Ttk8gNa9VE',
    embedUrl: 'https://www.youtube.com/embed/2Ttk8gNa9VE',
    publishedAt: '2023-05-30T09:10:54Z',
    title: 'NIT Durgapur Overview',
    thumbnails: 'https://i.ytimg.com/vi/2Ttk8gNa9VE/default.jpg',
    viewCount: '587',
    likeCount: '25'
  },
  {
    id: '4Xp1Az8DH4c',
    embedUrl: 'https://www.youtube.com/embed/4Xp1Az8DH4c',
    publishedAt: '2023-05-27T14:54:42Z',
    title: 'Unlock Your Medical College Dreams with Our NEET 2023 Predictor Tool',
    thumbnails: 'https://i.ytimg.com/vi/4Xp1Az8DH4c/default.jpg',
    viewCount: '710',
    likeCount: '10'
  },
  {
    id: 'GA7bqBfaDPQ',
    embedUrl: 'https://www.youtube.com/embed/GA7bqBfaDPQ',
    publishedAt: '2023-05-23T10:00:03Z',
    title: 'NEET and Beyond',
    thumbnails: 'https://i.ytimg.com/vi/GA7bqBfaDPQ/default.jpg',
    viewCount: '383',
    likeCount: '10'
  },
  {
    id: 'le6LGl60Qz0',
    embedUrl: 'https://www.youtube.com/embed/le6LGl60Qz0',
    publishedAt: '2023-04-29T14:26:42Z',
    title: 'Future of Aerospace Engineering #aerospace #engineering',
    thumbnails: 'https://i.ytimg.com/vi/le6LGl60Qz0/default.jpg',
    viewCount: '1792',
    likeCount: '82'
  },
  {
    id: 'A7Stfw_ZyAI',
    embedUrl: 'https://www.youtube.com/embed/A7Stfw_ZyAI',
    publishedAt: '2023-04-15T09:43:27Z',
    title: 'Top 10 Private Engineering Colleges in India | NIRF Rankings Revealed',
    thumbnails: 'https://i.ytimg.com/vi/A7Stfw_ZyAI/default.jpg',
    viewCount: '1825',
    likeCount: '48'
  }
];

// Function to calculate the weeks between two dates
const weeksBetweenDates = (startDate: Date, endDate: Date): number => {
  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  const diffMilliseconds = endDate.getTime() - startDate.getTime();
  return Math.floor(diffMilliseconds / millisecondsPerWeek);
};
// Convert the publishedAt date to weeks format for each video
CsYoutube.forEach((video) => {
  const publishedAtDate = new Date(video.publishedAt);
  const currentDate = new Date();
  const weeksAgo = weeksBetweenDates(publishedAtDate, currentDate);
  video.publishedAt = `${weeksAgo} weeks ago`;
});

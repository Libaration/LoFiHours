const youtubeMp3Converter = require('youtube-mp3-converter');
const convertLinkToMp3 = youtubeMp3Converter('public/upload/');
export default async function fetchStream(req, res) {
  const url = 'https://www.youtube.com/watch?v=LfRNRymrv9k';
  const pathToMp3 = await convertLinkToMp3(url, {
    startTime: '00:00:40',
    duration: 30,
    title: '1',
  });
  return res.status(200).json({ url: pathToMp3 });
}

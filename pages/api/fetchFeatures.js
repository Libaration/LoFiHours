const baseURL = 'https://api.spotify.com/v1';
export default async function fetchFeatures(req, res) {
  const searchQuery = JSON.parse(req.body).searchQuery;
  const access_token = req.headers['authorization'];
  const response = await fetch(`${baseURL}/audio-features/${searchQuery}`, {
    headers: {
      Authorization: `${access_token}`,
    },
  });
  const responseJSON = await response.json();
  res.status(200).json({ ...responseJSON });
}

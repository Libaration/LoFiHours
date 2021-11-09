import absoluteUrl from 'next-absolute-url';
export default function authCallback(req, res) {
  const { origin } = absoluteUrl(req);
  const baseURL = `${origin}`;
  const { code } = req.query;
  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('redirect_uri', `${baseURL}/api/auth/callback`);
  data.append('code', code);
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: data,
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => {
    return response.json().then((responseJSON) => {
      if (responseJSON.access_token) {
        return res.redirect(307, '/?access_token=' + responseJSON.access_token);
      } else {
        return res.status(500).json(responseJSON);
      }
    });
  });
  // .then((responseJSON) => {
  //   if (responseJSON.access_token) {
  //     res.redirect(307, '/?access_token=' + responseJSON.access_token);
  //   } else {
  //     res.status(500).json(responseJSON);
  //   }
  // });
}

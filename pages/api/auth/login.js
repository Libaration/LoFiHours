export default function authLogin(req, res) {
  const scope = 'streaming';
  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: 'http://localhost:3000/api/auth/callback',
  });
  res.redirect(
    'https://accounts.spotify.com/authorize/?' + queryParams.toString()
  );
  //   res.status(200).json({ name: 'John Does' });
}

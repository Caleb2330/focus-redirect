export default function handler(req, res) {
  // Get all query parameters from the request
  const { access_token, refresh_token, token_type, expires_in, ...otherParams } = req.query;
  
  // Log the incoming request for debugging
  console.log('Auth callback received:', req.query);
  
  // Build the redirect URL with all parameters
  const params = new URLSearchParams();
  
  if (access_token) params.append('access_token', access_token);
  if (refresh_token) params.append('refresh_token', refresh_token);
  if (token_type) params.append('token_type', token_type);
  if (expires_in) params.append('expires_in', expires_in);
  
  // Add any other parameters
  Object.entries(otherParams).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  
  const queryString = params.toString();
  const redirectUrl = queryString ? `/?${queryString}` : '/';
  
  // Redirect to the main page with parameters
  res.redirect(302, redirectUrl);
}

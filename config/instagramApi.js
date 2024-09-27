const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
// Fetch comments from Instagram API
exports.getPostComments = async (postId) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const url = `https://graph.instagram.com/${postId}/comments?access_token=${accessToken}`;
  
  try {
    const response = await axios.get(url);
    return response.data.data;  
  } catch (error) {
    console.error('Error fetching comments from Instagram:', error);
    throw error;
  }
};

// Delete a comment by its ID
exports.deleteComment = async (commentId) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const url = `https://graph.instagram.com/${commentId}?access_token=${accessToken}`;
  
  try {
    await axios.delete(url);
  } catch (error) {
    console.error('Error deleting Instagram comment:', error);
    throw error;
  }
};

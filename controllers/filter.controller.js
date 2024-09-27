const postService = require('../services/postService');

exports.analyzePostComments = async (req, res) => {
  const { postId } = req.body;

  try {
    const result = await postService.analyzePostFromComments(postId);
    res.status(200).json({ message: 'Analysis complete', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the post comments.' });
  }
};

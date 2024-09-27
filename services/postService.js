const openai = require('../config/openai');
const instagramApi = require('../config/instagramApi');
const logger = require('../utils/logger');
exports.analyzePostFromComments = async (postId) => {
    //first fetching comments from a post using instagram Api
    const comments = await instagramApi.getPostComments(postId);
    const negativeComments = [];
    for (const comment of comments) {
        try {
            // Call OpenAI API to analyze comment
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: `does this sentence have negative,agressive,hateful or discouraging language. in one word say YES or NO: "${comment.text}"` },
                ],
                max_tokens: 1,
            });

            // Extract the sentiment from the response
            const sentiment = response.data.choices[0].message.content;
            if (sentiment === 'YES') {
                logger.warning(`a negative comment has been detected:${comment.text}`)
                negativeComments.push(comment);
            }

        } catch (error) {
            console.error('Error analyzing post comments:', error);
            throw error;
        };
    };
    logger.info(`total comments is: ${comments.length}`);
    logger.info(`total negativecomments is: ${negativeComments.length}`);
    
    // then deleting the negative comments using instagram Api
    logger.info('deleting negative comments');
    try {
        for (const negvativeComment of negativeComments) {
            await instagramApi.deleteComment(negvativeComment.id);
            logger.info(`deleted comment: ${negvativeComment.text}`);
        }
        return { analyzedComments: comments.length, negativeComments: negativeComments.length };
    } catch (error) {
        console.error('Error deleting negative comments:', error);
        throw error;
    }

};

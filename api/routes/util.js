const checkIfUserIsDeleted = async (user) => {
    if (!user)
        throw new Error('Fatal: user Id extracted from JWT Token doesn\'t match any in Database.');
};


module.exports = { checkIfUserIsDeleted };
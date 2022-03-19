const getGithubToken = (credentials) =>
    fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    )
    .then(res => res.json())
    .catch(error => {
        throw new Error(JSON.stringify(error))
    })

const getGithubUserAccount = token =>
    fetch(`https://api.github.com/user?access_token=${token}`)
        .then(res => res.json())
        .catch(error => {
            throw new Error(JSON.stringify(error))
        })

async function authorizeWithGithub (credentials) {
    const { access_token } = await getGithubToken(credentials);
    const user = await getGithubUserAccount(access_token);
    return {...user, access_token}
}

module.exports = {
    authorizeWithGithub
}
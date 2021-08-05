const profileAvatar = (id, avatar) => {
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
}

const guildIcon = (id, avatar) => {
    return `https://cdn.discordapp.com/icons/${id}/${avatar}.png`
}

module.exports = {
    profileAvatar,
    guildIcon
}
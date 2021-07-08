module.exports = {
    fetchMember(message, query) {
        const user = query.replace(/[^0-9]/g, "");


        if (/^\d+$/.test(user)) {
            return message.guild.members.fetch(user).then(result => {
                return result.id;
            }).catch(() => {
                return undefined;
            });
        }

        return message.guild.members.fetch({query: query, limit: 1}).then(result => {
            return result.first().user.id;
        }).catch(() => {
            return undefined;
        });

    }
}
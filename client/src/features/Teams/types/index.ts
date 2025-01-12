export type TypeTeamMember = {
    _id: string,
    firstName: string,
    secondName: string,
    avatarSrc: string,
    country: string,
    city: string,
    role: string,
};

export type TypeTeam = {
    _id: string,
    name: string,
    members: TypeTeamMember[],
};

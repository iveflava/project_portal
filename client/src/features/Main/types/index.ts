export type TypeNews = {
    _id: string,
    heading: string,
    text?: string,
    img: string,
    timestamp: number,
};

export type TypeEvent = {
    _id: string,
    heading: string,
    text: string,
    mode: 'red' | 'green' | 'yellow' | 'purple',
};

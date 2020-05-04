//Structure of the database. No functioning code.

let db = {
  users: [
    {
      userId: 'dh43hfi4323lk4jo90',
      email: 'user@email.com',
      username: 'user',
      createdAt: '2020-02-20T10:59:52.798Z',
      imageUrl: 'image/ljgiorjgavmamr',
      bio: 'Hello, my name is user, nice to meet you',
      location: 'Lakewood, OH',
    },
  ],
  posts: [
    {
      username: 'user',
      body: 'this is the post body',
      createdAt: '2019-03-15T11:46:01.0182',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      username: 'user',
      postId: '53jlkh9as0iaod48',
      body: 'nice one mate!',
      createdAt: '2019-03-15T11:46:01.0182',
    },
  ],
};

module.exports = [
  {
    url: '/api/test',
    type: 'post',
    response: {
      Success: true,
      Code: 0,
      Message: '@sentence(5,10)',
      Data: {
        'list|1-10': [
          {
            Title: '@string("lower", 3,10)',
            Content: '@string("lower", 3,10)',
          },
        ],
      },
      ExtensionData: {},
      Pagination: {
        PageIndex: '@integer(0, 10)',
        PageSize: '@integer(0, 10)',
        TotalCount: '@integer(0, 10)',
        PageCount: '@integer(0, 10)',
      },
    },
  },
]

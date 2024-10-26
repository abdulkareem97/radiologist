export const standard = defineScenario({
  record: {
    one: {
      data: {
        info: { foo: 'bar' },
        status: 'String',
        updated_at: '2024-10-26T06:53:07.258Z',
        patient: {
          create: {
            name: 'String',
            age: 8439632,
            updated_at: '2024-10-26T06:53:07.258Z',
          },
        },
        referDr: {
          create: {
            name: 'String',
            hname: 'String',
            haddress: 'String',
            updated_at: '2024-10-26T06:53:07.258Z',
          },
        },
      },
    },
    two: {
      data: {
        info: { foo: 'bar' },
        status: 'String',
        updated_at: '2024-10-26T06:53:07.258Z',
        patient: {
          create: {
            name: 'String',
            age: 7558321,
            updated_at: '2024-10-26T06:53:07.258Z',
          },
        },
        referDr: {
          create: {
            name: 'String',
            hname: 'String',
            haddress: 'String',
            updated_at: '2024-10-26T06:53:07.258Z',
          },
        },
      },
    },
  },
})

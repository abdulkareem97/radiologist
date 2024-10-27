import { db } from 'src/lib/db'

export const records = () => {
  return db.record.findMany()
}
export const recordsByStatus = ({ status }) => {
  return db.record.findMany({
    where: {
      status,
    },
  })
}

export const record = ({ id }) => {
  return db.record.findUnique({
    where: { id },
  })
}

export const createRecord = ({ input }) => {
  return db.record.create({
    data: input,
  })
}

export const updateRecord = ({ id, input }) => {
  return db.record.update({
    data: input,
    where: { id },
  })
}

export const deleteRecord = ({ id }) => {
  return db.record.delete({
    where: { id },
  })
}

export const Record = {
  patient: (_obj, { root }) => {
    return db.record.findUnique({ where: { id: root?.id } }).patient()
  },
  referDr: (_obj, { root }) => {
    return db.record.findUnique({ where: { id: root?.id } }).referDr()
  },
}

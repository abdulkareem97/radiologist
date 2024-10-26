import { db } from 'src/lib/db'

export const referDoctors = () => {
  return db.referDoctor.findMany()
}

export const referDoctor = ({ id }) => {
  return db.referDoctor.findUnique({
    where: { id },
  })
}

export const createReferDoctor = ({ input }) => {
  return db.referDoctor.create({
    data: input,
  })
}

export const updateReferDoctor = ({ id, input }) => {
  return db.referDoctor.update({
    data: input,
    where: { id },
  })
}

export const deleteReferDoctor = ({ id }) => {
  return db.referDoctor.delete({
    where: { id },
  })
}

export const ReferDoctor = {
  Record: (_obj, { root }) => {
    return db.referDoctor.findUnique({ where: { id: root?.id } }).Record()
  },
}

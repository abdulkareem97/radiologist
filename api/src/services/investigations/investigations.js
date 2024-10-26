import { db } from 'src/lib/db'

export const investigations = () => {
  return db.investigation.findMany()
}

export const investigation = ({ id }) => {
  return db.investigation.findUnique({
    where: { id },
  })
}

export const createInvestigation = ({ input }) => {
  return db.investigation.create({
    data: input,
  })
}

export const updateInvestigation = ({ id, input }) => {
  return db.investigation.update({
    data: input,
    where: { id },
  })
}

export const deleteInvestigation = ({ id }) => {
  return db.investigation.delete({
    where: { id },
  })
}

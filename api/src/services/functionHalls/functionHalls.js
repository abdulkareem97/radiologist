import { db } from 'src/lib/db'

export const functionHalls = () => {
  return db.functionHall.findMany()
}

export const functionHall = ({ id }) => {
  return db.functionHall.findUnique({
    where: { id },
  })
}

export const createFunctionHall = ({ input }) => {
  return db.functionHall.create({
    data: input,
  })
}

export const updateFunctionHall = ({ id, input }) => {
  return db.functionHall.update({
    data: input,
    where: { id },
  })
}

export const deleteFunctionHall = ({ id }) => {
  return db.functionHall.delete({
    where: { id },
  })
}

export const FunctionHall = {
  user: (_obj, { root }) => {
    return db.functionHall.findUnique({ where: { id: root?.id } }).user()
  },
  Booking: (_obj, { root }) => {
    return db.functionHall.findUnique({ where: { id: root?.id } }).Booking()
  },
}

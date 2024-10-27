import { db } from 'src/lib/db'

export const patients = () => {
  return db.patient.findMany()
}

export const patient = ({ id }) => {
  return db.patient.findUnique({
    where: { id },
  })
}
export const patientByPhoneNo = ({ phone_no }) => {
  return db.patient.findMany({
    where: { phone_no },
  })
}

export const createPatient = ({ input }) => {
  return db.patient.create({
    data: input,
  })
}

export const updatePatient = ({ id, input }) => {
  return db.patient.update({
    data: input,
    where: { id },
  })
}

export const deletePatient = ({ id }) => {
  return db.patient.delete({
    where: { id },
  })
}

export const Patient = {
  Record: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).Record()
  },
}

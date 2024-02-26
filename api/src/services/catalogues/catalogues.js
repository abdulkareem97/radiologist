import { db } from 'src/lib/db'

export const catalogues = () => {
  return db.catalogue.findMany()
}

export const catalogue = ({ id }) => {
  return db.catalogue.findUnique({
    where: { id },
  })
}

export const createCatalogue = ({ input }) => {
  return db.catalogue.create({
    data: input,
  })
}

export const updateCatalogue = ({ id, input }) => {
  return db.catalogue.update({
    data: input,
    where: { id },
  })
}

export const deleteCatalogue = ({ id }) => {
  return db.catalogue.delete({
    where: { id },
  })
}

export const Catalogue = {
  category: (_obj, { root }) => {
    return db.catalogue.findUnique({ where: { id: root?.id } }).category()
  },
}
